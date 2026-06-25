import { CakeOffer } from '../types/types';

const getByQuerry = (array: CakeOffer[], querry: string): CakeOffer[] => {
	const result = array.filter(item => {
		const titleMatch = item.title
			.toLowerCase()
			.includes(querry.toLowerCase());
		const descriptionMatch = item.description
			?.toLowerCase()
			.includes(querry.toLowerCase());
		return titleMatch || descriptionMatch;
	});

	return result;
};

export default getByQuerry;
