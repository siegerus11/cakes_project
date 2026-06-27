import { NameSpace } from '../../constants';
import { mainProcessSelectors, mainProcessState } from './main-process';

describe('Main-process selectors', () => {
	const state: { [NameSpace.Main]: mainProcessState } = {
		[NameSpace.Main]: {
			totalPrice: 1000,
			activeOffer: 'offer-001',
			sortingStatus: 'Друзьям',
			searchQuery: '',
			errorText: 'Error message'
		}
	};

	it('Should return total price from state', () => {
		const result = mainProcessSelectors.selectTotalPrice(state);

		expect(result).toBe(state[NameSpace.Main].totalPrice);
	});

	it('Should return activeOfferId from state', () => {
		const result = mainProcessSelectors.selectActiveOffer(state);

		expect(result).toBe(state[NameSpace.Main].activeOffer);
	});

	it('Should return sortingStatus from state', () => {
		const result = mainProcessSelectors.selectSortingStatus(state);

		expect(result).toBe(state[NameSpace.Main].sortingStatus);
	});

	it('Should return errorText from state', () => {
		const result = mainProcessSelectors.selectErrorMessage(state);

		expect(result).toBe(state[NameSpace.Main].errorText);
	});
});
