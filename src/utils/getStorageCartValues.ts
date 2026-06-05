import { CakeOrder } from '../types/types';

const getStorageCartValues = (): CakeOrder[] => {
	if (typeof window === 'undefined') return [];

	return Object.entries(localStorage)
		.filter(([key]) => key.startsWith('cake-cart'))
		.map(([, value]) => {
			try {
				return JSON.parse(value) as CakeOrder;
			} catch {
				return null;
			}
		})
		.filter((item): item is CakeOrder => item !== null);
};

export default getStorageCartValues;
