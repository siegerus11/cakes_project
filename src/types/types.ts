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
		| 'Каталог десертов';
	image: string;
	path: RoutePath;
};

export type CakeOffer = {
	id: string;
	isBento: boolean;
	title: string;
	images: string[];
	price: number;
	filling: {
		cherryWithYogurt: {
			title: 'Вишня с йогуртом';
			description: string; // 'Lorem ipsum dolor sit amet consectetur'
			isInclude: boolean;
		};
		souffleWithPeaches: {
			title: 'Суфле с персиками';
			description: string; // 'Lorem ipsum dolor sit amet consectetur'
			isInclude: boolean;
		};
		wildBerry: {
			title: 'Лесная ягода';
			description: string; // 'Lorem ipsum dolor sit amet consectetur'
			isInclude: boolean;
		};
		homelike: {
			title: 'Домашний';
			description: string; // 'Lorem ipsum dolor sit amet consectetur'
			isInclude: boolean;
		};
	};
	weight: number[];
	optionally: {
		classicCandles: {
			title: 'Свечи классические';
			price: number;
			isInclude: boolean;
		};
		numberCandles: {
			title: 'Свечи c цифрами';
			price: number;
			isInclude: boolean;
		};
		birthdayTopper: {
			title: 'Свечи c цифрами';
			price: number;
			isInclude: boolean;
		};
		other: {
			title: 'Тут длиный текст, который не помещается в одну строку';
			price: number;
			isInclude: boolean;
		};
	};
};
