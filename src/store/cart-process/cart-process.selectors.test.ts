import { NameSpace, LoadingStatus } from '../../constants';
import makeFakeOrder from '../../mocks/makeFakeOrder';
import { selectShoppingCart, selectFinalSum } from './cart-process';

describe('Cart-process selectors', () => {
	const state = {
		[NameSpace.Cart]: {
			shoppingCart: [makeFakeOrder()],
			discountLoadingStatus: LoadingStatus.Idle,
			finalSum: 1000
		}
	};

	it('Should return shopping cart from state', () => {
		const result = selectShoppingCart(state);

		expect(result).toEqual([makeFakeOrder()]);
	});
});
