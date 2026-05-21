import { Nav, WeightRelevant } from './types/types';

export const AppRoute = {
	Root: '/',
	About: '/about',
	Catalog: '/catalog',
	CakesCatalog: '/catalog/cakes',
	CakeOfferArticle: '/cake-offer/:id',
	BentoCakesCatalog: '/catalog/bento-cakes',
	Delivery: '/delivery',
	Faq: '/faq',
	Reviews: '/reviews',
	Contacts: '/contacts',
	ShoppingCart: '/shopping-cart',
	OrderRegistration: '/order-registration',
	Thanks: '/thanks-page'
} as const;

export const NAVS: Nav[] = [
	{
		title: 'О нас',
		image: '',
		path: AppRoute.About
	},
	{
		title: 'Каталог',
		image: '',
		path: AppRoute.Catalog
	},
	{
		title: 'Доставка и оплата',
		image: '',
		path: AppRoute.Delivery
	},
	{
		title: 'Частые вопросы',
		image: '',
		path: AppRoute.Faq
	},
	{
		title: 'Отзывы',
		image: '',
		path: `${AppRoute.About}#rewievs`
	},
	{
		title: 'Контакты',
		image: '',
		path: AppRoute.Contacts
	},
	{
		title: 'Торты',
		image: '',
		path: AppRoute.CakesCatalog
	},
	{
		title: 'Бенто-торты',
		image: '',
		path: AppRoute.BentoCakesCatalog
	}
];

export const LAYOUT_NAVS: Nav[] = [...NAVS].splice(0, 6);

export const SORT_KINDS = [
	'Друзьям',
	'Родителям',
	'Детям',
	'Коллегам',
	'Любимым',
	'Себе к чаю'
] as const;

export const NameSpace = {
	Data: 'DATA',
	Main: 'MAIN'
} as const;

export const weightScale: Record<string, WeightRelevant> = {
	1.5: {
		multiplier: 0,
		persons: '10-14'
	},
	3: {
		multiplier: 0.5,
		persons: '15-18'
	},
	5: {
		multiplier: 1.5,
		persons: '20-25'
	}
};

export const ConfirmMessage = {
	ClearCart: 'Очистить корзину заказов?',
	ClearOrder: 'Удалить заказ?'
} as const;

export const IMPORTANCES = [
	{
		title: 'Вкус — это главное',
		description: `Нам самим надоели слишком при торты, от которых устаёшь ещё на половине кусочка.
			Мы создаем сбалансированные вкусы, которые хочется кушать снова и снова.`
	},
	{
		title: 'Визуальное совершенство',
		description: `Торт — это украшение вашего праздника. Поэтому внешний вид мы доводим до идеала: 
			аккуратный декор, правильные пропорции и сочетающиеся цвета.`
	},
	{
		title: 'Забота о здоровье',
		description: `Мы не экономим на качестве. Готовим из натуральных продуктов, без консервантов и 
			заменителей молочного жира. Всё, что попадёт на ваш стол — 100% безопасно.`
	}
];

export const ABOUT_QUESTIONS = [
	{
		title: 'Вопрос номер 1',
		text: `В своем декоре мы используем только натуральные, природные красители — 
	куркумин, экстракт хлорофилла, экстракт кожицы винограда, уголь растительный
	 и многие другие.`,
		isActive: false
	},
	{
		title: 'Вопрос номер 2',
		text: `В своем декоре мы используем только натуральные, природные красители — 
	куркумин, экстракт хлорофилла, экстракт кожицы винограда, уголь растительный
	 и многие другие.`,
		isActive: false
	},
	{
		title: 'Вопрос номер 3',
		text: `В своем декоре мы используем только натуральные, природные красители — 
	куркумин, экстракт хлорофилла, экстракт кожицы винограда, уголь растительный
	 и многие другие.`,
		isActive: false
	},
	{
		title: 'Вопрос номер 4',
		text: `В своем декоре мы используем только натуральные, природные красители — 
	куркумин, экстракт хлорофилла, экстракт кожицы винограда, уголь растительный
	 и многие другие.`,
		isActive: false
	},
	{
		title: 'Очень длинный текст для вопроса номер пять',
		text: `В своем декоре мы используем только натуральные, природные красители — 
	куркумин, экстракт хлорофилла, экстракт кожицы винограда, уголь растительный
	 и многие другие.`,
		isActive: false
	}
];
