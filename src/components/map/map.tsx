import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

import { address, pickupCoordinates } from '../../constants';
import styles from './map.module.scss';

const customIcon = L.icon({
	iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
	iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
	shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
	iconSize: [25, 41],
	iconAnchor: [12, 41],
	popupAnchor: [1, -34],
	shadowSize: [41, 41],
});

const MapComponent = () => {
	return (
		<section className={styles.component}>
			<MapContainer
				center={pickupCoordinates}
				zoom={16}
				scrollWheelZoom
				className={styles.map}
			>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
				<Marker position={pickupCoordinates} icon={customIcon}>
					<Popup>{address}</Popup>
				</Marker>
			</MapContainer>
		</section>
	);
};

export default MapComponent;
