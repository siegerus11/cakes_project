import { render, screen, fireEvent } from '@testing-library/react';

import withHistory from '../../../mocks/withHistory';
import { CakeOffer } from '../../../types/types';
import Slider from './slider';

const mockSlides = [
	{ slideSrc: '/img1.jpg', slideAlt: 'Фото 1', isVisible: true },
	{ slideSrc: '/img2.jpg', slideAlt: 'Фото 2', isVisible: false },
	{ slideSrc: '/img3.jpg', slideAlt: 'Фото 3', isVisible: false }
];

const mockHandleSlideButtonClick = jest.fn();
const mockHandleDotsClick = jest.fn();
const mockHandleCloseButtonClick = jest.fn();

jest.mock('../../../hooks/useSlider', () => ({
	__esModule: true,
	default: () => ({
		slides: mockSlides,
		isSliderVisible: true,
		slideIndex: 0,
		handleTouchStart: jest.fn(),
		handleTouchMove: jest.fn(),
		handleTouchEnd: jest.fn(),
		handleSlideButtonClick: mockHandleSlideButtonClick,
		handleDotsClick: mockHandleDotsClick,
		handleCloseButtonClick: mockHandleCloseButtonClick
	})
}));

describe('Component: Slider', () => {
	const renderSlider = () => {
		const componentwithHistory = withHistory(
			<Slider
				cake={
					{
						images: ['/img1.jpg', '/img2.jpg', '/img3.jpg']
					} as CakeOffer
				}
			/>
		);
		return render(componentwithHistory);
	};

	it('should render visible slide image', () => {
		const imageAltText = 'Фото 1';
		const expectedSrc = '/img1.jpg';

		renderSlider();

		const image = screen.getByAltText(imageAltText);
		expect(image).toBeInTheDocument();
		expect(image.getAttribute('src')).toBe(expectedSrc);
	});

	it('should render close button', () => {
		const expectedAriaLabel = 'Закрыть слайдер';

		renderSlider();

		expect(screen.getByLabelText(expectedAriaLabel)).toBeInTheDocument();
	});

	it('should not render back button when on first slide', () => {
		const expectedAriaLabel = 'Предыдущий слайд';

		renderSlider();

		expect(
			screen.queryByLabelText(expectedAriaLabel)
		).not.toBeInTheDocument();
	});

	it('should render forward button when not on last slide', () => {
		const expectedAriaLabel = 'Следующий слайд';

		renderSlider();

		expect(screen.getByLabelText(expectedAriaLabel)).toBeInTheDocument();
	});

	it('should call handleSlideButtonClick when forward is clicked', () => {
		const expectedAriaLabel = 'Следующий слайд';

		renderSlider();

		const forwardButton = screen.getByLabelText(expectedAriaLabel);
		fireEvent.click(forwardButton);

		expect(mockHandleSlideButtonClick).toHaveBeenCalledWith(1);
	});

	it('should render dot buttons', () => {
		const firstLabelText = 'Перейти к слайду 1';
		const secondLabelText = 'Перейти к слайду 1';
		const thirdLabelText = 'Перейти к слайду 1';

		renderSlider();

		const dot1 = screen.getByLabelText(firstLabelText);
		const dot2 = screen.getByLabelText(secondLabelText);
		const dot3 = screen.getByLabelText(thirdLabelText);

		expect(dot1).toBeInTheDocument();
		expect(dot2).toBeInTheDocument();
		expect(dot3).toBeInTheDocument();
	});

	it('should call handleDotsClick when dot is clicked', () => {
		const dotLabelText = 'Перейти к слайду 2';

		renderSlider();

		const dot2 = screen.getByLabelText(dotLabelText);
		fireEvent.click(dot2);

		expect(mockHandleDotsClick).toHaveBeenCalledWith(1);
	});

	it('should call handleCloseButtonClick when close button is clicked', () => {
		const expectedAriaLabel = 'Закрыть слайдер';

		renderSlider();

		const closeButton = screen.getByLabelText(expectedAriaLabel);
		fireEvent.click(closeButton);

		expect(mockHandleCloseButtonClick).toHaveBeenCalledTimes(1);
	});
});
