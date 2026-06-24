import { CakeOrder } from '../types/types';

const updateQuantity = (quantity: number, num: number, id: string) => {
	const newQuantity = quantity + num;
	const storageKey = `cake-cart-${id}`;
	const stored = localStorage.getItem(storageKey);
	if (stored) {
		const parsed = JSON.parse(stored) as CakeOrder;
		const result = {
			...parsed,
			quantity: newQuantity
		};
		localStorage.setItem(storageKey, JSON.stringify(result));
	}
};

export default updateQuantity;
