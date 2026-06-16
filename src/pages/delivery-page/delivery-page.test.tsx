import { render, screen } from '@testing-library/react';

import { deliveryTimes, OuterRoute } from '../../constants';
import withHistory from '../../mocks/withHistory';
import DeliveryPage from './delivery-page';

jest.mock('../../components/pick-up/pick-up', () => {
	const MockPickUp = ({
		headlineText,
		isDeliverPage
	}: {
		headlineText: string;
		isDeliverPage?: boolean;
	}) => (
		<div data-testid="pick-up" data-deliver={String(isDeliverPage)}>
			{headlineText}
		</div>
	);
	return { __esModule: true, default: MockPickUp };
});

jest.mock('../../components/bread-crumbs/bread-crumbs', () => {
	const MockBreadCrumbs = () => (
		<nav data-testid="breadcrumbs" aria-label="Хлебные крошки" />
	);
	return { __esModule: true, default: MockBreadCrumbs };
});

describe('Component: DeliveryPage', () => {
	const renderDeliveryPage = () => {
		const component = withHistory(<DeliveryPage />);
		return render(component);
	};

	it('should render page title', () => {
		const expectedTitle = 'Доставка и оплата';

		renderDeliveryPage();

		expect(screen.getByText(expectedTitle)).toBeInTheDocument();
	});

	it('should render breadcrumbs', () => {
		const testId = 'breadcrumbs';

		renderDeliveryPage();

		expect(screen.getByTestId(testId)).toBeInTheDocument();
	});

	it('should render courier delivery section', () => {
		const expectedTitle = 'Курьерская доставка';
		const expectedInterval = 'Интервалы доставки:';
		const expectedDescription =
			/Стоимость доставки зависит от удаленности/i;

		renderDeliveryPage();

		expect(screen.getByText(expectedTitle)).toBeInTheDocument();
		expect(screen.getByText(expectedInterval)).toBeInTheDocument();
		expect(screen.getByText(expectedDescription)).toBeInTheDocument();
	});

	it('should render all delivery times', () => {
		renderDeliveryPage();

		deliveryTimes.forEach(time => {
			expect(screen.getByText(time)).toBeInTheDocument();
		});
	});

	it('should render pick-up section with isDeliverPage', () => {
		const testId = 'pick-up';
		const expectedHeadline = 'Самовывоз';

		renderDeliveryPage();

		const pickUp = screen.getByTestId(testId);
		expect(pickUp).toBeInTheDocument();
		expect(pickUp.getAttribute('data-deliver')).toBe('true');
		expect(screen.getByText(expectedHeadline)).toBeInTheDocument();
	});

	it('should render payment section', () => {
		const expectedTitle = 'Оплата';
		const expectedDescription =
			/Готовить заказ мы начинаем после 100% предоплаты/i;

		renderDeliveryPage();

		expect(screen.getByText(expectedTitle)).toBeInTheDocument();
		expect(screen.getByText(expectedDescription)).toBeInTheDocument();
	});

	it('should render telegram link', () => {
		const expectedLinkText = 'Напишите в Telegram';

		renderDeliveryPage();

		const link = screen.getByText(expectedLinkText);
		expect(link).toBeInTheDocument();
		expect(link.getAttribute('href')).toBe(OuterRoute.Telegram);
	});
});
