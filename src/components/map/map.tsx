import L from 'leaflet';
import { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';

import { address, pickupCoordinates } from '../../constants';
import { RouteData } from '../../types/types';
import styles from './map.module.scss';

import type { Feature, LineString } from 'geojson';

const customIcon = L.icon({
	iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
	iconRetinaUrl:
		'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
	shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
	iconSize: [25, 41],
	iconAnchor: [12, 41],
	popupAnchor: [1, -34],
	shadowSize: [41, 41]
});

type MapProps = {
	route: RouteData | null;
	isDeliverPage?: boolean;
};

const RouteLayer = ({ route }: { route: RouteData | null }) => {
	const map = useMap();
	const layerRef = useRef<L.GeoJSON | null>(null);

	useEffect(() => {
		if (layerRef.current) {
			layerRef.current.remove();
			layerRef.current = null;
		}

		if (!route) {
			map.setView(pickupCoordinates, 16);
			return;
		}

		const latLngs: L.LatLngExpression[] = route.geometry.coordinates.map(
			([lng, lat]) => [lat, lng]
		);

		const geoJsonFeature: Feature<LineString> = {
			type: 'Feature',
			geometry: {
				type: 'LineString',
				coordinates: route.geometry.coordinates
			},
			properties: {}
		};

		layerRef.current = L.geoJSON(geoJsonFeature, {
			style: {
				color: '#4A90D9',
				weight: 5,
				opacity: 0.8
			}
		}).addTo(map);

		map.fitBounds(L.latLngBounds(latLngs), { padding: [40, 40] });
	}, [route, map]);

	return null;
};

const Map = ({ route, isDeliverPage }: MapProps) => {
	return (
		<section className={styles.component}>
			<MapContainer
				center={pickupCoordinates}
				zoom={16}
				scrollWheelZoom
				className={`${styles.map} ${
					isDeliverPage ? styles.map_mh461 : ''
				}`}
			>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
				<Marker position={pickupCoordinates} icon={customIcon}>
					<Popup>{address}</Popup>
				</Marker>
				<RouteLayer route={route} />
			</MapContainer>
		</section>
	);
};

export default Map;
