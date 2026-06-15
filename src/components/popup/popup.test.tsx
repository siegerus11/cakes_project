import { render, screen, fireEvent } from '@testing-library/react';
import { AnimationEvent, TouchEvent } from 'react';

import Popup from './popup';

describe('Component: Popup', () => {
	const renderPopup = ({
		outerClass = 'test-popup',
		closeClass,
		onCloseClick,
		onAnimationEnd,
		onTouchStart,
		onTouchMove,
		onTouchEnd
	}: {
		outerClass?: string;
		closeClass?: string;
		onCloseClick?: () => void;
		onAnimationEnd?: (e: AnimationEvent<HTMLDivElement>) => void;
		onTouchStart?: (e: TouchEvent<HTMLButtonElement>) => void;
		onTouchMove?: (e: TouchEvent<HTMLButtonElement>) => void;
		onTouchEnd?: (e: TouchEvent<HTMLButtonElement>) => void;
	} = {}) => {
		return render(
			<Popup
				outerClass={outerClass}
				closeClass={closeClass}
				onCloseClick={onCloseClick}
				onAnimationEnd={onAnimationEnd}
				onTouchStart={onTouchStart}
				onTouchMove={onTouchMove}
				onTouchEnd={onTouchEnd}
			>
				<div>Popup content</div>
			</Popup>
		);
	};

	it('should render children', () => {
		const expectedContent = 'Popup content';

		renderPopup();

		expect(screen.getByText(expectedContent)).toBeInTheDocument();
	});

	it('should render dialog with correct role and aria attributes', () => {
		renderPopup();

		const dialog = screen.getByRole('dialog');
		expect(dialog).toBeInTheDocument();
		expect(dialog.getAttribute('aria-modal')).toBe('true');
	});

	it('should apply outer class to container', () => {
		const { container } = renderPopup();

		const popupElement = container.querySelector('.test-popup');
		expect(popupElement).toBeInTheDocument();
	});

	it('should render close button when onCloseClick is provided', () => {
		const mockOnCloseClick = jest.fn();

		renderPopup({ onCloseClick: mockOnCloseClick });

		expect(screen.getByLabelText('Закрыть')).toBeInTheDocument();
	});

	it('should not render close button when onCloseClick is not provided', () => {
		renderPopup();

		expect(screen.queryByLabelText('Закрыть')).not.toBeInTheDocument();
	});

	it('should call onCloseClick when close button is clicked', () => {
		const mockOnCloseClick = jest.fn();

		renderPopup({ onCloseClick: mockOnCloseClick });

		const closeButton = screen.getByLabelText('Закрыть');
		fireEvent.click(closeButton);

		expect(mockOnCloseClick).toHaveBeenCalledTimes(1);
	});

	it('should apply close class to close button', () => {
		const mockOnCloseClick = jest.fn();
		const expectedCloseClass = 'custom-close';

		renderPopup({
			onCloseClick: mockOnCloseClick,
			closeClass: expectedCloseClass
		});

		const closeButton = screen.getByLabelText('Закрыть');
		expect(closeButton.className).toContain(expectedCloseClass);
	});

	it('should call onTouchStart when touch starts on close button', () => {
		const mockOnCloseClick = jest.fn();
		const mockOnTouchStart = jest.fn();

		renderPopup({
			onCloseClick: mockOnCloseClick,
			onTouchStart: mockOnTouchStart
		});

		const closeButton = screen.getByLabelText('Закрыть');
		fireEvent.touchStart(closeButton);

		expect(mockOnTouchStart).toHaveBeenCalledTimes(1);
	});

	it('should call onTouchMove when touch moves on close button', () => {
		const mockOnCloseClick = jest.fn();
		const mockOnTouchMove = jest.fn();

		renderPopup({
			onCloseClick: mockOnCloseClick,
			onTouchMove: mockOnTouchMove
		});

		const closeButton = screen.getByLabelText('Закрыть');
		fireEvent.touchMove(closeButton);

		expect(mockOnTouchMove).toHaveBeenCalledTimes(1);
	});

	it('should call onTouchEnd when touch ends on close button', () => {
		const mockOnCloseClick = jest.fn();
		const mockOnTouchEnd = jest.fn();

		renderPopup({
			onCloseClick: mockOnCloseClick,
			onTouchEnd: mockOnTouchEnd
		});

		const closeButton = screen.getByLabelText('Закрыть');
		fireEvent.touchEnd(closeButton);

		expect(mockOnTouchEnd).toHaveBeenCalledTimes(1);
	});
});
