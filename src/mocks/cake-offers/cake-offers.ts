import { v4 as uuidv } from 'uuid';

import { CakeOffer } from '../../types/types';

export const cakeOffers: CakeOffer[] = [
	{
		id: uuidv(),
		isBento: false,
		title: 'Короткое',
		images: [
			'../../../images/pictures/cake1.png',
			'../../../images/pictures/cake2.png',
			'../../../images/pictures/cake1.png',
			'../../../images/pictures/cake2.png'
		],
		price: 3600,
		describe: `Яркий авторский торт со свежими сезонными ягодами — настоящее украшение вашего стола. Очень вкусный, полезный и красивый тортик. 
		Яркий авторский торт со свежими сезонными ягодами — настоящее украшение вашего стола.
		Очень вкусный, полезный и красивый тортик. Яркий авторский торт со свежими сезонными ягодами — настоящее украшение вашего стола.`,
		filling: [
			{
				name: 'cherryWithYogurt',
				title: 'Вишня с йогуртом',
				description: 'Lorem ipsum dolor sit amet consectetur',
				isInclude: false,
				image: '/'
			},
			{
				name: 'souffleWithPeaches',
				title: 'Суфле с персиками',
				description: 'Lorem ipsum dolor sit amet consectetur',
				isInclude: false,
				image: '/'
			},
			{
				name: 'wildBerry',
				title: 'Лесная ягода',
				description: 'Lorem ipsum dolor sit amet consectetur',
				isInclude: false,
				image: '/'
			},
			{
				name: 'homelike',
				title: 'Домашний',
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
				price: 11,
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
				description: 'Lorem ipsum dolor sit amet consectetur',
				isInclude: false,
				image: '/'
			},
			{
				name: 'souffleWithPeaches',
				title: 'Суфле с персиками',
				description: 'Lorem ipsum dolor sit amet consectetur',
				isInclude: false,
				image: '/'
			},
			{
				name: 'wildBerry',
				title: 'Лесная ягода',
				description: 'Lorem ipsum dolor sit amet consectetur',
				isInclude: false,
				image: '/'
			},
			{
				name: 'homelike',
				title: 'Домашний',
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
				description: 'Lorem ipsum dolor sit amet consectetur',
				isInclude: false,
				image: '/'
			},
			{
				name: 'souffleWithPeaches',
				title: 'Суфле с персиками',
				description: 'Lorem ipsum dolor sit amet consectetur',
				isInclude: false,
				image: '/'
			},
			{
				name: 'wildBerry',
				title: 'Лесная ягода',
				description: 'Lorem ipsum dolor sit amet consectetur',
				isInclude: false,
				image: '/'
			},
			{
				name: 'homelike',
				title: 'Домашний',
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
				description: 'Lorem ipsum dolor sit amet consectetur',
				isInclude: false,
				image: '/'
			},
			{
				name: 'souffleWithPeaches',
				title: 'Суфле с персиками',
				description: 'Lorem ipsum dolor sit amet consectetur',
				isInclude: false,
				image: '/'
			},
			{
				name: 'wildBerry',
				title: 'Лесная ягода',
				description: 'Lorem ipsum dolor sit amet consectetur',
				isInclude: false,
				image: '/'
			},
			{
				name: 'homelike',
				title: 'Домашний',
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
				description: 'Lorem ipsum dolor sit amet consectetur',
				isInclude: false,
				image: '/'
			},
			{
				name: 'souffleWithPeaches',
				title: 'Суфле с персиками',
				description: 'Lorem ipsum dolor sit amet consectetur',
				isInclude: false,
				image: '/'
			},
			{
				name: 'wildBerry',
				title: 'Лесная ягода',
				description: 'Lorem ipsum dolor sit amet consectetur',
				isInclude: false,
				image: '/'
			},
			{
				name: 'homelike',
				title: 'Домашний',
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
				description: 'Lorem ipsum dolor sit amet consectetur',
				isInclude: false,
				image: '/'
			},
			{
				name: 'souffleWithPeaches',
				title: 'Суфле с персиками',
				description: 'Lorem ipsum dolor sit amet consectetur',
				isInclude: false,
				image: '/'
			},
			{
				name: 'wildBerry',
				title: 'Лесная ягода',
				description: 'Lorem ipsum dolor sit amet consectetur',
				isInclude: false,
				image: '/'
			},
			{
				name: 'homelike',
				title: 'Домашний',
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
				description: 'Lorem ipsum dolor sit amet consectetur',
				isInclude: false,
				image: '/'
			},
			{
				name: 'souffleWithPeaches',
				title: 'Суфле с персиками',
				description: 'Lorem ipsum dolor sit amet consectetur',
				isInclude: false,
				image: '/'
			},
			{
				name: 'wildBerry',
				title: 'Лесная ягода',
				description: 'Lorem ipsum dolor sit amet consectetur',
				isInclude: false,
				image: '/'
			},
			{
				name: 'homelike',
				title: 'Домашний',
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
				description: 'Lorem ipsum dolor sit amet consectetur',
				isInclude: false,
				image: '/'
			},
			{
				name: 'souffleWithPeaches',
				title: 'Суфле с персиками',
				description: 'Lorem ipsum dolor sit amet consectetur',
				isInclude: false,
				image: '/'
			},
			{
				name: 'wildBerry',
				title: 'Лесная ягода',
				description: 'Lorem ipsum dolor sit amet consectetur',
				isInclude: false,
				image: '/'
			},
			{
				name: 'homelike',
				title: 'Домашний',
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
