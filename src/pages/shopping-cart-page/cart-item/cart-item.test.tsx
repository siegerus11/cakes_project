import { render, screen } from '@testing-library/react';

import { NameSpace, LoadingStatus } from '../../../constants';
import makeFakeOrder from '../../../mocks/makeFakeOrder';
import withHistory from '../../../mocks/withHistory';
import withStore from '../../../mocks/withStore';
import { CakeOrder } from '../../../types/types';
import CartList from './cart-item';

describe('Component: CartList', () => {
	const renderCartList = (cart: CakeOrder[] = []) => {
		const component = withHistory(<CartList />);
		const { withStoreComponent } = withStore(component, {
			[NameSpace.Cart]: {
				shoppingCart: cart,
				discountLoadingStatus: LoadingStatus.Idle
			}
		});
		return render(withStoreComponent);
	};

	it('should render empty list when cart is empty', () => {
		renderCartList([]);

		const items = screen.queryAllByRole('listitem');
		expect(items.length).toBe(0);
	});

	it('should render cart items', () => {
		const fakeOrder = makeFakeOrder();
		renderCartList([fakeOrder]);

		expect(screen.getByText(fakeOrder.title)).toBeInTheDocument();
	});

	it('should render multiple cart items', () => {
		const fakeOrder1 = makeFakeOrder();
		const fakeOrder2 = { ...makeFakeOrder(), cakeId: '2', title: 'Торт 2' };
		renderCartList([fakeOrder1, fakeOrder2]);

		expect(screen.getByText(fakeOrder1.title)).toBeInTheDocument();
		expect(screen.getByText(fakeOrder2.title)).toBeInTheDocument();
	});

	it('should render item images', () => {
		const fakeOrder = makeFakeOrder();
		const imageAltText = 'Торт';
		renderCartList([fakeOrder]);

		const images = screen.getAllByAltText(imageAltText);
		expect(images.length).toBe(1);
	});

	it('should render item prices', () => {
		const fakeOrder = makeFakeOrder();
		renderCartList([fakeOrder]);

		expect(screen.getByText(/3\s?600\s?₽/)).toBeInTheDocument();
	});

	it('should render quantity controls', () => {
		const incrementLabelText = 'Увеличить количество';
		const deccrementLabelText = 'Уменьшить количество';

		const fakeOrder = makeFakeOrder();
		renderCartList([fakeOrder]);

		expect(screen.getByLabelText(incrementLabelText)).toBeInTheDocument();
		expect(screen.getByLabelText(deccrementLabelText)).toBeInTheDocument();
	});

	it('should render filling info', () => {
		const fakeOrder = makeFakeOrder();
		const fillingText = /Начинка:/i;
		renderCartList([fakeOrder]);

		expect(screen.getByText(fillingText)).toBeInTheDocument();
	});

	it('should render weight info', () => {
		const fakeOrder = makeFakeOrder();
		const weghtText = /Вес:/i;
		renderCartList([fakeOrder]);

		expect(screen.getByText(weghtText)).toBeInTheDocument();
	});

	it('should render optional info', () => {
		const fakeOrder = makeFakeOrder();
		const optionalText = /Дополнительно:/i;
		renderCartList([fakeOrder]);

		expect(screen.getByText(optionalText)).toBeInTheDocument();
	});
});
