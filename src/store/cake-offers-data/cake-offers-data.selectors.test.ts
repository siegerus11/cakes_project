import { NameSpace, LoadingStatus } from '../../constants';
import makeFakeCakeOffer from '../../mocks/makeFakeOffer';
import {
	selectCakeOffers,
	selectOffersLoadingStatus,
	selectOrderSendingStatus
} from './cake-offers-data';

describe('Cake-offers-data selectors', () => {
	const state = {
		[NameSpace.Data]: {
			cakeOffers: [makeFakeCakeOffer()],
			offersLoadingStatus: LoadingStatus.Idle,
			orderSendingStatus: LoadingStatus.Idle
		}
	};

	it('Should return cake offers from state', () => {
		const result = selectCakeOffers(state);

		expect(result).toEqual([makeFakeCakeOffer()]);
	});

	it('Should return offers loading status from state', () => {
		const result = selectOffersLoadingStatus(state);

		expect(result).toEqual('idle');
	});

	it('Should return order sending status from state', () => {
		const result = selectOrderSendingStatus(state);

		expect(result).toEqual('idle');
	});
});
