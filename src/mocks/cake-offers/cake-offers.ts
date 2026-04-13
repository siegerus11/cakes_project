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
		filling: [
			{
				name: 'cherryWithYogurt',
				title: 'Вишня с йогуртом',
				description: 'Lorem ipsum dolor sit amet consectetur',
				isInclude: false
			},
			{
				name: 'souffleWithPeaches',
				title: 'Суфле с персиками',
				description: 'Lorem ipsum dolor sit amet consectetur',
				isInclude: false
			},
			{
				name: 'wildBerry',
				title: 'Лесная ягода',
				description: 'Lorem ipsum dolor sit amet consectetur',
				isInclude: false
			},
			{
				name: 'homelike',
				title: 'Домашний',
				description: 'Lorem ipsum dolor sit amet consectetur',
				isInclude: false
			}
		],
		weight: [1.5, 3, 5],
		optionally: [
			{
				name: 'classicCandles',
				title: 'Свечи классические',
				price: 0,
				isInclude: false
			},
			{
				name: 'numberCandles',
				title: 'Свечи c цифрами',
				price: 180,
				isInclude: false
			},
			{
				name: 'birthdayTopper',
				title: 'Свечи c цифрами',
				price: 120,
				isInclude: false
			},
			{
				name: 'other',
				title: 'Тут длиный текст, который не помещается в одну строку',
				price: 450,
				isInclude: false
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
		filling: [
			{
				name: 'cherryWithYogurt',
				title: 'Вишня с йогуртом',
				description: 'Lorem ipsum dolor sit amet consectetur',
				isInclude: false
			},
			{
				name: 'souffleWithPeaches',
				title: 'Суфле с персиками',
				description: 'Lorem ipsum dolor sit amet consectetur',
				isInclude: false
			},
			{
				name: 'wildBerry',
				title: 'Лесная ягода',
				description: 'Lorem ipsum dolor sit amet consectetur',
				isInclude: false
			},
			{
				name: 'homelike',
				title: 'Домашний',
				description: 'Lorem ipsum dolor sit amet consectetur',
				isInclude: false
			}
		],
		weight: [1.5, 3, 5],
		optionally: [
			{
				name: 'classicCandles',
				title: 'Свечи классические',
				price: 0,
				isInclude: false
			},
			{
				name: 'numberCandles',
				title: 'Свечи c цифрами',
				price: 180,
				isInclude: false
			},
			{
				name: 'birthdayTopper',
				title: 'Свечи c цифрами',
				price: 120,
				isInclude: false
			},
			{
				name: 'other',
				title: 'Тут длиный текст, который не помещается в одну строку',
				price: 450,
				isInclude: false
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
		filling: [
			{
				name: 'cherryWithYogurt',
				title: 'Вишня с йогуртом',
				description: 'Lorem ipsum dolor sit amet consectetur',
				isInclude: false
			},
			{
				name: 'souffleWithPeaches',
				title: 'Суфле с персиками',
				description: 'Lorem ipsum dolor sit amet consectetur',
				isInclude: false
			},
			{
				name: 'wildBerry',
				title: 'Лесная ягода',
				description: 'Lorem ipsum dolor sit amet consectetur',
				isInclude: false
			},
			{
				name: 'homelike',
				title: 'Домашний',
				description: 'Lorem ipsum dolor sit amet consectetur',
				isInclude: false
			}
		],
		weight: [1.5, 3, 5],
		optionally: [
			{
				name: 'classicCandles',
				title: 'Свечи классические',
				price: 0,
				isInclude: false
			},
			{
				name: 'numberCandles',
				title: 'Свечи c цифрами',
				price: 180,
				isInclude: false
			},
			{
				name: 'birthdayTopper',
				title: 'Свечи c цифрами',
				price: 120,
				isInclude: false
			},
			{
				name: 'other',
				title: 'Тут длиный текст, который не помещается в одну строку',
				price: 450,
				isInclude: false
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
		filling: [
			{
				name: 'cherryWithYogurt',
				title: 'Вишня с йогуртом',
				description: 'Lorem ipsum dolor sit amet consectetur',
				isInclude: false
			},
			{
				name: 'souffleWithPeaches',
				title: 'Суфле с персиками',
				description: 'Lorem ipsum dolor sit amet consectetur',
				isInclude: false
			},
			{
				name: 'wildBerry',
				title: 'Лесная ягода',
				description: 'Lorem ipsum dolor sit amet consectetur',
				isInclude: false
			},
			{
				name: 'homelike',
				title: 'Домашний',
				description: 'Lorem ipsum dolor sit amet consectetur',
				isInclude: false
			}
		],
		weight: [1.5, 3, 5],
		optionally: [
			{
				name: 'classicCandles',
				title: 'Свечи классические',
				price: 0,
				isInclude: false
			},
			{
				name: 'numberCandles',
				title: 'Свечи c цифрами',
				price: 180,
				isInclude: false
			},
			{
				name: 'birthdayTopper',
				title: 'Свечи c цифрами',
				price: 120,
				isInclude: false
			},
			{
				name: 'other',
				title: 'Тут длиный текст, который не помещается в одну строку',
				price: 450,
				isInclude: false
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
		filling: [
			{
				name: 'cherryWithYogurt',
				title: 'Вишня с йогуртом',
				description: 'Lorem ipsum dolor sit amet consectetur',
				isInclude: false
			},
			{
				name: 'souffleWithPeaches',
				title: 'Суфле с персиками',
				description: 'Lorem ipsum dolor sit amet consectetur',
				isInclude: false
			},
			{
				name: 'wildBerry',
				title: 'Лесная ягода',
				description: 'Lorem ipsum dolor sit amet consectetur',
				isInclude: false
			},
			{
				name: 'homelike',
				title: 'Домашний',
				description: 'Lorem ipsum dolor sit amet consectetur',
				isInclude: false
			}
		],
		weight: [1.5, 3, 5],
		optionally: [
			{
				name: 'classicCandles',
				title: 'Свечи классические',
				price: 0,
				isInclude: false
			},
			{
				name: 'numberCandles',
				title: 'Свечи c цифрами',
				price: 180,
				isInclude: false
			},
			{
				name: 'birthdayTopper',
				title: 'Свечи c цифрами',
				price: 120,
				isInclude: false
			},
			{
				name: 'other',
				title: 'Тут длиный текст, который не помещается в одну строку',
				price: 450,
				isInclude: false
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
		filling: [
			{
				name: 'cherryWithYogurt',
				title: 'Вишня с йогуртом',
				description: 'Lorem ipsum dolor sit amet consectetur',
				isInclude: false
			},
			{
				name: 'souffleWithPeaches',
				title: 'Суфле с персиками',
				description: 'Lorem ipsum dolor sit amet consectetur',
				isInclude: false
			},
			{
				name: 'wildBerry',
				title: 'Лесная ягода',
				description: 'Lorem ipsum dolor sit amet consectetur',
				isInclude: false
			},
			{
				name: 'homelike',
				title: 'Домашний',
				description: 'Lorem ipsum dolor sit amet consectetur',
				isInclude: false
			}
		],
		weight: [1.5, 3, 5],
		optionally: [
			{
				name: 'classicCandles',
				title: 'Свечи классические',
				price: 0,
				isInclude: false
			},
			{
				name: 'numberCandles',
				title: 'Свечи c цифрами',
				price: 180,
				isInclude: false
			},
			{
				name: 'birthdayTopper',
				title: 'Свечи c цифрами',
				price: 120,
				isInclude: false
			},
			{
				name: 'other',
				title: 'Тут длиный текст, который не помещается в одну строку',
				price: 450,
				isInclude: false
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
		filling: [
			{
				name: 'cherryWithYogurt',
				title: 'Вишня с йогуртом',
				description: 'Lorem ipsum dolor sit amet consectetur',
				isInclude: false
			},
			{
				name: 'souffleWithPeaches',
				title: 'Суфле с персиками',
				description: 'Lorem ipsum dolor sit amet consectetur',
				isInclude: false
			},
			{
				name: 'wildBerry',
				title: 'Лесная ягода',
				description: 'Lorem ipsum dolor sit amet consectetur',
				isInclude: false
			},
			{
				name: 'homelike',
				title: 'Домашний',
				description: 'Lorem ipsum dolor sit amet consectetur',
				isInclude: false
			}
		],
		weight: [1.5, 3, 5],
		optionally: [
			{
				name: 'classicCandles',
				title: 'Свечи классические',
				price: 0,
				isInclude: false
			},
			{
				name: 'numberCandles',
				title: 'Свечи c цифрами',
				price: 180,
				isInclude: false
			},
			{
				name: 'birthdayTopper',
				title: 'Свечи c цифрами',
				price: 120,
				isInclude: false
			},
			{
				name: 'other',
				title: 'Тут длиный текст, который не помещается в одну строку',
				price: 450,
				isInclude: false
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
		filling: [
			{
				name: 'cherryWithYogurt',
				title: 'Вишня с йогуртом',
				description: 'Lorem ipsum dolor sit amet consectetur',
				isInclude: false
			},
			{
				name: 'souffleWithPeaches',
				title: 'Суфле с персиками',
				description: 'Lorem ipsum dolor sit amet consectetur',
				isInclude: false
			},
			{
				name: 'wildBerry',
				title: 'Лесная ягода',
				description: 'Lorem ipsum dolor sit amet consectetur',
				isInclude: false
			},
			{
				name: 'homelike',
				title: 'Домашний',
				description: 'Lorem ipsum dolor sit amet consectetur',
				isInclude: false
			}
		],
		weight: [1.5, 3, 5],
		optionally: [
			{
				name: 'classicCandles',
				title: 'Свечи классические',
				price: 0,
				isInclude: false
			},
			{
				name: 'numberCandles',
				title: 'Свечи c цифрами',
				price: 180,
				isInclude: false
			},
			{
				name: 'birthdayTopper',
				title: 'Свечи c цифрами',
				price: 120,
				isInclude: false
			},
			{
				name: 'other',
				title: 'Тут длиный текст, который не помещается в одну строку',
				price: 450,
				isInclude: false
			}
		]
	}
];
