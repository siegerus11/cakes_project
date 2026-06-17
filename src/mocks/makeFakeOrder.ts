import { CakeOrder } from '../types/types';

const makeFakeOrder = (): CakeOrder => ({
	id: 'mock-id',
	cakeId: 'id',
	title: 'cake',
	image: '/public/images/pictures/cake1.png',
	weight: [{ weightValue: 1.5, isChecked: true }],
	filling: { isChecked: true },
	optional: {
		isChecked: true
	},
	price: 3600,
	quantity: 1
});

export default makeFakeOrder;
