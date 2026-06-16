import { render, screen } from '@testing-library/react';
import { ReactNode } from 'react';

import { NameSpace, LoadingStatus } from '../../constants';
import makeFakeCakeOffer from '../../mocks/makeFakeOffer';
import withHistory from '../../mocks/withHistory';
import withStore from '../../mocks/withStore';
import CakeArticlePage from './cake-article-page';

jest.mock('../../hooks/useMediaQuery', () => ({
	__esModule: true,
	default: () => false
}));

jest.mock('../../components/shopping-cart-item/shopping-cart-item', () => {
	const MockShoppingCartItem = ({ className }: { className: string }) => (
		<div data-testid="shopping-cart-item" className={className} />
	);
	return { __esModule: true, default: MockShoppingCartItem };
});

jest.mock('../../components/overlay/overlay', () => {
	const MockOverlay = ({ children }: { children: ReactNode }) => (
		<div data-testid="overlay">{children}</div>
	);
	return { __esModule: true, default: MockOverlay };
});

jest.mock('../../components/popup/popup', () => {
	const MockPopup = ({ children }: { children: ReactNode }) => (
		<div data-testid="popup">{children}</div>
	);
	return { __esModule: true, default: MockPopup };
});

jest.mock('../../components/title/title', () => {
	const MockTitle = ({ titleText }: { titleText: string }) => (
		<div data-testid="title">{titleText}</div>
	);
	return { __esModule: true, default: MockTitle };
});

jest.mock('../../components/ui/button/button', () => {
	const MockButton = ({ children }: { children: ReactNode }) => (
		<div data-testid="button">{children}</div>
	);
	return { __esModule: true, default: MockButton };
});

jest.mock('./slider/slider', () => {
	const MockSlider = () => <div data-testid="slider" />;
	return { __esModule: true, default: MockSlider };
});

jest.mock('./order-form/order-form', () => {
	const MockOrderForm = () => <div data-testid="order-form" />;
	return { __esModule: true, default: MockOrderForm };
});

describe('Component: CakeArticlePage', () => {
	const fakeCake = makeFakeCakeOffer();

	const renderCakeArticlePage = () => {
		const component = withHistory(<CakeArticlePage />);
		const { withStoreComponent } = withStore(component, {
			[NameSpace.Data]: {
				cakeOffers: [fakeCake],
				offersLoadingStatus: LoadingStatus.Success,
				orderSendingStatus: LoadingStatus.Idle
			},
			[NameSpace.Main]: {
				totalPrice: 0,
				activeOffer: fakeCake.id,
				sortingStatus: '',
				errorText: ''
			}
		});
		return render(withStoreComponent);
	};

	it('should render page title', () => {
		const titleTestId = 'title';

		renderCakeArticlePage();

		expect(screen.getByTestId(titleTestId)).toBeInTheDocument();
	});

	it('should render slider', () => {
		const sliderTestId = 'slider';

		renderCakeArticlePage();

		expect(screen.getByTestId(sliderTestId)).toBeInTheDocument();
	});

	it('should render order form', () => {
		const formTestId = 'order-form';

		renderCakeArticlePage();

		expect(screen.getByTestId(formTestId)).toBeInTheDocument();
	});

	it('should render shopping cart item', () => {
		const cartItemTestId = 'shopping-cart-item';

		renderCakeArticlePage();

		expect(screen.getByTestId(cartItemTestId)).toBeInTheDocument();
	});

	it('should render back link', () => {
		const expectedText = 'Назад';

		renderCakeArticlePage();

		expect(screen.getByText(expectedText)).toBeInTheDocument();
	});

	it('should render nothing when no active offer', () => {
		const component = withHistory(<CakeArticlePage />);
		const { withStoreComponent } = withStore(component, {
			[NameSpace.Data]: {
				cakeOffers: [],
				offersLoadingStatus: LoadingStatus.Loading,
				orderSendingStatus: LoadingStatus.Idle
			}
		});
		const { container } = render(withStoreComponent);

		expect(container.innerHTML).toBe('');
	});
});
