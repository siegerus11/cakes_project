import { Slide } from '../types/types';

export const createSlidesInitial = (array: string[]): Slide[] => {
	return array.map((item, i) => {
		return {
			slideSrc: item,
			slideAlt: 'cake-slide',
			isVisible: i === 0
		};
	});
};
