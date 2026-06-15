import { render, screen } from '@testing-library/react';

import withHistory from '../../mocks/withHistory';
import HamburgerPopup from './hamburger-popup';

describe('Component: HamburgerPopup', () => {
	const mockOnHamburgerClick = jest.fn();
	const mockOnAnimationEnd = jest.fn();
	const mockGetAnimationClass = jest.fn(
		(baseClass: string, _activeClass: string) => baseClass
	);

	const renderHamburgerPopup = () => {
		const componentWithHistory = withHistory(
			<HamburgerPopup
				onHamburgerClick={mockOnHamburgerClick}
				onAnimationEnd={mockOnAnimationEnd}
				getAnimationClass={mockGetAnimationClass}
			/>
		);
		return render(componentWithHistory);
	};

	beforeEach(() => {
		mockOnHamburgerClick.mockClear();
		mockOnAnimationEnd.mockClear();
		mockGetAnimationClass.mockClear();
	});

	it('should render dialog with correct aria attributes', () => {
		const expectedAriaLabel = 'Меню';

		renderHamburgerPopup();

		const dialog = screen.getByRole('dialog');
		expect(dialog).toBeInTheDocument();
		expect(dialog.getAttribute('aria-label')).toBe(expectedAriaLabel);
		expect(dialog.getAttribute('aria-modal')).toBe('true');
	});

	it('should call getAnimationClass on render', () => {
		renderHamburgerPopup();

		expect(mockGetAnimationClass).toHaveBeenCalledTimes(1);
	});

	it('should call onHamburgerClick when hamburger is clicked', () => {
		renderHamburgerPopup();

		const hamburgerButton = screen.getByRole('button');
		hamburgerButton.click();

		expect(mockOnHamburgerClick).toHaveBeenCalledTimes(1);
	});
});