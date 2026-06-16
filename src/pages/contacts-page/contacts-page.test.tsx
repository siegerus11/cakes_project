import { render, screen } from '@testing-library/react';

import { appeals, OuterRoute, phone } from '../../constants';
import withHistory from '../../mocks/withHistory';
import ContactsPage from './contacts-page';

jest.mock('../../components/pick-up/pick-up', () => {
	const MockPickUp = ({ headlineText }: { headlineText: string }) => (
		<div data-testid="pick-up">{headlineText}</div>
	);
	return { __esModule: true, default: MockPickUp };
});

jest.mock('../../components/bread-crumbs/bread-crumbs', () => {
	const MockBreadCrumbs = () => (
		<nav data-testid="breadcrumbs" aria-label="Хлебные крошки" />
	);
	return { __esModule: true, default: MockBreadCrumbs };
});

describe('Component: ContactsPage', () => {
	const renderContactsPage = () => {
		const component = withHistory(<ContactsPage />);
		return render(component);
	};

	it('should render page title', () => {
		const expectedTitle = 'Контакты';

		renderContactsPage();

		expect(screen.getByText(expectedTitle)).toBeInTheDocument();
	});

	it('should render breadcrumbs', () => {
		renderContactsPage();

		expect(screen.getByTestId('breadcrumbs')).toBeInTheDocument();
	});

	it('should render phone segment', () => {
		const expectedPhone = phone;
		const expectedDescription = 'Вопросы по заказам и доставке:';

		renderContactsPage();

		expect(screen.getByText(expectedDescription)).toBeInTheDocument();
		expect(screen.getByText(expectedPhone)).toBeInTheDocument();
	});

	it('should render telegram link in phone segment', () => {
		const expectedLinkText = 'Написать в Telegram';

		renderContactsPage();

		const telegramLink = screen.getByText(expectedLinkText);
		expect(telegramLink).toBeInTheDocument();
		expect(telegramLink.getAttribute('href')).toBe(OuterRoute.Telegram);
	});

	it('should render hours section', () => {
		const expectedTitle = 'Часы работы';
		const expectedDescription = 'Работаем каждый день с 8:00 до 21:00';

		renderContactsPage();

		expect(screen.getByText(expectedTitle)).toBeInTheDocument();
		expect(screen.getByText(expectedDescription)).toBeInTheDocument();
	});

	it('should render communication section with appeals', () => {
		const expectedTitle = 'Связь с директором';

		renderContactsPage();

		expect(screen.getByText(expectedTitle)).toBeInTheDocument();
		appeals.forEach(appeal => {
			expect(screen.getByText(appeal)).toBeInTheDocument();
		});
	});

	it('should render telegram link in communication section', () => {
		const expectedText = /Напишите в Telegram/i;

		renderContactsPage();

		expect(screen.getByText(expectedText)).toBeInTheDocument();
		const telegramLink = screen.getByText('@mskkond');
		expect(telegramLink.getAttribute('href')).toBe(OuterRoute.Telegram);
	});

	it('should render social section', () => {
		const expectedTitle = 'Мы в соцсетях';

		renderContactsPage();

		expect(screen.getByText(expectedTitle)).toBeInTheDocument();
	});
});
