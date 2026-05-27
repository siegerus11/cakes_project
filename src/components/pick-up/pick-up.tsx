import { useState } from 'react';
import { address, pickupCoordinates } from '../../constants';
import DescriptionSegment from '../description-segment/description-segment';
import Map from '../map/map';
import styles from './pick-up.module.scss';

type RouteData = {
	geometry: {
		coordinates: [number, number][];
	};
};

type PickUpProps = {
	wrapperClass: string;
	headlineText: string;
	isDeliverPage: boolean;
};

const buildRoute = async (from: [number, number]): Promise<RouteData | null> => {
	const url = `https://router.project-osrm.org/route/v1/driving/${from[1]},${from[0]};${pickupCoordinates[1]},${pickupCoordinates[0]}?overview=full&geometries=geojson`;

	const res = await fetch(url);
	const data = await res.json();

	if (data.code === 'Ok' && data.routes?.[0]) {
		return data.routes[0];
	}
	return null;
};

const PickUp = ({ wrapperClass, headlineText, isDeliverPage }: PickUpProps) => {
	const [route, setRoute] = useState<RouteData | null>(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const handleBuildRoute = () => {
		if (!navigator.geolocation) {
			setError('Геолокация не поддерживается вашим браузером');
			return;
		}

		setLoading(true);
		setError(null);

		navigator.geolocation.getCurrentPosition(
			async (position) => {
				const userPos: [number, number] = [
					position.coords.latitude,
					position.coords.longitude,
				];
				try {
					const routeData = await buildRoute(userPos);
					if (routeData) {
						setRoute(routeData);
					} else {
						setError('Не удалось построить маршрут');
					}
				} catch {
					setError('Ошибка при построении маршрута');
				} finally {
					setLoading(false);
				}
			},
			() => {
				setLoading(false);
				setError('Не удалось определить ваше местоположение. Разрешите доступ к геолокации.');
			},
			{ enableHighAccuracy: true, timeout: 10000 }
		);
	};

	return (
		<div className={`${styles.wrapper} ${wrapperClass}`}>
			<DescriptionSegment
				titleText={headlineText}
				wrapperClass={styles.adress}
			>
				{isDeliverPage && (
					<p className={styles.adress__time}>
						Забрать заказ можно с 8:00 до 21:00, без выходных.{}
					</p>
				)}
				<address>{address}</address>
				<button
					className={styles.adress__link}
					type="button"
					onClick={handleBuildRoute}
					disabled={loading}
				>
					{loading ? 'Строим маршрут…' : 'Построить маршрут'}
				</button>
				{error && <p className={styles.adress__error}>{error}</p>}
				<p className={styles.adress__text}>
					Пожалуйста, оформите всё заранее — мы испечем ваш заказ и
					согласуем удобное время получения.
				</p>
			</DescriptionSegment>
			<Map route={route} />
		</div>
	);
};

export default PickUp;
