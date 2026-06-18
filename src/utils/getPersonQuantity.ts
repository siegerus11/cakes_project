import { weightScale } from '../constants';

export const getPersonQuantity = (weight: number, portion: boolean): string => {
	const { persons } = weightScale[weight];
	if (!persons) return '';

	if (portion) return `${persons.split('-')[0]} `;
	return persons;
};

export default getPersonQuantity;
