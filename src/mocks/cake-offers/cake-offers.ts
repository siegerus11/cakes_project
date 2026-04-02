import { v4 as uuidv } from 'uuid';

import { CakeOffer } from '../../types/types';

export const cakeOffers: CakeOffer[] = [
	{
		id: uuidv(),
		isBento: false,
		title: 'Короткое',
		images: [
			'../../../public/images/pictures/cake1.png',
			'../../../public/images/pictures/cake2.png',
			'../../../public/images/pictures/cake1.png',
			'../../../public/images/pictures/cake2.png'
		],
		price: 3600,
		filling: {
			cherryWithYogurt: {
				title: 'Вишня с йогуртом',
				description: 'Lorem ipsum dolor sit amet consectetur',
				isInclude: false
			},
			souffleWithPeaches: {
				title: 'Суфле с персиками',
				description: 'Lorem ipsum dolor sit amet consectetur',
				isInclude: false
			},
			wildBerry: {
				title: 'Лесная ягода',
				description: 'Lorem ipsum dolor sit amet consectetur',
				isInclude: false
			},
			homelike: {
				title: 'Домашний',
				description: 'Lorem ipsum dolor sit amet consectetur',
				isInclude: false
			}
		},
		weight: [1.5, 3, 5],
		optionally: {
			classicCandles: {
				title: 'Свечи классические',
				price: 0,
				isInclude: false
			},
			numberCandles: {
				title: 'Свечи c цифрами',
				price: 180,
				isInclude: false
			},
			birthdayTopper: {
				title: 'Свечи c цифрами',
				price: 120,
				isInclude: false
			},
			other: {
				title: 'Тут длиный текст, который не помещается в одну строку',
				price: 450,
				isInclude: false
			}
		}
	},
	{
		id: uuidv(),
		isBento: false,
		title: 'Длинное название на несколько строк таких',
		images: [
			'../../../public/images/pictures/cake3.png',
			'../../../public/images/pictures/cake2.png',
			'../../../public/images/pictures/cake3.png',
			'../../../public/images/pictures/cake2.png'
		],
		price: 3600,
		filling: {
			cherryWithYogurt: {
				title: 'Вишня с йогуртом',
				description: 'Lorem ipsum dolor sit amet consectetur',
				isInclude: false
			},
			souffleWithPeaches: {
				title: 'Суфле с персиками',
				description: 'Lorem ipsum dolor sit amet consectetur',
				isInclude: false
			},
			wildBerry: {
				title: 'Лесная ягода',
				description: 'Lorem ipsum dolor sit amet consectetur',
				isInclude: false
			},
			homelike: {
				title: 'Домашний',
				description: 'Lorem ipsum dolor sit amet consectetur',
				isInclude: false
			}
		},
		weight: [1.5, 3, 5],
		optionally: {
			classicCandles: {
				title: 'Свечи классические',
				price: 0,
				isInclude: false
			},
			numberCandles: {
				title: 'Свечи c цифрами',
				price: 180,
				isInclude: false
			},
			birthdayTopper: {
				title: 'Свечи c цифрами',
				price: 120,
				isInclude: false
			},
			other: {
				title: 'Тут длиный текст, который не помещается в одну строку',
				price: 450,
				isInclude: false
			}
		}
	},
	{
		id: uuidv(),
		isBento: false,
		title: 'Торт с ягодами и безе',
		images: [
			'../../../public/images/pictures/cake4.png',
			'../../../public/images/pictures/cake3.png',
			'../../../public/images/pictures/cake4.png',
			'../../../public/images/pictures/cake3.png'
		],
		price: 3600,
		filling: {
			cherryWithYogurt: {
				title: 'Вишня с йогуртом',
				description: 'Lorem ipsum dolor sit amet consectetur',
				isInclude: false
			},
			souffleWithPeaches: {
				title: 'Суфле с персиками',
				description: 'Lorem ipsum dolor sit amet consectetur',
				isInclude: false
			},
			wildBerry: {
				title: 'Лесная ягода',
				description: 'Lorem ipsum dolor sit amet consectetur',
				isInclude: false
			},
			homelike: {
				title: 'Домашний',
				description: 'Lorem ipsum dolor sit amet consectetur',
				isInclude: false
			}
		},
		weight: [1.5, 3, 5],
		optionally: {
			classicCandles: {
				title: 'Свечи классические',
				price: 0,
				isInclude: false
			},
			numberCandles: {
				title: 'Свечи c цифрами',
				price: 180,
				isInclude: false
			},
			birthdayTopper: {
				title: 'Свечи c цифрами',
				price: 120,
				isInclude: false
			},
			other: {
				title: 'Тут длиный текст, который не помещается в одну строку',
				price: 450,
				isInclude: false
			}
		}
	},
	{
		id: uuidv(),
		isBento: false,
		title: 'Торт с ягодами и безе',
		images: [
			'../../../public/images/pictures/cake1.png',
			'../../../public/images/pictures/cake2.png',
			'../../../public/images/pictures/cake1.png',
			'../../../public/images/pictures/cake2.png'
		],
		price: 3600,
		filling: {
			cherryWithYogurt: {
				title: 'Вишня с йогуртом',
				description: 'Lorem ipsum dolor sit amet consectetur',
				isInclude: false
			},
			souffleWithPeaches: {
				title: 'Суфле с персиками',
				description: 'Lorem ipsum dolor sit amet consectetur',
				isInclude: false
			},
			wildBerry: {
				title: 'Лесная ягода',
				description: 'Lorem ipsum dolor sit amet consectetur',
				isInclude: false
			},
			homelike: {
				title: 'Домашний',
				description: 'Lorem ipsum dolor sit amet consectetur',
				isInclude: false
			}
		},
		weight: [1.5, 3, 5],
		optionally: {
			classicCandles: {
				title: 'Свечи классические',
				price: 0,
				isInclude: false
			},
			numberCandles: {
				title: 'Свечи c цифрами',
				price: 180,
				isInclude: false
			},
			birthdayTopper: {
				title: 'Свечи c цифрами',
				price: 120,
				isInclude: false
			},
			other: {
				title: 'Тут длиный текст, который не помещается в одну строку',
				price: 450,
				isInclude: false
			}
		}
	},
	// ----------------------------------------------------
	{
		id: uuidv(),
		isBento: true,
		title: 'Короткое',
		images: [
			'../../../public/images/pictures/cake2.png',
			'../../../public/images/pictures/cake1.png',
			'../../../public/images/pictures/cake1.png',
			'../../../public/images/pictures/cake2.png'
		],
		price: 3600,
		filling: {
			cherryWithYogurt: {
				title: 'Вишня с йогуртом',
				description: 'Lorem ipsum dolor sit amet consectetur',
				isInclude: false
			},
			souffleWithPeaches: {
				title: 'Суфле с персиками',
				description: 'Lorem ipsum dolor sit amet consectetur',
				isInclude: false
			},
			wildBerry: {
				title: 'Лесная ягода',
				description: 'Lorem ipsum dolor sit amet consectetur',
				isInclude: false
			},
			homelike: {
				title: 'Домашний',
				description: 'Lorem ipsum dolor sit amet consectetur',
				isInclude: false
			}
		},
		weight: [1.5, 3, 5],
		optionally: {
			classicCandles: {
				title: 'Свечи классические',
				price: 0,
				isInclude: false
			},
			numberCandles: {
				title: 'Свечи c цифрами',
				price: 180,
				isInclude: false
			},
			birthdayTopper: {
				title: 'Свечи c цифрами',
				price: 120,
				isInclude: false
			},
			other: {
				title: 'Тут длиный текст, который не помещается в одну строку',
				price: 450,
				isInclude: false
			}
		}
	},
	{
		id: uuidv(),
		isBento: true,
		title: 'Длинное название на несколько строк таких',
		images: [
			'../../../public/images/pictures/cake5.png',
			'../../../public/images/pictures/cake4.png',
			'../../../public/images/pictures/cake5.png',
			'../../../public/images/pictures/cake4.png'
		],
		price: 3600,
		filling: {
			cherryWithYogurt: {
				title: 'Вишня с йогуртом',
				description: 'Lorem ipsum dolor sit amet consectetur',
				isInclude: false
			},
			souffleWithPeaches: {
				title: 'Суфле с персиками',
				description: 'Lorem ipsum dolor sit amet consectetur',
				isInclude: false
			},
			wildBerry: {
				title: 'Лесная ягода',
				description: 'Lorem ipsum dolor sit amet consectetur',
				isInclude: false
			},
			homelike: {
				title: 'Домашний',
				description: 'Lorem ipsum dolor sit amet consectetur',
				isInclude: false
			}
		},
		weight: [1.5, 3, 5],
		optionally: {
			classicCandles: {
				title: 'Свечи классические',
				price: 0,
				isInclude: false
			},
			numberCandles: {
				title: 'Свечи c цифрами',
				price: 180,
				isInclude: false
			},
			birthdayTopper: {
				title: 'Свечи c цифрами',
				price: 120,
				isInclude: false
			},
			other: {
				title: 'Тут длиный текст, который не помещается в одну строку',
				price: 450,
				isInclude: false
			}
		}
	},
	{
		id: uuidv(),
		isBento: true,
		title: 'Торт с ягодами и безе',
		images: [
			'../../../public/images/pictures/cake2.png',
			'../../../public/images/pictures/cake1.png',
			'../../../public/images/pictures/cake1.png',
			'../../../public/images/pictures/cake2.png'
		],
		price: 3600,
		filling: {
			cherryWithYogurt: {
				title: 'Вишня с йогуртом',
				description: 'Lorem ipsum dolor sit amet consectetur',
				isInclude: false
			},
			souffleWithPeaches: {
				title: 'Суфле с персиками',
				description: 'Lorem ipsum dolor sit amet consectetur',
				isInclude: false
			},
			wildBerry: {
				title: 'Лесная ягода',
				description: 'Lorem ipsum dolor sit amet consectetur',
				isInclude: false
			},
			homelike: {
				title: 'Домашний',
				description: 'Lorem ipsum dolor sit amet consectetur',
				isInclude: false
			}
		},
		weight: [1.5, 3, 5],
		optionally: {
			classicCandles: {
				title: 'Свечи классические',
				price: 0,
				isInclude: false
			},
			numberCandles: {
				title: 'Свечи c цифрами',
				price: 180,
				isInclude: false
			},
			birthdayTopper: {
				title: 'Свечи c цифрами',
				price: 120,
				isInclude: false
			},
			other: {
				title: 'Тут длиный текст, который не помещается в одну строку',
				price: 450,
				isInclude: false
			}
		}
	},
	{
		id: uuidv(),
		isBento: true,
		title: 'Торт с ягодами и безе',
		images: [
			'../../../public/images/pictures/cake2.png',
			'../../../public/images/pictures/cake1.png',
			'../../../public/images/pictures/cake1.png',
			'../../../public/images/pictures/cake2.png'
		],
		price: 3600,
		filling: {
			cherryWithYogurt: {
				title: 'Вишня с йогуртом',
				description: 'Lorem ipsum dolor sit amet consectetur',
				isInclude: false
			},
			souffleWithPeaches: {
				title: 'Суфле с персиками',
				description: 'Lorem ipsum dolor sit amet consectetur',
				isInclude: false
			},
			wildBerry: {
				title: 'Лесная ягода',
				description: 'Lorem ipsum dolor sit amet consectetur',
				isInclude: false
			},
			homelike: {
				title: 'Домашний',
				description: 'Lorem ipsum dolor sit amet consectetur',
				isInclude: false
			}
		},
		weight: [1.5, 3, 5],
		optionally: {
			classicCandles: {
				title: 'Свечи классические',
				price: 0,
				isInclude: false
			},
			numberCandles: {
				title: 'Свечи c цифрами',
				price: 180,
				isInclude: false
			},
			birthdayTopper: {
				title: 'Свечи c цифрами',
				price: 120,
				isInclude: false
			},
			other: {
				title: 'Тут длиный текст, который не помещается в одну строку',
				price: 450,
				isInclude: false
			}
		}
	}
];
