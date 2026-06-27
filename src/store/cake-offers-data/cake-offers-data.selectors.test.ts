import { NameSpace, LoadingStatus } from '../../constants';
import makeFakeCakeOffer from '../../mocks/makeFakeOffer';
import {
	cakeOffersDataSelectors,
	cakeOffersDataState
} from './cake-offers-data';

describe('Cake-offers-data selectors', () => {
	const state: { [NameSpace.Data]: cakeOffersDataState } = {
		[NameSpace.Data]: {
			cakeOffers: [makeFakeCakeOffer()],
			offersLoadingStatus: LoadingStatus.Idle,
			orderSendingStatus: LoadingStatus.Idle
		}
	};

	it('Should return cake offers from state', () => {
		const result = cakeOffersDataSelectors.selectCakeOffers(state);

		expect(result).toEqual(state[NameSpace.Data].cakeOffers);
	});

	it('Should return offers loading status from state', () => {
		const result = cakeOffersDataSelectors.selectOffersLoadingStatus(state);

		expect(result).toBe(state[NameSpace.Data].offersLoadingStatus);
	});

	it('Should return order sending status from state', () => {
		const result = cakeOffersDataSelectors.selectOrderSendingStatus(state);

		expect(result).toBe(state[NameSpace.Data].orderSendingStatus);
	});
});
