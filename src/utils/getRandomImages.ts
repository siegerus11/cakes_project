import { CakeOffer } from '../types/types';

const getRandomImages = (offers: CakeOffer[]) => {
	const images = offers
		.map(item => item.images)
		.reduce((resultArr, item) => resultArr.concat(item), []);

	function shuffle(array: string[]) {
		const arr = [...array];
		for (let i = arr.length - 1; i > 0; i -= 1) {
			const j = Math.floor(Math.random() * (i + 1));
			[arr[i], arr[j]] = [arr[j], arr[i]];
		}
		return arr;
	}
	return shuffle(images).splice(0, 4);
};

export default getRandomImages;
