import { screen, render } from '@testing-library/react';

import { AppRoute } from '../../constants';
import withHistory from '../../mocks/withHistory';
import BreadCrumbs from './bread-crumbs';

describe('Component: BreadCrumbs', () => {
	const renderBreadCrumbs = (route: string) => {
		const componentWithHistory = withHistory(<BreadCrumbs />, route);
		return render(componentWithHistory);
	};

	it('should render bread crumbs for /about route', () => {
		const expectedMainLink = 'Главная';
		const expectedAboutLink = 'О нас';

		renderBreadCrumbs(AppRoute.About);

		expect(screen.getByText(expectedMainLink)).toBeInTheDocument();
		expect(screen.getByText(expectedAboutLink)).toBeInTheDocument();
		expect(screen.getByLabelText('Хлебные крошки')).toBeInTheDocument();
	});

	it('should render bread crumbs for /delivery route', () => {
		const expectedMainLink = 'Главная';
		const expectedDeliveryLink = 'Доставка и оплата';

		renderBreadCrumbs(AppRoute.Delivery);

		expect(screen.getByText(expectedMainLink)).toBeInTheDocument();
		expect(screen.getByText(expectedDeliveryLink)).toBeInTheDocument();
	});

	it('should render bread crumbs for /contacts route', () => {
		const expectedMainLink = 'Главная';
		const expectedContactsLink = 'Контакты';

		renderBreadCrumbs(AppRoute.Contacts);

		expect(screen.getByText(expectedMainLink)).toBeInTheDocument();
		expect(screen.getByText(expectedContactsLink)).toBeInTheDocument();
	});

	it('should render bread crumbs for /catalog/cakes route', () => {
		const expectedMainLink = 'Главная';
		const expectedCakesLink = 'Торты';

		renderBreadCrumbs(AppRoute.CakesCatalog);

		expect(screen.getByText(expectedMainLink)).toBeInTheDocument();
		expect(screen.getByText(expectedCakesLink)).toBeInTheDocument();
	});

	it('should render bread crumbs for /catalog/bento-cakes route', () => {
		const expectedMainLink = 'Главная';
		const expectedBentoLink = 'Бенто-торты';

		renderBreadCrumbs(AppRoute.BentoCakesCatalog);

		expect(screen.getByText(expectedMainLink)).toBeInTheDocument();
		expect(screen.getByText(expectedBentoLink)).toBeInTheDocument();
	});

	it('should not render bread crumbs for / route', () => {
		const expectedMainLink = 'Главная';
		const expectedBreadCrumbsLabel = 'Хлебные крошки';

		renderBreadCrumbs(AppRoute.Root);

		expect(screen.queryByText(expectedMainLink)).not.toBeInTheDocument();
		expect(
			screen.queryByLabelText(expectedBreadCrumbsLabel)
		).not.toBeInTheDocument();
	});

	it('should set aria-current on last link', () => {
		const expectedAboutLink = 'О нас';

		renderBreadCrumbs(AppRoute.About);

		expect(screen.getByText(expectedAboutLink)).toHaveAttribute(
			'aria-current',
			'page'
		);
	});
});
