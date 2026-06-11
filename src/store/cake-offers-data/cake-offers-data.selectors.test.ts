import { NameSpace, LoadingStatus } from '../../constants';
import {
	selectCakeOffers,
	selectOffersLoadingStatus
} from './cake-offers-data';

// describe('Cake-offers-data selectors', () => {
// 	const state = {
// 		[NameSpace.Data]: {
// 			cakeOffers: [makeFakeOffer()],
// 			offersLoadingStatus: LoadingStatus.Idle
// 		}
// 	};

// 	it('Should return cake offers from state', () => {
// 		const result = selectCakeOffers(state);

// 		expect(result).toEqual([makeFakeOffer()]);
// 	});

// 	it('Should return offers loading status from state', () => {
// 		const result = selectOffersLoadingStatus(state);

// 		expect(result).toEqual('idle');
// 	});
// });
