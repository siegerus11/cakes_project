import { render, screen } from '@testing-library/react';

import { OuterRoute } from '../../constants';
import withHistory from '../../mocks/withHistory';
import Footer from './footer';

describe('Component: Footer', () => {
	const renderFooter = () => {
		const componentWithHistory = withHistory(<Footer />);
		return render(componentWithHistory);
	};

	it('should render copyright text', () => {
		const expectedCopyrightText = /© 2026 ООО «ВауКейк»/i;

		renderFooter();

		expect(screen.getByText(expectedCopyrightText)).toBeInTheDocument();
	});

	it('should render agreement links', () => {
		const expectedPolicyText = 'Политика обработки ПД';
		const expectedAgreementText = 'Пользовательское соглашение';

		renderFooter();

		expect(screen.getByText(expectedPolicyText)).toBeInTheDocument();
		expect(screen.getByText(expectedAgreementText)).toBeInTheDocument();
	});

	it('should render navigation menu', () => {
		renderFooter();

		expect(screen.getByRole('navigation')).toBeInTheDocument();
	});

	it('should render social links', () => {
		const expectedTelegramLabel = 'Telegram';
		const expectedVkLabel = 'ВКонтакте';
		const expectedInstagramLabel = 'Instagram';

		renderFooter();

		expect(
			screen.getByLabelText(expectedTelegramLabel)
		).toBeInTheDocument();
		expect(screen.getByLabelText(expectedVkLabel)).toBeInTheDocument();
		expect(
			screen.getByLabelText(expectedInstagramLabel)
		).toBeInTheDocument();
	});

	it('should render Telegram button', () => {
		const expectedButtonText = 'Написать в Telegram';

		renderFooter();

		expect(screen.getByText(expectedButtonText)).toBeInTheDocument();
	});

	it('should have correct href for social links', () => {
		const expectedTelegramHref = OuterRoute.Telegram;
		const expectedVkHref = OuterRoute.Vk;
		const expectedInstagramHref = OuterRoute.Instagram;

		renderFooter();

		const telegramLink = screen.getByLabelText('Telegram');
		const vkLink = screen.getByLabelText('ВКонтакте');
		const instagramLink = screen.getByLabelText('Instagram');

		expect(telegramLink.getAttribute('href')).toBe(expectedTelegramHref);
		expect(vkLink.getAttribute('href')).toBe(expectedVkHref);
		expect(instagramLink.getAttribute('href')).toBe(expectedInstagramHref);
	});

	it('should render footer element', () => {
		const { container } = renderFooter();

		const footerElement = container.querySelector('footer');
		expect(footerElement).toBeInTheDocument();
	});
});
