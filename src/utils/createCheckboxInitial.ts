import { CheckBoxValue, Filling, Optional } from '../types/types';

function createCheckBoxInitial<T extends Optional | Filling>(
	array: T[],
	field: keyof T
): CheckBoxValue {
	return array.reduce((obj: CheckBoxValue, item: T) => ({
		...obj,
		[item[field] as unknown as string]: false
	}), {});
}

export default createCheckBoxInitial;
