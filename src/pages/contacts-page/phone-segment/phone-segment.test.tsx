import { render, screen } from '@testing-library/react';

import { OuterRoute } from '../../../constants';
import PhoneSegment from './phone-segment';

describe('Component: PhoneSegment', () => {
	it('should render description', () => {
		const expectedDescription = 'Вопросы по заказам и доставке:';

		render(<PhoneSegment />);

		expect(screen.getByText(expectedDescription)).toBeInTheDocument();
	});

	it('should render phone link', () => {
		render(<PhoneSegment />);

		const phoneLink = screen.getByRole('link', { name: /\+7/ });
		expect(phoneLink).toBeInTheDocument();
		expect(phoneLink.getAttribute('href')).toMatch(/^tel:/);
	});

	it('should render telegram link', () => {
		const expectedText = 'Написать в Telegram';

		render(<PhoneSegment />);

		const telegramLink = screen.getByText(expectedText);
		expect(telegramLink).toBeInTheDocument();
		expect(telegramLink.getAttribute('href')).toBe(OuterRoute.Telegram);
	});
});