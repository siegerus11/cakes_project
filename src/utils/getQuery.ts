import { CakeOffer } from '../types/types';

const getByQuery = (array: CakeOffer[], query: string): CakeOffer[] => {
	const result = array.filter(item => {
		const titleMatch = item.title
			.toLowerCase()
			.includes(query.toLowerCase());
		const descriptionMatch = item.description
			?.toLowerCase()
			.includes(query.toLowerCase());
		return titleMatch || descriptionMatch;
	});

	return result;
};

export default getByQuery;
