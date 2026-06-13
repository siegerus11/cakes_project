import { screen, render } from '@testing-library/react';

import { AppRoute } from '../../constants';
import withHistory from '../../mocks/withHistory';
import withStore from '../../mocks/withStore';
import App from './app';

jest.mock('uuid', () => ({
	v4: () => 'test-uuid'
}));

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

jest.mock('../../pages/about-page/about-page', () => {
	const AboutPage = () => <span>AboutPage component</span>;
	return { __esModule: true, default: AboutPage };
});

jest.mock('../../pages/cake-article-page/cake-article-page', () => {
	const CakeArticlePage = () => <span>CakeArticlePage component</span>;
	return { __esModule: true, default: CakeArticlePage };
});

jest.mock('../../pages/catalog-page/catalog-page', () => {
	const CatalogPage = () => <span>CatalogPage component</span>;
	return { __esModule: true, default: CatalogPage };
});

jest.mock('../../pages/contacts-page/contacts-page', () => {
	const ContactsPage = () => <span>ContactsPage component</span>;
	return { __esModule: true, default: ContactsPage };
});

jest.mock('../../pages/delivery-page/delivery-page', () => {
	const DeliveryPage = () => <span>DeliveryPage component</span>;
	return { __esModule: true, default: DeliveryPage };
});

jest.mock('../../pages/main-page/main-page', () => {
	const MainPage = () => <span>MainPage component</span>;
	return { __esModule: true, default: MainPage };
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

describe('Application routing', () => {
	it('Should render AboutPage when user navigate to "/about"', () => {
		const componentWithHistory = withHistory(<App />, AppRoute.About);
		const { withStoreComponent } = withStore(componentWithHistory);

		render(withStoreComponent);

		expect(screen.getByText('AboutPage component')).toBeInTheDocument();
	});

	it('Should render MainPage when user navigate to "/"', () => {
		const componentWithHistory = withHistory(<App />, AppRoute.Root);
		const { withStoreComponent } = withStore(componentWithHistory);

		render(withStoreComponent);

		expect(screen.getByText('MainPage component')).toBeInTheDocument();
	});
});
