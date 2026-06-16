import { render, screen } from '@testing-library/react';

import NotFoundCake from './no-found-cake';

describe('Component: NotFoundCake', () => {
	it('should render title', () => {
		const expectedTitle = 'Не нашли свой торт?';

		render(<NotFoundCake />);

		expect(screen.getByText(expectedTitle)).toBeInTheDocument();
	});

	it('should render telegram link', () => {
		const expectedLinkText = 'Напишите в Telegram';

		render(<NotFoundCake />);

		const link = screen.getByText(expectedLinkText);
		expect(link).toBeInTheDocument();
		expect(link.getAttribute('href')).toBe('/');
	});
});