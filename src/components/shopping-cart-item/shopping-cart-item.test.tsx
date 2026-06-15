import { screen, render } from '@testing-library/react';

import { NameSpace } from '../../constants';
import makeFakeOrder from '../../mocks/makeFakeOrder';
import withHistory from '../../mocks/withHistory';
import withStore from '../../mocks/withStore';
import ShoppingCartItem from './shopping-cart-item';

describe('Component: ShoppingCartItem', () => {
	const fakeOrder = makeFakeOrder();

	const renderShoppingCartItem = (
		initialState: Partial<Record<string, unknown>>
	) => {
		const componentWithHistory = withHistory(<ShoppingCartItem />);
		const { withStoreComponent } = withStore(componentWithHistory, {
			[NameSpace.Cart]: initialState
		});

		return render(withStoreComponent);
	};

	it('should render cart link when cart is not empty', () => {
		const initialState = {
			shoppingCart: [fakeOrder],
			discountLoadingStatus: 'idle'
		};
		const cartLabel = 'Корзина';

		renderShoppingCartItem(initialState);

		expect(screen.getByLabelText(cartLabel)).toBeInTheDocument();
	});

	it('should render orders count', () => {
		const initialState = {
			shoppingCart: [fakeOrder, fakeOrder, fakeOrder],
			discountLoadingStatus: 'idle'
		};
		const expectedCount = '3';

		renderShoppingCartItem(initialState);

		expect(screen.getByText(expectedCount)).toBeInTheDocument();
	});
});
