import { Radio } from '../types/types';
import { weightScale } from '../constants';

export const getPricesByRadioValue = (
	array: Radio[],
	initialPrice: number
): number[] => {
	const checked = array.find((item: Radio) => item.isChecked);

	const multiplier = weightScale[checked?.weightValue!].multiplier;

	if (!checked?.weightValue) return [0];

	return [multiplier * initialPrice];
};
