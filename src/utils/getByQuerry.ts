import { CakeOffer } from '../types/types';

const getByQuerry = (array: CakeOffer[], querry: string): CakeOffer[] => {
	const result = array.filter(item => {
		return item.title.toLowerCase().includes(querry.toLowerCase());
	});

	return result;
};

export default getByQuerry;
