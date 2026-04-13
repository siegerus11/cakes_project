import { Radio } from '../types/types';

export const createRadioItems = (array: number[]): Radio[] => {
	return array.map((item, i) => {
		return {
			isChecked: i === 0 ? true : false,
			weightValue: item
		};
	});
};
