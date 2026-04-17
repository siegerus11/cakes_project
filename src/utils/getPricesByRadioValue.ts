import { Radio } from '../types/types';

export const getPricesByRadioValue = (
	array: Radio[],
	initialPrice: number
): number[] => {
	const checked = array.find((item: Radio) => item.isChecked === true);
	switch (checked?.weightValue) {
		case 1.5:
			return [0];
		case 3:
			return [initialPrice / 1.5];
		case 5:
			return [initialPrice * 1.5];
		default:
			return [0];
	}
};
