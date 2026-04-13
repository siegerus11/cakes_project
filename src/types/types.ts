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
	name: 'cherryWithYogurt' | 'souffleWithPeaches' | 'wildBerry' | 'homelike';
	title:
		| 'Вишня с йогуртом'
		| 'Суфле с персиками'
		| 'Лесная ягода'
		| 'Домашний';
	description: string;
	isInclude: boolean;
};

export type Optional = {
	name: 'classicCandles' | 'numberCandles' | 'birthdayTopper' | 'other';
	title:
		| 'Свечи классические'
		| 'Свечи c цифрами'
		| 'Топпер «С Днем рождения»'
		| 'Тут длиный текст, который не помещается в одну строку';
	price: number;
	isInclude: boolean;
};

export type CakeOffer = {
	id: string;
	isBento: boolean;
	title: string;
	images: string[];
	price: number;
	filling: Filling[];
	weight: number[];
	optionally: Optional[];
};

export type Radio = {
	isChecked: boolean;
	weightValue: number;
};
