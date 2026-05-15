import { Radio } from '../types/types';
import { weightScale } from '../constants';

export const getPricesByRadioValue = (
	array: Radio[],
	initialPrice: number
): number[] => {
	const checked = array.find((item: Radio) => item.isChecked);

	if (!checked?.weightValue) return [0];

	const weightConfig = weightScale[checked.weightValue];
	if (!weightConfig) return [0];

	return [weightConfig.multiplier * initialPrice];
};
