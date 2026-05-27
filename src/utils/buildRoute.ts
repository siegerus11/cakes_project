import { RouteData } from '../types/types';

const buildRoute = async (
	from: [number, number],
	to: [number, number]
): Promise<RouteData | null> => {
	const url = `https://router.project-osrm.org/route/v1/driving/${from[1]},${from[0]};${to[1]},${to[0]}?overview=full&geometries=geojson`;

	const res = await fetch(url);
	const data = await res.json();

	if (data.code === 'Ok' && data.routes?.[0]) {
		return data.routes[0];
	}
	return null;
};

export default buildRoute;
