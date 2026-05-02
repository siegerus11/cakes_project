import { Radio } from '../types/types';

const createRadioInitial = (array: number[]): Radio[] => {
	return array.map((item, i) => ({
		isChecked: i === 0,
		weightValue: item
	}));
};

export default createRadioInitial;
