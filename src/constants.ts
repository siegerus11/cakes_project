import { Nav } from './types/types';

export const AppRoute = {
	ROOT: '/',
	ABOUT: '/about',
	CATALOG: '/catalog',
	CAKES_CATALOG: '/catalog/cakes',
	BENTO_CAKES_CATALOG: '/catalog/bento-cakes',
	DELIVERY: '/delivery',
	FAQ: '/faq',
	REVIEWS: '/reviews',
	CONTACTS: '/contacts'
} as const;

export const NAVS: Nav[] = [
	{
		title: 'О нас',
		image: '',
		path: AppRoute.ABOUT
	},
	{
		title: 'Каталог',
		image: '',
		path: AppRoute.CATALOG
	},
	{
		title: 'Доставка и оплата',
		image: '',
		path: AppRoute.DELIVERY
	},
	{
		title: 'Частые вопросы',
		image: '',
		path: AppRoute.FAQ
	},
	{
		title: 'Отзывы',
		image: '',
		path: AppRoute.REVIEWS
	},
	{
		title: 'Контакты',
		image: '',
		path: AppRoute.CONTACTS
	}
	// {
	// 	title: 'Отзывы11',
	// 	image: '',
	// 	path: AppRoute.BENTO_CAKES_CATALOG
	// }
];
