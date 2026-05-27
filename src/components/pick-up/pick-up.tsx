import { useState } from 'react';

import { address } from '../../constants';
import { RouteData } from '../../types/types';
import buildRoute from '../../utils/buildRoute';
import DescriptionSegment from '../description-segment/description-segment';
import Map from '../map/map';
import styles from './pick-up.module.scss';

type PickUpProps = {
	wrapperClass: string;
	headlineText: string;
	isDeliverPage: boolean;
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
			async position => {
				const userPos: [number, number] = [
					position.coords.latitude,
					position.coords.longitude
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
				setError(
					'Не удалось определить ваше местоположение. Разрешите доступ к геолокации.'
				);
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
					className={styles.adress__button}
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
