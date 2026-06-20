import { CheckBoxValue, Filling, Optional } from '../types/types';

type StringKeys<T> = {
	[K in keyof T]: T[K] extends string ? K : never;
}[keyof T];

function createCheckBoxInitial<T extends Optional | Filling>(
	array: T[],
	field: StringKeys<T>
): CheckBoxValue {
	return array.reduce(
		(obj: CheckBoxValue, item: T) => ({
			...obj,
			[String(item[field])]: false
		}),
		{}
	);
}

export default createCheckBoxInitial;
