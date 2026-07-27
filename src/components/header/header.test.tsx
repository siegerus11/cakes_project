import { render, screen, fireEvent } from '@testing-library/react';

import { AppRoute, NameSpace } from '../../constants';
import makeFakeOrder from '../../mocks/makeFakeOrder';
import withHistory from '../../mocks/withHistory';
import withStore from '../../mocks/withStore';
import Header from './header';

jest.mock('../hamburger-popup/hamburger-popup', () => {
	const MockHamburgerPopup = () => (
		<div data-testid="hamburger-popup">Popup</div>
	);
	return { __esModule: true, default: MockHamburgerPopup };
});

describe('Component: Header', () => {
	const renderHeader = (initialState?: Partial<Record<string, unknown>>) => {
		const componentWithHistory = withHistory(<Header />);
		const { withStoreComponent } = withStore(componentWithHistory, {
			[NameSpace.Cart]: {
				shoppingCart: [],
				discountLoadingStatus: 'idle',
				discount: 0,
				discountError: null
			},
			...initialState
		});
		return render(withStoreComponent);
	};

	it('should render logo', () => {
		const expectedLogoText = 'ВРЕМЯ ВЕСЕЛЬЯ';

		renderHeader();

		expect(screen.getByText(expectedLogoText)).toBeInTheDocument();
	});

	it('should render search input', () => {
		const expectedSearchPlaceholder = 'Поиск';
		const expectedSearchLabel = 'Поиск по товарам';

		renderHeader();

		expect(
			screen.getByPlaceholderText(expectedSearchPlaceholder)
		).toBeInTheDocument();
		expect(screen.getByLabelText(expectedSearchLabel)).toBeInTheDocument();
	});

	it('should render order button', () => {
		const expectedButtonText = 'Оформить заказ';

		renderHeader();

		expect(screen.getByText(expectedButtonText)).toBeInTheDocument();
	});

	it('should link order button to shopping cart page', () => {
		const expectedPath = AppRoute.ShoppingCart;

		renderHeader();

		const links = screen.getAllByRole('link');
		const orderLink = links.find(
			link => link.getAttribute('href') === expectedPath
		);
		expect(orderLink).toBeInTheDocument();
	});

	it('should render hamburger button', () => {
		const expectedAriaLabel = 'Открыть меню';

		renderHeader();

		expect(screen.getByLabelText(expectedAriaLabel)).toBeInTheDocument();
	});

	it('should not display price when cart is empty', () => {
		renderHeader();

		const priceElements = screen.queryAllByText(/\d+ ₽/);
		expect(priceElements.length).toBe(0);
	});

	it('should display formatted price when cart has items', () => {
		const fakeOrder = makeFakeOrder();
		const initialState = {
			[NameSpace.Cart]: {
				shoppingCart: [fakeOrder],
				discountLoadingStatus: 'idle',
				discount: 0,
				discountError: null
			}
		};

		renderHeader(initialState);

		const priceElement = screen.getByText(/3\s?600\s?₽/);
		expect(priceElement).toBeInTheDocument();
	});

	it('should render navigation menu', () => {
		renderHeader();

		expect(screen.getByRole('navigation')).toBeInTheDocument();
	});

	it('should open hamburger popup when hamburger is clicked', () => {
		const expectedHamburgerLabel = 'Открыть меню';

		renderHeader();

		expect(screen.queryByTestId('hamburger-popup')).not.toBeInTheDocument();

		const hamburgerButton = screen.getByLabelText(expectedHamburgerLabel);
		fireEvent.click(hamburgerButton);

		expect(screen.getByTestId('hamburger-popup')).toBeInTheDocument();
	});
});
