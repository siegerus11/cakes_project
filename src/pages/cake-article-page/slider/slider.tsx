import { useState, useEffect, TouchEvent } from 'react';
import { Slide } from '../../../types/types';
import { createSlidesInitial } from '../../../utils/createSlidesInitial';
// import { useSlider } from '../../../hooks/useSlider';

import { useSlider } from '../../../hooks/useSlider';

import { CakeOffer } from '../../../types/types';
import styles from './slider.module.scss';

type SliderProps = {
	cake: CakeOffer;
};

const Slider = ({ cake }: SliderProps) => {
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
	const {
		slides,
		isSliderVisible,
		slideIndex,
		handleTouchStart,
		handleTouchMove,
		handleTouchEnd,
		handleSlideButtonClick,
		handleDotsClick,
		handleCloseButtonClick
	} = useSlider(cake.images);

	return (
		<div>
			{isSliderVisible && (
				<div className={styles.component}>
					<div
						className={styles.wrapper}
						onTouchStart={handleTouchStart}
						onTouchEnd={handleTouchEnd}
						onTouchMove={handleTouchMove}
					>
						{slides.map((slide, i) => {
							const keyValue = `${slide.slideAlt}-${i}`;
							return (
								slide.isVisible && (
									<img
										src={slide.slideSrc}
										alt={slide.slideAlt}
										width="535px"
										height="535px"
										key={keyValue}
									/>
								)
							);
						})}

						{slideIndex > 0 && (
							<button
								className={styles.back}
								type="button"
								onClick={() => handleSlideButtonClick(-1)}
								aria-label="Предыдущий слайд"
							></button>
						)}
						{slideIndex < slides.length - 1 && (
							<button
								className={styles.forward}
								type="button"
								onClick={() => handleSlideButtonClick(1)}
								aria-label="Следующий слайд"
							></button>
						)}
						<div className={styles.dots}>
							{slides.map((slide, i) => {
								const keyValue = `${Math.random() * i}-${
									slide.slideSrc
								}`;
								return (
									<button
										type="button"
										className={
											i === slideIndex
												? `${styles.dots__dot} ${styles.dots__dot_active}`
												: styles.dots__dot
										}
										key={keyValue}
										onClick={() => handleDotsClick(i)}
										aria-label={`Перейти к слайду ${i + 1}`}
									></button>
								);
							})}
						</div>
						<button
							className={styles.close}
							type="button"
							onClick={handleCloseButtonClick}
							aria-label="Закрыть слайдер"
						>
							<svg className={styles.cross} viewBox="0 0 18 18">
								<use xlinkHref="#close"></use>
							</svg>
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default Slider;

// import { memo } from 'react';
// import { Slide } from '../../../types/types';
// import { useSlider } from '../../../hooks/useSlider';
// import { CakeOffer } from '../../../types/types';
// import styles from './slider.module.scss';

// type SliderProps = {
// 	cake: CakeOffer;
// };

// const Slider = memo(({ cake }: SliderProps) => {
// 	const {
// 		slides,
// 		isSliderVisible,
// 		slideIndex,
// 		handleTouchStart,
// 		handleTouchMove,
// 		handleTouchEnd,
// 		handleSlideButtonClick,
// 		handleDotsClick,
// 		handleCloseButtonClick
// 	} = useSlider(cake.images);

// 	const renderCurrentSlide = () => {
// 		const currentSlide = slides.find(slide => slide.isVisible);
// 		if (!currentSlide) return null;

// 		return (
// 			<img
// 				src={currentSlide.slideSrc}
// 				alt={currentSlide.slideAlt}
// 				width="535"
// 				height="535"
// 				className={styles.slide}
// 			/>
// 		);
// 	};

// 	const renderDots = () => (
// 		<div className={styles.dots}>
// 			{slides.map((_, i) => (
// 				<button
// 					key={i}
// 					type="button"
// 					className={
// 						i === slideIndex
// 							? `${styles.dots__dot} ${styles.dots__dot_active}`
// 							: styles.dots__dot
// 					}
// 					onClick={() => handleDotsClick(i)}
// 					aria-label={`Перейти к слайду ${i + 1}`}
// 				/>
// 			))}
// 		</div>
// 	);

// 	const renderNavigationButtons = () => (
// 		<>
// 			{slideIndex > 0 && (
// 				<button
// 					className={styles.back}
// 					type="button"
// 					onClick={() => handleSlideButtonClick(-1)}
// 					aria-label="Предыдущий слайд"
// 				/>
// 			)}
// 			{slideIndex < slides.length - 1 && (
// 				<button
// 					className={styles.forward}
// 					type="button"
// 					onClick={() => handleSlideButtonClick(1)}
// 					aria-label="Следующий слайд"
// 				/>
// 			)}
// 		</>
// 	);

// 	if (!isSliderVisible) return null;

// 	return (
// 		<div className={styles.component}>
// 			<div
// 				className={styles.wrapper}
// 				onTouchStart={handleTouchStart}
// 				onTouchMove={handleTouchMove}
// 				onTouchEnd={handleTouchEnd}
// 			>
// 				{renderCurrentSlide()}
// 				{renderNavigationButtons()}
// 				{renderDots()}

// 				<button
// 					className={styles.close}
// 					type="button"
// 					onClick={handleCloseButtonClick}
// 					aria-label="Закрыть слайдер"
// 				>
// 					<svg
// 						className={styles.cross}
// 						viewBox="0 0 18 18"
// 						aria-hidden="true"
// 					>
// 						<use xlinkHref="#close" />
// 					</svg>
// 				</button>
// 			</div>
// 		</div>
// 	);
// });

// Slider.displayName = 'Slider';

// export default Slider;

// import { useState, useEffect, useRef, useCallback } from 'react';

// // import { useSlider } from '../../../hooks/useSlider';
// import { createSlidesInitial } from '../../../utils/createSlidesInitial';
// import { CakeOffer, Slide } from '../../../types/types';
// import styles from './slider.module.scss';

// type SliderProps = {
// 	cake: CakeOffer;
// };

// const Slider = ({ cake }: SliderProps) => {
// 	function useSlider(imagesSrc: string[]) {
// 		const slidesInitial = createSlidesInitial(imagesSrc);
// 		const [slides, setSlides] = useState<Slide[]>(slidesInitial);

// 		const [isSliderVisible, setIsSliderVisible] = useState<boolean>(true);
// 		const [slideIndex, setSlideIndex] = useState(0);

// 		// Состояния для свайпа
// 		const [touchStartX, setTouchStartX] = useState(0);
// 		const [touchEndX, setTouchEndX] = useState(0);
// 		const [isSwiping, setIsSwiping] = useState(false);

// 		const sliderRef = useRef<HTMLDivElement>(null);

// 		const handleSlideButtonClick = (num: number) => {
// 			setSlideIndex(prevState => {
// 				const newIndex = prevState + num;
// 				if (newIndex < 0) return 0;
// 				if (newIndex >= slides.length) return slides.length - 1;
// 				return newIndex;
// 			});
// 		};

// 		const handleDotsClick = (idx: number) => {
// 			setSlideIndex(idx);
// 		};

// 		const handleCloseButtonClick = () => {
// 			setIsSliderVisible(prevState => !prevState);
// 		};

// 		// Обработчики свайпа
// 		const handleTouchStart = useCallback((e: React.TouchEvent) => {
// 			setTouchStartX(e.touches[0].clientX);
// 			setIsSwiping(true);
// 		}, []);

// 		const handleTouchMove = useCallback(
// 			(e: React.TouchEvent) => {
// 				if (!isSwiping) return;
// 				setTouchEndX(e.touches[0].clientX);
// 			},
// 			[isSwiping]
// 		);

// 		const handleTouchEnd = useCallback(() => {
// 			if (!isSwiping) return;

// 			const touchDistance = touchStartX - touchEndX;
// 			const minSwipeDistance = 50; // Минимальное расстояние для свайпа

// 			if (Math.abs(touchDistance) >= minSwipeDistance) {
// 				if (touchDistance > 0 && slideIndex < slides.length - 1) {
// 					// Свайп вправо - следующий слайд
// 					handleSlideButtonClick(1);
// 				} else if (touchDistance < 0 && slideIndex > 0) {
// 					// Свайп влево - предыдущий слайд
// 					handleSlideButtonClick(-1);
// 				}
// 			}

// 			setIsSwiping(false);
// 			setTouchStartX(0);
// 			setTouchEndX(0);
// 		}, [
// 			isSwiping,
// 			touchStartX,
// 			touchEndX,
// 			slideIndex,
// 			slides.length,
// 			handleSlideButtonClick
// 		]);

// 		useEffect(() => {
// 			setSlides(prevState =>
// 				prevState.map((slide, idx) => {
// 					return idx === slideIndex
// 						? { ...slide, isVisible: true }
// 						: { ...slide, isVisible: false };
// 				})
// 			);
// 		}, [slideIndex]);

// 		return {
// 			slides,
// 			isSliderVisible,
// 			slideIndex,
// 			handleSlideButtonClick,
// 			handleDotsClick,
// 			handleCloseButtonClick,
// 			sliderRef,
// 			handleTouchStart,
// 			handleTouchMove,
// 			handleTouchEnd
// 		};
// 	}

// 	const {
// 		slides,
// 		isSliderVisible,
// 		slideIndex,
// 		handleSlideButtonClick,
// 		handleDotsClick,
// 		handleCloseButtonClick,
// 		sliderRef,
// 		handleTouchStart,
// 		handleTouchMove,
// 		handleTouchEnd
// 	} = useSlider(cake.images);

// 	return (
// 		<>
// 			{isSliderVisible && (
// 				<div className={styles.component}>
// 					<div
// 						className={styles.wrapper}
// 						ref={sliderRef}
// 						onTouchStart={handleTouchStart}
// 						onTouchMove={handleTouchMove}
// 						onTouchEnd={handleTouchEnd}
// 					>
// 						{slides.map((slide, i) => {
// 							const keyValue = `${slide.slideAlt}-${i}`;
// 							return (
// 								slide.isVisible && (
// 									<img
// 										src={slide.slideSrc}
// 										alt={slide.slideAlt}
// 										width="535px"
// 										height="535px"
// 										key={keyValue}
// 									/>
// 								)
// 							);
// 						})}

// 						{slideIndex > 0 && (
// 							<button
// 								className={styles.back}
// 								type="button"
// 								onClick={() => handleSlideButtonClick(-1)}
// 							></button>
// 						)}
// 						{slideIndex < slides.length - 1 && (
// 							<button
// 								className={styles.forward}
// 								type="button"
// 								onClick={() => handleSlideButtonClick(1)}
// 							></button>
// 						)}
// 						<div className={styles.dots}>
// 							{slides.map((slide, i) => {
// 								const keyValue = `${i}-${slide.slideSrc}`; // Исправлен key
// 								return (
// 									<button
// 										type="button"
// 										className={
// 											i === slideIndex
// 												? `${styles.dots__dot} ${styles.dots__dot_active}`
// 												: styles.dots__dot
// 										}
// 										key={keyValue}
// 										onClick={() => handleDotsClick(i)}
// 									></button>
// 								);
// 							})}
// 						</div>
// 						<button
// 							className={styles.close}
// 							type="button"
// 							onClick={handleCloseButtonClick}
// 						>
// 							<svg className={styles.cross} viewBox="0 0 18 18">
// 								<use xlinkHref="#close"></use>
// 							</svg>
// 						</button>
// 					</div>
// 				</div>
// 			)}
// 		</>
// 	);
// };

// export default Slider;
