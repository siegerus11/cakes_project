import { CheckBoxValue, Radio } from '../types/types';

function getChosen(obj: CheckBoxValue | Radio[]): (string | number)[] {
	if (Array.isArray(obj)) {
		return obj.filter(item => item.isChecked).map(item => item.weightValue);
	}
	return Object.entries(obj)
		.filter(([_, value]) => value)
		.map(item => item[0]);
}

export default getChosen;