import { NameSpace } from '../../constants';
import {
	selectTotalPrice,
	selectActiveOffer,
	selectSortingStatus,
	selectErrorMessage
} from './main-process';

describe('Main-process selectors', () => {
	const state = {
		[NameSpace.Main]: {
			totalPrice: 1000,
			activeOffer: 'offer-001',
			sortingStatus: 'Друзьям',
			errorText: 'Error message'
		}
	};

	it('Should return total price from state', () => {
		const result = selectTotalPrice(state);

		expect(result).toBe(state[NameSpace.Main].totalPrice);
	});

	it('Should return activeOfferId from state', () => {
		const result = selectActiveOffer(state);

		expect(result).toBe(state[NameSpace.Main].activeOffer);
	});

	it('Should return sortingStatus from state', () => {
		const result = selectSortingStatus(state);

		expect(result).toBe(state[NameSpace.Main].sortingStatus);
	});

	it('Should return errorText from state', () => {
		const result = selectErrorMessage(state);

		expect(result).toBe(state[NameSpace.Main].errorText);
	});
});
