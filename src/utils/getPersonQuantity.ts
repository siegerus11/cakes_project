import { weightScale } from '../constants';

export const getPersonQuantity = (weigh: number, portion: boolean): string => {
	const { persons } = weightScale[weigh];
	if (!persons) return '';

	if (portion) return `${persons.split('-')[0]} `;
	return persons;
};

export default getPersonQuantity;
