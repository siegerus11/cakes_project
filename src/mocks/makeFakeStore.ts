import { NameSpace, LoadingStatus } from '../constants';
import { State } from '../types/store';
import makeFakeCakeOffer from './makeFakeOffer';
import makeFakeOrder from './makeFakeOrder';

export const makeFakeStore = (initialState: Partial<State>): Partial<State> => {
	return {
		[NameSpace.Data]: {
			cakeOffers: Array.from({ length: 5 }, makeFakeCakeOffer),
			offersLoadingStatus: LoadingStatus.Idle,
			orderSendingStatus: LoadingStatus.Idle
		},
		[NameSpace.Main]: {
			totalPrice: 10000,
			activeOffer: 'id',
			sortingStatus: 'Друзьям',
			errorText: 'Error message'
		},
		[NameSpace.Cart]: {
			shoppingCart: Array.from({ length: 5 }, makeFakeOrder),
			discountLoadingStatus: LoadingStatus.Idle,
			finalSum: 0
		},
		...(initialState ?? {})
	};
};

export default makeFakeStore;
