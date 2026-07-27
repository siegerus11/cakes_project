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
			discount: 0,
			discountError: null
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
	it('Should return finalSum cart from state without discount', () => {
		const result = selectFinalSum(state);

		expect(result).toBe(
			state[NameSpace.Cart].shoppingCart.reduce(
				(sum, order) => sum + order.price * order.quantity,
				0
			)
		);
	});
	it('Should return finalSum cart from state with discount', () => {
		const stateWithDiscount: { [NameSpace.Cart]: CartProcessState } = {
			[NameSpace.Cart]: {
				shoppingCart: [makeFakeOrder()],
				discountLoadingStatus: LoadingStatus.Success,
				discount: 15,
				discountError: null
			}
		};
		const result = selectFinalSum(stateWithDiscount);
		const originalSum = 3600;
		const expectedSum = Math.round(originalSum * (1 - 15 / 100));

		expect(result).toBe(expectedSum);
	});
});
