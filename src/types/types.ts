import { AppRoute } from '../constants';
import { createInitial } from '../utils/createInitial';

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
	price: number;
	description: string;
	isInclude: boolean;
	image: string;
};

export type Optional = {
	name: 'classicCandles' | 'numberCandles' | 'birthdayTopper' | 'other';
	title:
		| 'Свечи классические'
		| 'Свечи цифрами'
		| 'Топпер «С Днем рождения»'
		| 'Тут длиный текст, который не помещается в одну строку';
	price: number;
	isInclude: boolean;
	image: string;
};

export type CakeOffer = {
	id: string;
	isBento: boolean;
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
};

export type CheckBoxValue = {
	[key: string]: boolean;
};

export type WeightRelevant = {
	multiplier: number;
	persons: string;
};
