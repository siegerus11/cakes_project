import { render, screen } from '@testing-library/react';

import { AppRoute, LoadingStatus, NameSpace } from '../../constants';
import makeFakeCakeOffer from '../../mocks/makeFakeOffer';
import makeFakeOrder from '../../mocks/makeFakeOrder';
import withHistory from '../../mocks/withHistory';
import withStore from '../../mocks/withStore';
import { CakeOffer } from '../../types/types';
import MainPage from './main-page';

const fakeCake = makeFakeCakeOffer();

describe('Component: MainPage', () => {
	const mockCakes: CakeOffer[] = [
		{ ...fakeCake, id: '1', title: 'Торт 1' },
		{ ...fakeCake, id: '2', title: 'Торт 2' },
		{ ...fakeCake, id: '3', title: 'Торт 3' },
		{ ...fakeCake, id: '4', title: 'Торт 4' }
	];

	const mockBentoCakes: CakeOffer[] = [
		{ ...fakeCake, id: '5', title: 'Бенто 1' },
		{ ...fakeCake, id: '6', title: 'Бенто 2' },
		{ ...fakeCake, id: '7', title: 'Бенто 3' },
		{ ...fakeCake, id: '8', title: 'Бенто 4' }
	];

	const renderMainPage = (
		cakes: CakeOffer[] = mockCakes,
		bentoCakes: CakeOffer[] = mockBentoCakes,
		initialState: Record<string, unknown> = {}
	) => {
		const component = withHistory(
			<MainPage cakes={cakes} bentoCakes={bentoCakes} />
		);
		const { withStoreComponent } = withStore(component, {
			[NameSpace.Data]: {
				cakeOffers: [],
				offersLoadingStatus: LoadingStatus.Success,
				orderSendingStatus: LoadingStatus.Idle
			},
			[NameSpace.Cart]: {
				shoppingCart: [],
				discountLoadingStatus: LoadingStatus.Idle
			},
			[NameSpace.Main]: {
				totalPrice: 0,
				activeOffer: '',
				sortingStatus: '',
				errorText: ''
			},
			...initialState
		});
		return render(withStoreComponent);
	};

	it('should render cakes section title', () => {
		const expectedTitle = 'Торты';

		renderMainPage();

		expect(screen.getByText(expectedTitle)).toBeInTheDocument();
	});

	it('should render bento cakes section title', () => {
		const expectedTitle = 'Бенто-торты';

		renderMainPage();

		expect(screen.getByText(expectedTitle)).toBeInTheDocument();
	});

	it('should render only 6 cakes', () => {
		const cardTestId = 'card';

		renderMainPage();

		const cards = screen.getAllByTestId(cardTestId);
		expect(cards.length).toBe(6);
	});

	it('should render open all links', () => {
		const linkText = 'Открыть все';

		renderMainPage();

		const openAllLinks = screen.getAllByText(linkText);
		expect(openAllLinks.length).toBeGreaterThanOrEqual(2);
	});

	it('should render order button', () => {
		const expectedButtonText = 'Оформить заказ';

		renderMainPage();

		expect(screen.getByText(expectedButtonText)).toBeInTheDocument();
	});

	it('should link order button to shopping cart', () => {
		const expectedPath = AppRoute.ShoppingCart;

		renderMainPage();

		const links = screen.getAllByRole('link');
		const orderLink = links.find(
			link => link.getAttribute('href') === expectedPath
		);
		expect(orderLink).toBeInTheDocument();
	});

	it('should not display price in order button when cart is empty', () => {
		const orderButtonText = 'Оформить заказ';

		renderMainPage();

		const orderButton = screen.getByText(orderButtonText).closest('a');
		const priceInButton = orderButton?.querySelector(
			'[class*="button__price"]'
		);
		expect(priceInButton).not.toBeInTheDocument();
	});

	it('should display formatted price in order button when cart has items', () => {
		const fakeOrder = makeFakeOrder();
		const initialState = {
			[NameSpace.Cart]: {
				shoppingCart: [fakeOrder],
				discountLoadingStatus: LoadingStatus.Idle
			}
		};

		renderMainPage(mockCakes, mockBentoCakes, initialState);

		const orderButton = screen.getByText('Оформить заказ').closest('a');
		expect(orderButton?.textContent).toMatch(/3\s?600\s?₽/);
	});

	it('should render loading state', () => {
		const initialState = {
			[NameSpace.Data]: {
				cakeOffers: [],
				offersLoadingStatus: LoadingStatus.Loading,
				orderSendingStatus: LoadingStatus.Idle
			}
		};

		renderMainPage(mockCakes, mockBentoCakes, initialState);

		expect(screen.getByText('Loading...')).toBeInTheDocument();
	});

	it('should render error state', () => {
		const expectedError = 'Failed to load offers';
		const initialState = {
			[NameSpace.Data]: {
				cakeOffers: [],
				offersLoadingStatus: LoadingStatus.Failed,
				orderSendingStatus: LoadingStatus.Idle
			},
			[NameSpace.Main]: {
				totalPrice: 0,
				activeOffer: '',
				sortingStatus: '',
				errorText: expectedError
			}
		};

		renderMainPage(mockCakes, mockBentoCakes, initialState);

		expect(screen.getByText(expectedError)).toBeInTheDocument();
	});

	it('should render clauses section', () => {
		const expectedText = /Десерты на день рождения/i;

		renderMainPage();

		expect(screen.getByText(expectedText)).toBeInTheDocument();
	});
});
