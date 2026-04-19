import { weightScale } from '../constants';

export const getPersonQuantity = (weigh: number): string => {
	const { persons } = weightScale[weigh];
	if (!persons) return '';
	return persons;
};
