import { useState, useCallback } from 'react';

import { RouteData } from '../types/types';
import buildRoute from '../utils/buildRoute';

function useRoute(targetPos: [number, number]): {
	handleBuildRoute: () => void;
	route: RouteData | null;
	loading: boolean;
	error: string | null;
} {
	const [route, setRoute] = useState<RouteData | null>(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const handleBuildRoute = useCallback(() => {
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
					const routeData = await buildRoute(userPos, targetPos);
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
	}, [targetPos]);

	return { handleBuildRoute, route, loading, error };
}

export default useRoute;
