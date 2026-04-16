import { CheckBoxValue, Filling, Optional } from '../types/types';

export function createCheckBoxInitial<T extends Optional | Filling>(
	array: T[],
	field: keyof T
): CheckBoxValue {
	return array.reduce((obj: Record<string, boolean>, item: T) => {
		obj[item[field] as unknown as keyof T] = false;
		return obj;
	}, {});
}
