import { screen, render, fireEvent } from '@testing-library/react';

import Clauses from './clause';

describe('Component: Clauses', () => {
	it('should render initial content with "Показать еще" button', () => {
		const expectedText = /Десерты на день рождения женщины/i;
		const expectedButtonText = 'Показать еще';
		render(<Clauses />);

		expect(screen.getByText(expectedText)).toBeInTheDocument();
		expect(screen.getByRole('button')).toBeInTheDocument();
		expect(screen.getByText(expectedButtonText)).toBeInTheDocument();
	});

	it('should expand content when button is clicked', () => {
		render(<Clauses />);

		const button = screen.getByRole('button');
		fireEvent.click(button);

		expect(screen.getByText('Скрыть')).toBeInTheDocument();
	});

	it('should collapse content when button is clicked twice', () => {
		render(<Clauses />);

		const button = screen.getByRole('button');

		fireEvent.click(button);
		expect(screen.getByText('Скрыть')).toBeInTheDocument();

		fireEvent.click(button);
		expect(screen.getByText('Показать еще')).toBeInTheDocument();
	});

	it('should have button with correct type attribute', () => {
		render(<Clauses />);

		const button = screen.getByRole('button');
		expect(button.getAttribute('type')).toBe('button');
	});
});
