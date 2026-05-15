import { AppRoute } from '../constants';

export type RoutePath = (typeof AppRoute)[keyof typeof AppRoute];

export type Nav = {
	title:
		| 'О нас'
		| 'Каталог'
		| 'Доставка и оплата'
		| 'Частые вопросы'
		| 'Отзывы'
		| 'Контакты'
		| 'Каталог десертов'
		| 'Торты'
		| 'Бенто-торты';
	image: string;
	path: RoutePath;
};

export type Filling = {
	name: string;
	title: string;
	price: number;
	description: string;
	isInclude: boolean;
	image: string;
	ingredients?: string[];
	nutrition?: {
		calories: string;
		proteins: string;
		fats: string;
		carbs: string;
	};
};

export type Optional = {
	name: string;
	title: string;
	price: number;
	isInclude: boolean;
	image: string;
};

export type CakeOffer = {
	id: string;
	isBento: boolean;
	category: string;
	title: string;
	images: string[];
	price: number;
	describe: string;
	filling: Filling[];
	weight: number[];
	optionally: Optional[];
};

export type Radio = {
	weightValue: number;
	isChecked: boolean;
	value?: number;
};

export type Slide = {
	slideSrc: string;
	slideAlt: 'cake-slide';
	isVisible: boolean;
};

export type CheckBoxValue = {
	[key: string]: boolean;
};

export type WeightRelevant = {
	multiplier: number;
	persons: string;
};

export type CakeOrder = {
	cakeId: string;
	weight: Radio[];
	filling: CheckBoxValue;
	optional: CheckBoxValue;
	price: number;
	quantity: number;
};
