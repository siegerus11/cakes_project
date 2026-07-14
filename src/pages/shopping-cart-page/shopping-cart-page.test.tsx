import { render, screen, fireEvent } from '@testing-library/react';

import { AppRoute, NameSpace } from '../../constants';
import makeFakeOrder from '../../mocks/makeFakeOrder';
import withHistory from '../../mocks/withHistory';
import withStore from '../../mocks/withStore';
import { CakeOrder } from '../../types/types';
import ShoppingCartPage from './shopping-cart-page';

jest.mock('../../hooks/useMediaQuery', () => ({
	__esModule: true,
	default: () => false
}));

jest.mock('./cart-item/cart-item', () => {
	const MockCartList = () => <div data-testid="cart-list">Cart List</div>;
	return { __esModule: true, default: MockCartList };
});

describe('Component: ShoppingCartPage', () => {
	const renderShoppingCartPage = (cart: CakeOrder[] = [], finalSum = 0) => {
		const component = withHistory(<ShoppingCartPage />);
		const { withStoreComponent } = withStore(component, {
			[NameSpace.Cart]: {
				shoppingCart: cart,
				discountLoadingStatus: 'Idle',
				discount: 0,
				discountError: null
			}
		});
		return render(withStoreComponent);
	};

	it('should render page title', () => {
		const expectedTitle = 'Ваш заказ';

		renderShoppingCartPage();

		expect(screen.getByText(expectedTitle)).toBeInTheDocument();
	});

	it('should render back button', () => {
		const expectedAriaLabel = 'Назад';

		renderShoppingCartPage();

		expect(screen.getByText(expectedAriaLabel)).toBeInTheDocument();
	});

	it('should render trash button', () => {
		const expectedAriaLabel = 'Удалить заказ';

		renderShoppingCartPage();

		expect(screen.getByLabelText(expectedAriaLabel)).toBeInTheDocument();
	});

	it('should render total amount', () => {
		const expectedText = /Итого:/i;

		renderShoppingCartPage();

		expect(screen.getByText(expectedText)).toBeInTheDocument();
	});

	it('should render formatted total price', () => {
		const fakeOrder = makeFakeOrder();
		const expectedPrice = /3\s?600\s?₽/;

		renderShoppingCartPage([fakeOrder], 3600);

		expect(screen.getByText(expectedPrice)).toBeInTheDocument();
	});

	it('should render promo button', () => {
		const expectedText = 'Ввести промокод';

		renderShoppingCartPage();

		expect(screen.getByText(expectedText)).toBeInTheDocument();
	});

	it('should render order button with correct text when cart has items', () => {
		const fakeOrder = makeFakeOrder();

		renderShoppingCartPage([fakeOrder]);

		const buttons = screen.getAllByText('Верно, далее');
		expect(buttons.length).toBeGreaterThanOrEqual(1);
	});

	it('should render catalog button when cart is empty', () => {
		const expectedText = 'К каталогу';

		renderShoppingCartPage([]);

		expect(screen.getByText(expectedText)).toBeInTheDocument();
	});

	it('should link to order registration when cart has items', () => {
		const fakeOrder = makeFakeOrder();

		renderShoppingCartPage([fakeOrder]);

		const links = screen.getAllByRole('link');
		const orderLink = links.find(
			link => link.getAttribute('href') === AppRoute.OrderRegistration
		);
		expect(orderLink).toBeInTheDocument();
	});

	it('should link to catalog when cart is empty', () => {
		renderShoppingCartPage([]);

		const links = screen.getAllByRole('link');
		const catalogLink = links.find(
			link => link.getAttribute('href') === AppRoute.Catalog
		);
		expect(catalogLink).toBeInTheDocument();
	});

	it('should open popup when promo button is clicked', () => {
		const promoButtonText = 'Ввести промокод';

		renderShoppingCartPage();

		const promoButton = screen.getByText(promoButtonText);
		fireEvent.click(promoButton);

		expect(screen.getByText('Промокод')).toBeInTheDocument();
	});

	it('should render promo input in popup', () => {
		const promoButtonText = 'Ввести промокод';
		const inputPlaceholderText = 'Введите промокод';

		renderShoppingCartPage();

		const promoButton = screen.getByText(promoButtonText);
		fireEvent.click(promoButton);

		expect(
			screen.getByPlaceholderText(inputPlaceholderText)
		).toBeInTheDocument();
	});

	it('should render apply button in popup', () => {
		const promoButtonText = 'Ввести промокод';
		const applyButtonText = 'Применить';

		renderShoppingCartPage();

		const promoButton = screen.getByText(promoButtonText);
		fireEvent.click(promoButton);

		expect(screen.getByText(applyButtonText)).toBeInTheDocument();
	});

	it('should not render popup initially', () => {
		const popupTitleText = 'Промокод';

		renderShoppingCartPage();

		expect(screen.queryByText(popupTitleText)).not.toBeInTheDocument();
	});

	it('should update input value on change', () => {
		const promoButtonText = 'Ввести промокод';
		const inputPlaceholderText = 'Введите промокод';

		renderShoppingCartPage();

		const promoButton = screen.getByText(promoButtonText);
		fireEvent.click(promoButton);

		const input = screen.getByPlaceholderText(inputPlaceholderText);
		fireEvent.change(input, { target: { value: 'TEST' } });

		expect(input.getAttribute('value')).toBe('TEST');
	});

	it('should show clear button when input has value', () => {
		const promoButtonText = 'Ввести промокод';
		const inputPlaceholderText = 'Введите промокод';

		renderShoppingCartPage();

		const promoButton = screen.getByText(promoButtonText);
		fireEvent.click(promoButton);

		const input = screen.getByPlaceholderText(inputPlaceholderText);
		fireEvent.change(input, { target: { value: 'TEST' } });

		expect(screen.getByLabelText('Очистить')).toBeInTheDocument();
	});

	it('should clear input when clear button is clicked', () => {
		const promoButtonText = 'Ввести промокод';
		const clearButtonLabelText = 'Очистить';
		const inputPlaceholderText = 'Введите промокод';

		renderShoppingCartPage();

		const promoButton = screen.getByText(promoButtonText);
		fireEvent.click(promoButton);

		const input = screen.getByPlaceholderText(inputPlaceholderText);
		fireEvent.change(input, { target: { value: 'TEST' } });

		const clearButton = screen.getByLabelText(clearButtonLabelText);
		fireEvent.click(clearButton);

		expect(input.getAttribute('value')).toBe('');
	});
});
