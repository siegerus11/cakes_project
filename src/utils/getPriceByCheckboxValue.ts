import { Optional, CheckBoxValue, Filling } from '../types/types';

export function getPricesByCheckboxValue<T extends Optional | Filling>(
	array: T[],
	objectValue: CheckBoxValue
): number[] {
	const filteredChecked = Object.entries(objectValue)
		.filter(item => item[1] === true)
		.map(item => item[0]);

	const relativePrices = array.map(objItem => {
		const result: number[] = [];
		filteredChecked.forEach(item => {
			if (objItem.name === item) result.push(objItem.price);
		});
		return result;
	});

	return relativePrices.flat(1);
}
