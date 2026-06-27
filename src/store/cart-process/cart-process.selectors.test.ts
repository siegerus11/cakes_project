import { NameSpace, LoadingStatus } from '../../constants';
import makeFakeOrder from '../../mocks/makeFakeOrder';
import { State } from '../../types/store';
import { cartProcessSelectors } from './cart-process';

describe('Cart-process selectors', () => {
	const state: State = {
		[NameSpace.Data]: {
			cakeOffers: [],
			offersLoadingStatus: LoadingStatus.Idle,
			orderSendingStatus: LoadingStatus.Idle
		},
		[NameSpace.Main]: {
			totalPrice: 0,
			activeOffer: '',
			sortingStatus: '',
			searchQuery: '',
			errorText: ''
		},
		[NameSpace.Cart]: {
			shoppingCart: [makeFakeOrder()],
			discountLoadingStatus: LoadingStatus.Idle
		}
	};

	it('Should return shopping cart from state', () => {
		const result = cartProcessSelectors.selectShoppingCart(state);

		expect(result).toEqual(state[NameSpace.Cart].shoppingCart);
	});
	it('Should return discountLoadingStatus cart from state', () => {
		const result = cartProcessSelectors.selectdiscountLoadingStatus(state);

		expect(result).toBe(state[NameSpace.Cart].discountLoadingStatus);
	});
	it('Should return finalSum cart from state', () => {
		const result = cartProcessSelectors.selectFinalSum(state);

		expect(result).toBe(
			state[NameSpace.Cart].shoppingCart.reduce(
				(sum, order) => sum + order.price * order.quantity,
				0
			)
		);
	});
});
