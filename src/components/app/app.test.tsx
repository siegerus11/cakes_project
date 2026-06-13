import { screen, render } from '@testing-library/react';

import { AppRoute } from '../../constants';
import withHistory from '../../mocks/withHistory';
import withStore from '../../mocks/withStore';
import App from './app';

let uuidCounter = 0;
jest.mock('uuid', () => ({
	v4: () => {
		uuidCounter += 1;
		return `test-uuid-${uuidCounter}`;
	}
}));

jest.mock('../../pages/about-page/about-page', () => {
	const mockAboutPage = () => <span>AboutPage component</span>;
	return { __esModule: true, default: mockAboutPage };
});

jest.mock('../../pages/cake-article-page/cake-article-page', () => {
	const mockCakeArticlePage = () => <span>CakeArticlePage component</span>;
	return { __esModule: true, default: mockCakeArticlePage };
});

jest.mock('../../pages/catalog-page/catalog-page', () => {
	const mockCatalogPage = () => <span>CatalogPage component</span>;
	return { __esModule: true, default: mockCatalogPage };
});

jest.mock('../../pages/contacts-page/contacts-page', () => {
	const mockContactsPage = () => <span>ContactsPage component</span>;
	return { __esModule: true, default: mockContactsPage };
});

jest.mock('../../pages/delivery-page/delivery-page', () => {
	const mockDeliveryPage = () => <span>DeliveryPage component</span>;
	return { __esModule: true, default: mockDeliveryPage };
});

jest.mock('../../pages/main-page/main-page', () => {
	const mockMainPage = () => <span>MainPage component</span>;
	return { __esModule: true, default: mockMainPage };
});

jest.mock('../../pages/order-registration-page/order-registration-page', () => {
	const OrderRegistrationPage = () => (
		<span>OrderRegistrationPage component</span>
	);
	return { __esModule: true, default: OrderRegistrationPage };
});

jest.mock('../../pages/shopping-cart-page/shopping-cart-page', () => {
	const ShoppingCartPage = () => <span>ShoppingCartPage component</span>;
	return { __esModule: true, default: ShoppingCartPage };
});

jest.mock('../../pages/thanks-page/thanks-page', () => {
	const ThanksPage = () => <span>ThanksPage component</span>;
	return { __esModule: true, default: ThanksPage };
});

// Mocks for fix warning "prop `className` on <a> tag" due to apply @use in css modules
jest.mock('../../components/header/header', () => {
	const Header = () => <span>Header</span>;
	return { __esModule: true, default: Header };
});

jest.mock('../../components/footer/footer', () => {
	const Footer = () => <span>Footer</span>;
	return { __esModule: true, default: Footer };
});

jest.mock('../../components/logo/logo', () => {
	const Logo = () => <span>Logo</span>;
	return { __esModule: true, default: Logo };
});

describe('Application routing', () => {
	beforeEach(() => {
		uuidCounter = 0;
	});

	const renderWithRoute = (route: string) => {
		const componentWithHistory = withHistory(<App />, route);
		const { withStoreComponent } = withStore(componentWithHistory);

		return render(withStoreComponent);
	};

	it('Should render MainPage when user navigate to "/"', () => {
		renderWithRoute(AppRoute.Root);

		expect(screen.getByText('MainPage component')).toBeInTheDocument();
	});

	it('Should render AboutPage when user navigate to "/about"', () => {
		renderWithRoute(AppRoute.About);

		expect(screen.getByText('AboutPage component')).toBeInTheDocument();
	});

	it('Should render CatalogPage when user navigate to "/catalog/cakes"', () => {
		renderWithRoute(AppRoute.CakesCatalog);

		expect(screen.getByText('CatalogPage component')).toBeInTheDocument();
	});

	it('Should render CatalogPage when user navigate to "/catalog/bento-cakes"', () => {
		renderWithRoute(AppRoute.BentoCakesCatalog);

		expect(screen.getByText('CatalogPage component')).toBeInTheDocument();
	});

	it('Should render DeliveryPage when user navigate to "/delivery"', () => {
		renderWithRoute(AppRoute.Delivery);

		expect(screen.getByText('DeliveryPage component')).toBeInTheDocument();
	});

	it('Should render ContactsPage when user navigate to "/contacts"', () => {
		renderWithRoute(AppRoute.Contacts);

		expect(screen.getByText('ContactsPage component')).toBeInTheDocument();
	});

	it('Should render CakeArticlePage when user navigate to "/cake-offer/:id"', () => {
		renderWithRoute('/cake-offer/1');

		expect(
			screen.getByText('CakeArticlePage component')
		).toBeInTheDocument();
	});

	it('Should render ShoppingCartPage when user navigate to "/shopping-cart"', () => {
		renderWithRoute(AppRoute.ShoppingCart);

		expect(
			screen.getByText('ShoppingCartPage component')
		).toBeInTheDocument();
	});

	it('Should render OrderRegistrationPage when user navigate to "/order-registration"', () => {
		renderWithRoute(AppRoute.OrderRegistration);

		expect(
			screen.getByText('OrderRegistrationPage component')
		).toBeInTheDocument();
	});

	it('Should render ThanksPage when user navigate to "/thanks-page"', () => {
		renderWithRoute(AppRoute.Thanks);

		expect(screen.getByText('ThanksPage component')).toBeInTheDocument();
	});
});
