import { CakeOffer } from '../types/types';

const defaultFilling = [
	{
		name: 'name',
		title: 'title',
		price: 950,
		description: 'Lorem ipsum',
		isInclude: false,
		image: '/',
		ingredients: [
			'Вишня',
			'Йогуртовый крем на основе натурального йогурта',
			'Сливки',
			'Бисквит ванильный',
			'Вишневый сироп',
			'Сливочное масло',
			'Натуральный ванилин'
		],
		nutrition: {
			calories: '200 ккал',
			proteins: '5 г',
			fats: '12 г',
			carbs: '20 г'
		}
	},
	{
		name: 'name',
		title: 'title',
		price: 950,
		description: 'Lorem ipsum',
		isInclude: false,
		image: '/',
		ingredients: [
			'Вишня',
			'Йогуртовый крем на основе натурального йогурта',
			'Сливки',
			'Бисквит ванильный',
			'Вишневый сироп',
			'Сливочное масло',
			'Натуральный ванилин'
		],
		nutrition: {
			calories: '200 ккал',
			proteins: '5 г',
			fats: '12 г',
			carbs: '20 г'
		}
	},
	{
		name: 'name',
		title: 'title',
		price: 950,
		description: 'Lorem ipsum',
		isInclude: false,
		image: '/',
		ingredients: [
			'Вишня',
			'Йогуртовый крем на основе натурального йогурта',
			'Сливки',
			'Бисквит ванильный',
			'Вишневый сироп',
			'Сливочное масло',
			'Натуральный ванилин'
		],
		nutrition: {
			calories: '200 ккал',
			proteins: '5 г',
			fats: '12 г',
			carbs: '20 г'
		}
	},
	{
		name: 'name',
		title: 'title',
		price: 950,
		description: 'Lorem ipsum',
		isInclude: false,
		image: '/',
		ingredients: [
			'Вишня',
			'Йогуртовый крем на основе натурального йогурта',
			'Сливки',
			'Бисквит ванильный',
			'Вишневый сироп',
			'Сливочное масло',
			'Натуральный ванилин'
		],
		nutrition: {
			calories: '200 ккал',
			proteins: '5 г',
			fats: '12 г',
			carbs: '20 г'
		}
	}
];

const defaultOptionally = [
	{
		name: 'name',
		title: 'title',
		price: 0,
		isInclude: false,
		image: '/'
	},
	{
		name: 'name',
		title: 'title',
		price: 180,
		isInclude: false,
		image: '/'
	},
	{
		name: 'name',
		title: 'title',
		price: 120,
		isInclude: false,
		image: '/'
	},
	{
		name: 'name',
		title: 'title',
		price: 450,
		isInclude: false,
		image: '/'
	}
];

const makeFakeCakeOffer = (): CakeOffer => ({
	id: 'id',
	isBento: true,
	category: 'Друзьям',
	title: 'title',
	images: [
		'../../../images/pictures/cake1.png',
		'../../../images/pictures/cake2.png',
		'../../../images/pictures/cake1.png',
		'../../../images/pictures/cake2.png'
	],
	price: 3600,
	describe: 'describe',
	filling: defaultFilling,
	weight: [1.5, 3, 5],
	optionally: defaultOptionally
});

export default makeFakeCakeOffer;
