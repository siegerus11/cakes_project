// eslint-disable-next-line import/no-unresolved
import { v4 as uuidv } from 'uuid';

import { CakeOffer } from '../../types/types';

const cakeOffers: CakeOffer[] = [
	{
		id: uuidv(),
		isBento: false,
		category: 'Друзьям',
		title: 'Короткое',
		images: [
			'../../../images/pictures/cake1.png',
			'../../../images/pictures/cake2.png',
			'../../../images/pictures/cake1.png',
			'../../../images/pictures/cake2.png'
		],
		price: 3600,
		describe: `Яркий авторский торт со свежими сезонными ягодами — настоящее украшение вашего стола. Очень вкусный, полезный и красивый тортик. Яркий авторский торт со свежими сезонными ягодами — настоящее украшение вашего стола.

		Очень вкусный, полезный и красивый тортик. Яркий авторский торт со свежими сезонными ягодами — настоящее украшение вашего стола.`,
		filling: [
			{
				name: 'cherryWithYogurt',
				title: 'Вишня с йогуртом',
				price: 950,
				description: 'Lorem ipsum dolor sit amet consectetur',
				isInclude: false,
				image: '/'
			},
			{
				name: 'souffleWithPeaches',
				title: 'Суфле с персиками',
				price: 950,
				description: 'Lorem ipsum dolor sit amet consectetur',
				isInclude: false,
				image: '/'
			},
			{
				name: 'wildBerry',
				title: 'Лесная ягода',
				price: 950,
				description: 'Lorem ipsum dolor sit amet consectetur',
				isInclude: false,
				image: '/'
			},
			{
				name: 'homelike',
				title: 'Домашний',
				price: 950,
				description: 'Lorem ipsum dolor sit amet consectetur',
				isInclude: false,
				image: '/'
			}
		],
		weight: [1.5, 3, 5],
		optionally: [
			{
				name: 'classicCandles',
				title: 'Свечи классические',
				price: 0,
				isInclude: false,
				image: '/'
			},
			{
				name: 'numberCandles',
				title: 'Свечи цифрами',
				price: 180,
				isInclude: false,
				image: '/'
			},
			{
				name: 'birthdayTopper',
				title: 'Топпер «С Днем рождения»',
				price: 120,
				isInclude: false,
				image: '/'
			},
			{
				name: 'other',
				title: 'Тут длиный текст, который не помещается в одну строку',
				price: 450,
				isInclude: false,
				image: '/'
			}
		]
	},
	{
		id: uuidv(),
		isBento: false,
		category: 'Родителям',
		title: 'Длинное название на несколько строк таких',
		images: [
			'../../../images/pictures/cake3.png',
			'../../../images/pictures/cake2.png',
			'../../../images/pictures/cake3.png',
			'../../../images/pictures/cake2.png'
		],
		price: 3600,
		describe: `Яркий авторский торт со свежими сезонными ягодами — настоящее украшение вашего стола. Очень вкусный, полезный и красивый тортик. Яркий авторский торт со свежими сезонными ягодами — настоящее украшение вашего стола.
		Очень вкусный, полезный и красивый тортик. Яркий авторский торт со свежими сезонными ягодами — настоящее украшение вашего стола.`,
		filling: [
			{
				name: 'cherryWithYogurt',
				title: 'Вишня с йогуртом',
				price: 950,
				description: 'Lorem ipsum dolor sit amet consectetur',
				isInclude: false,
				image: '/'
			},
			{
				name: 'souffleWithPeaches',
				title: 'Суфле с персиками',
				price: 950,
				description: 'Lorem ipsum dolor sit amet consectetur',
				isInclude: false,
				image: '/'
			},
			{
				name: 'wildBerry',
				title: 'Лесная ягода',
				price: 950,
				description: 'Lorem ipsum dolor sit amet consectetur',
				isInclude: false,
				image: '/'
			},
			{
				name: 'homelike',
				title: 'Домашний',
				price: 950,
				description: 'Lorem ipsum dolor sit amet consectetur',
				isInclude: false,
				image: '/'
			}
		],
		weight: [1.5, 3, 5],
		optionally: [
			{
				name: 'classicCandles',
				title: 'Свечи классические',
				price: 0,
				isInclude: false,
				image: '/'
			},
			{
				name: 'numberCandles',
				title: 'Свечи цифрами',
				price: 180,
				isInclude: false,
				image: '/'
			},
			{
				name: 'birthdayTopper',
				title: 'Топпер «С Днем рождения»',
				price: 120,
				isInclude: false,
				image: '/'
			},
			{
				name: 'other',
				title: 'Тут длиный текст, который не помещается в одну строку',
				price: 450,
				isInclude: false,
				image: '/'
			}
		]
	},
	{
		id: uuidv(),
		isBento: false,
		category: 'Детям',
		title: 'Торт с ягодами и безе',
		images: [
			'../../../images/pictures/cake4.png',
			'../../../images/pictures/cake3.png',
			'../../../images/pictures/cake4.png',
			'../../../images/pictures/cake3.png'
		],
		price: 3600,
		describe: `Яркий авторский торт со свежими сезонными ягодами — настоящее украшение вашего стола. Очень вкусный, полезный и красивый тортик. Яркий авторский торт со свежими сезонными ягодами — настоящее украшение вашего стола.
		Очень вкусный, полезный и красивый тортик. Яркий авторский торт со свежими сезонными ягодами — настоящее украшение вашего стола.`,
		filling: [
			{
				name: 'cherryWithYogurt',
				title: 'Вишня с йогуртом',
				price: 950,
				description: 'Lorem ipsum dolor sit amet consectetur',
				isInclude: false,
				image: '/'
			},
			{
				name: 'souffleWithPeaches',
				title: 'Суфле с персиками',
				price: 950,
				description: 'Lorem ipsum dolor sit amet consectetur',
				isInclude: false,
				image: '/'
			},
			{
				name: 'wildBerry',
				title: 'Лесная ягода',
				price: 950,
				description: 'Lorem ipsum dolor sit amet consectetur',
				isInclude: false,
				image: '/'
			},
			{
				name: 'homelike',
				title: 'Домашний',
				price: 950,
				description: 'Lorem ipsum dolor sit amet consectetur',
				isInclude: false,
				image: '/'
			}
		],
		weight: [1.5, 3, 5],
		optionally: [
			{
				name: 'classicCandles',
				title: 'Свечи классические',
				price: 0,
				isInclude: false,
				image: '/'
			},
			{
				name: 'numberCandles',
				title: 'Свечи цифрами',
				price: 180,
				isInclude: false,
				image: '/'
			},
			{
				name: 'birthdayTopper',
				title: 'Свечи цифрами',
				price: 120,
				isInclude: false,
				image: '/'
			},
			{
				name: 'other',
				title: 'Тут длиный текст, который не помещается в одну строку',
				price: 450,
				isInclude: false,
				image: '/'
			}
		]
	},
	{
		id: uuidv(),
		isBento: false,
		category: 'Коллегам',
		title: 'Торт с ягодами и безе',
		images: [
			'../../../images/pictures/cake1.png',
			'../../../images/pictures/cake2.png',
			'../../../images/pictures/cake1.png',
			'../../../images/pictures/cake2.png'
		],
		price: 3600,
		describe: `Яркий авторский торт со свежими сезонными ягодами — настоящее украшение вашего стола. Очень вкусный, полезный и красивый тортик. Яркий авторский торт со свежими сезонными ягодами — настоящее украшение вашего стола.
		Очень вкусный, полезный и красивый тортик. Яркий авторский торт со свежими сезонными ягодами — настоящее украшение вашего стола.`,
		filling: [
			{
				name: 'cherryWithYogurt',
				title: 'Вишня с йогуртом',
				price: 950,
				description: 'Lorem ipsum dolor sit amet consectetur',
				isInclude: false,
				image: '/'
			},
			{
				name: 'souffleWithPeaches',
				title: 'Суфле с персиками',
				price: 950,
				description: 'Lorem ipsum dolor sit amet consectetur',
				isInclude: false,
				image: '/'
			},
			{
				name: 'wildBerry',
				title: 'Лесная ягода',
				price: 950,
				description: 'Lorem ipsum dolor sit amet consectetur',
				isInclude: false,
				image: '/'
			},
			{
				name: 'homelike',
				title: 'Домашний',
				price: 950,
				description: 'Lorem ipsum dolor sit amet consectetur',
				isInclude: false,
				image: '/'
			}
		],
		weight: [1.5, 3, 5],
		optionally: [
			{
				name: 'classicCandles',
				title: 'Свечи классические',
				price: 0,
				isInclude: false,
				image: '/'
			},
			{
				name: 'numberCandles',
				title: 'Свечи цифрами',
				price: 180,
				isInclude: false,
				image: '/'
			},
			{
				name: 'birthdayTopper',
				title: 'Свечи цифрами',
				price: 120,
				isInclude: false,
				image: '/'
			},
			{
				name: 'other',
				title: 'Тут длиный текст, который не помещается в одну строку',
				price: 450,
				isInclude: false,
				image: '/'
			}
		]
	},
	// ----------------------------------------------------
	{
		id: uuidv(),
		isBento: true,
		category: 'Любимым',
		title: 'Короткое',
		images: [
			'../../../images/pictures/cake2.png',
			'../../../images/pictures/cake1.png',
			'../../../images/pictures/cake1.png',
			'../../../images/pictures/cake2.png'
		],
		price: 3600,
		describe: `Яркий авторский торт со свежими сезонными ягодами — настоящее украшение вашего стола. Очень вкусный, полезный и красивый тортик. Яркий авторский торт со свежими сезонными ягодами — настоящее украшение вашего стола.
		Очень вкусный, полезный и красивый тортик. Яркий авторский торт со свежими сезонными ягодами — настоящее украшение вашего стола.`,
		filling: [
			{
				name: 'cherryWithYogurt',
				title: 'Вишня с йогуртом',
				price: 950,
				description: 'Lorem ipsum dolor sit amet consectetur',
				isInclude: false,
				image: '/'
			},
			{
				name: 'souffleWithPeaches',
				title: 'Суфле с персиками',
				price: 950,
				description: 'Lorem ipsum dolor sit amet consectetur',
				isInclude: false,
				image: '/'
			},
			{
				name: 'wildBerry',
				title: 'Лесная ягода',
				price: 950,
				description: 'Lorem ipsum dolor sit amet consectetur',
				isInclude: false,
				image: '/'
			},
			{
				name: 'homelike',
				title: 'Домашний',
				price: 950,
				description: 'Lorem ipsum dolor sit amet consectetur',
				isInclude: false,
				image: '/'
			}
		],
		weight: [1.5, 3, 5],
		optionally: [
			{
				name: 'classicCandles',
				title: 'Свечи классические',
				price: 0,
				isInclude: false,
				image: '/'
			},
			{
				name: 'numberCandles',
				title: 'Свечи цифрами',
				price: 180,
				isInclude: false,
				image: '/'
			},
			{
				name: 'birthdayTopper',
				title: 'Свечи цифрами',
				price: 120,
				isInclude: false,
				image: '/'
			},
			{
				name: 'other',
				title: 'Тут длиный текст, который не помещается в одну строку',
				price: 450,
				isInclude: false,
				image: '/'
			}
		]
	},
	{
		id: uuidv(),
		isBento: true,
		category: 'Себе к чаю',
		title: 'Длинное название на несколько строк таких',
		images: [
			'../../../images/pictures/cake5.png',
			'../../../images/pictures/cake4.png',
			'../../../images/pictures/cake5.png',
			'../../../images/pictures/cake4.png'
		],
		price: 3600,
		describe: `Яркий авторский торт со свежими сезонными ягодами — настоящее украшение вашего стола. Очень вкусный, полезный и красивый тортик. Яркий авторский торт со свежими сезонными ягодами — настоящее украшение вашего стола.
		Очень вкусный, полезный и красивый тортик. Яркий авторский торт со свежими сезонными ягодами — настоящее украшение вашего стола.`,
		filling: [
			{
				name: 'cherryWithYogurt',
				title: 'Вишня с йогуртом',
				price: 950,
				description: 'Lorem ipsum dolor sit amet consectetur',
				isInclude: false,
				image: '/'
			},
			{
				name: 'souffleWithPeaches',
				title: 'Суфле с персиками',
				price: 950,
				description: 'Lorem ipsum dolor sit amet consectetur',
				isInclude: false,
				image: '/'
			},
			{
				name: 'wildBerry',
				title: 'Лесная ягода',
				price: 950,
				description: 'Lorem ipsum dolor sit amet consectetur',
				isInclude: false,
				image: '/'
			},
			{
				name: 'homelike',
				title: 'Домашний',
				price: 950,
				description: 'Lorem ipsum dolor sit amet consectetur',
				isInclude: false,
				image: '/'
			}
		],
		weight: [1.5, 3, 5],
		optionally: [
			{
				name: 'classicCandles',
				title: 'Свечи классические',
				price: 0,
				isInclude: false,
				image: '/'
			},
			{
				name: 'numberCandles',
				title: 'Свечи цифрами',
				price: 180,
				isInclude: false,
				image: '/'
			},
			{
				name: 'birthdayTopper',
				title: 'Свечи цифрами',
				price: 120,
				isInclude: false,
				image: '/'
			},
			{
				name: 'other',
				title: 'Тут длиный текст, который не помещается в одну строку',
				price: 450,
				isInclude: false,
				image: '/'
			}
		]
	},
	{
		id: uuidv(),
		isBento: true,
		category: 'Друзьям',
		title: 'Торт с ягодами и безе',
		images: [
			'../../../images/pictures/cake2.png',
			'../../../images/pictures/cake1.png',
			'../../../images/pictures/cake1.png',
			'../../../images/pictures/cake2.png'
		],
		price: 3600,
		describe: `Яркий авторский торт со свежими сезонными ягодами — настоящее украшение вашего стола. Очень вкусный, полезный и красивый тортик. Яркий авторский торт со свежими сезонными ягодами — настоящее украшение вашего стола.
		Очень вкусный, полезный и красивый тортик. Яркий авторский торт со свежими сезонными ягодами — настоящее украшение вашего стола.`,
		filling: [
			{
				name: 'cherryWithYogurt',
				title: 'Вишня с йогуртом',
				price: 950,
				description: 'Lorem ipsum dolor sit amet consectetur',
				isInclude: false,
				image: '/'
			},
			{
				name: 'souffleWithPeaches',
				title: 'Суфле с персиками',
				price: 950,
				description: 'Lorem ipsum dolor sit amet consectetur',
				isInclude: false,
				image: '/'
			},
			{
				name: 'wildBerry',
				title: 'Лесная ягода',
				price: 950,
				description: 'Lorem ipsum dolor sit amet consectetur',
				isInclude: false,
				image: '/'
			},
			{
				name: 'homelike',
				title: 'Домашний',
				price: 950,
				description: 'Lorem ipsum dolor sit amet consectetur',
				isInclude: false,
				image: '/'
			}
		],
		weight: [1.5, 3, 5],
		optionally: [
			{
				name: 'classicCandles',
				title: 'Свечи классические',
				price: 0,
				isInclude: false,
				image: '/'
			},
			{
				name: 'numberCandles',
				title: 'Свечи цифрами',
				price: 180,
				isInclude: false,
				image: '/'
			},
			{
				name: 'birthdayTopper',
				title: 'Свечи цифрами',
				price: 120,
				isInclude: false,
				image: '/'
			},
			{
				name: 'other',
				title: 'Тут длиный текст, который не помещается в одну строку',
				price: 450,
				isInclude: false,
				image: '/'
			}
		]
	},
	{
		id: uuidv(),
		isBento: true,
		category: 'Друзьям',
		title: 'Торт с ягодами и безе',
		images: [
			'../../../images/pictures/cake2.png',
			'../../../images/pictures/cake1.png',
			'../../../images/pictures/cake1.png',
			'../../../images/pictures/cake2.png'
		],
		price: 3600,
		describe: `Яркий авторский торт со свежими сезонными ягодами — настоящее украшение вашего стола. Очень вкусный, полезный и красивый тортик. Яркий авторский торт со свежими сезонными ягодами — настоящее украшение вашего стола.
		Очень вкусный, полезный и красивый тортик. Яркий авторский торт со свежими сезонными ягодами — настоящее украшение вашего стола.`,
		filling: [
			{
				name: 'cherryWithYogurt',
				title: 'Вишня с йогуртом',
				price: 950,
				description: 'Lorem ipsum dolor sit amet consectetur',
				isInclude: false,
				image: '/'
			},
			{
				name: 'souffleWithPeaches',
				title: 'Суфле с персиками',
				price: 950,
				description: 'Lorem ipsum dolor sit amet consectetur',
				isInclude: false,
				image: '/'
			},
			{
				name: 'wildBerry',
				title: 'Лесная ягода',
				price: 950,
				description: 'Lorem ipsum dolor sit amet consectetur',
				isInclude: false,
				image: '/'
			},
			{
				name: 'homelike',
				title: 'Домашний',
				price: 950,
				description: 'Lorem ipsum dolor sit amet consectetur',
				isInclude: false,
				image: '/'
			}
		],
		weight: [1.5, 3, 5],
		optionally: [
			{
				name: 'classicCandles',
				title: 'Свечи классические',
				price: 0,
				isInclude: false,
				image: '/'
			},
			{
				name: 'numberCandles',
				title: 'Свечи цифрами',
				price: 180,
				isInclude: false,
				image: '/'
			},
			{
				name: 'birthdayTopper',
				title: 'Свечи цифрами',
				price: 120,
				isInclude: false,
				image: '/'
			},
			{
				name: 'other',
				title: 'Тут длиный текст, который не помещается в одну строку',
				price: 450,
				isInclude: false,
				image: '/'
			}
		]
	}
];

export default cakeOffers;
