import { NameSpace, LoadingStatus } from '../../constants';
import makeFakeOrder from '../../mocks/makeFakeOrder';
import {
	selectShoppingCart,
	selectFinalSum,
	selectdiscountLoadingStatus,
	CartProcessState
} from './cart-process';

describe('Cart-process selectors', () => {
	const state: { [NameSpace.Cart]: CartProcessState } = {
		[NameSpace.Cart]: {
			shoppingCart: [makeFakeOrder()],
			discountLoadingStatus: LoadingStatus.Idle,
			finalSum: 1000
		}
	};

	it('Should return shopping cart from state', () => {
		const result = selectShoppingCart(state);

		expect(result).toEqual(state[NameSpace.Cart].shoppingCart);
	});
	it('Should return discountLoadingStatus cart from state', () => {
		const result = selectdiscountLoadingStatus(state);

		expect(result).toBe(state[NameSpace.Cart].discountLoadingStatus);
	});
	it('Should return finalSum cart from state', () => {
		const result = selectFinalSum(state);

		expect(result).toBe(state[NameSpace.Cart].finalSum);
	});
});
