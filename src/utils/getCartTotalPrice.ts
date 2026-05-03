import { CakeOrder } from '../types/types';

function getCartTotalPrice(orders: CakeOrder[]): number {
	return orders.reduce(
		(sum: number, order: CakeOrder) => sum + order.price,
		0
	);
}

export default getCartTotalPrice;
