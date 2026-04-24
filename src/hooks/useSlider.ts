import { useEffect, useState, TouchEvent } from 'react';

import { Slide } from '../types/types';
import { createSlidesInitial } from '../utils/createSlidesInitial';

function useSlider(imagesSrc: string[]) {
	const slidesInitial = createSlidesInitial(imagesSrc);
	const [slides, setSlides] = useState<Slide[]>(slidesInitial);

	const [isSliderVisible, setIsSliderVisible] = useState<boolean>(true);
	const [slideIndex, setSlideIndex] = useState(0);

	const [touchStartX, setTouchStartX] = useState<number>(0);
	const [touchEndX, setTouchEndX] = useState<number>(0);
	const [isSwiping, setIsSwiping] = useState(false);

	const handleSlideButtonClick = (num: number) => {
		setSlideIndex(prevState => {
			const newIndex = prevState + num;
			if (newIndex < 0) return 0;
			if (newIndex >= slides.length) return slides.length - 1;
			return newIndex;
		});
	};

	const handleDotsClick = (idx: number) => {
		setSlideIndex(idx);
	};

	const handleCloseButtonClick = () => {
		setIsSliderVisible(prevState => !prevState);
	};

	useEffect(() => {
		setSlides(prevState =>
			prevState.map((slide, idx) => {
				return idx === slideIndex
					? { ...slide, isVisible: true }
					: { ...slide, isVisible: false };
			})
		);
	}, [slideIndex]);

	const handleTouchStart = (e: TouchEvent) => {
		setTouchStartX(e.touches[0].clientX);
	};

	const handleTouchMove = (e: TouchEvent) => {
		setIsSwiping(true);
		setTouchEndX(e.touches[0].clientX);
	};

	const handleTouchEnd = () => {
		if (!isSwiping) return;

		const touchDifference = touchEndX - touchStartX;
		const touchLength = Math.abs(touchEndX - touchStartX);
		const touchMinLength = 50;
		console.log(touchLength);
		function toggleSlide() {
			if (touchLength < touchMinLength) return;
			if (touchDifference > 0) handleSlideButtonClick(-1);
			else handleSlideButtonClick(1);
		}
		toggleSlide();

		setIsSwiping(false);
	};

	return {
		slides,
		isSliderVisible,
		slideIndex,
		handleTouchStart,
		handleTouchMove,
		handleTouchEnd,
		handleSlideButtonClick,
		handleDotsClick,
		handleCloseButtonClick
	};
}

export { useSlider };
