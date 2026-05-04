import { CakeOffer } from '../types/types';

const getSortedByCategory = (cakes: CakeOffer[], category: string) => {
	if (category === '') return cakes;
	return cakes.filter(cake => cake.category === category);
};

export default getSortedByCategory;
