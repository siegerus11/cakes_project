import { useMemo } from 'react';

import useSlider from '../../../hooks/useSlider';
import { CakeOffer } from '../../../types/types';
import styles from './slider.module.scss';

type SliderProps = {
	cake: CakeOffer;
};

const Slider = ({ cake }: SliderProps) => {
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

	const visibleSlides = useMemo(
		() => slides.filter(slide => slide.isVisible),
		[slides]
	);

	const dots = useMemo(
		() =>
			slides.map((slide, i) => ({
				id: i,
				className:
					i === slideIndex
						? `${styles.dots__dot} ${styles.dots__dot_active}`
						: styles.dots__dot,
				key: `${slide.slideSrc}-${i}`
			})),
		[slides, slideIndex]
	);

	return (
		<div className={styles.outer}>
			{isSliderVisible && (
				<div className={styles.component}>
					<div
						className={styles.wrapper}
						onTouchStart={handleTouchStart}
						onTouchEnd={handleTouchEnd}
						onTouchMove={handleTouchMove}
					>
						{visibleSlides.map(slide => (
							<img
								src={slide.slideSrc}
								alt={slide.slideAlt}
								width="535"
								height="535"
								key={`${slide.slideSrc}-${slideIndex}`}
							/>
						))}

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
							{dots.map(dot => (
								<button
									type="button"
									className={dot.className}
									key={dot.key}
									onClick={() => handleDotsClick(dot.id)}
									aria-label={`Перейти к слайду ${
										dot.id + 1
									}`}
								></button>
							))}
						</div>
						<button
							className={`close ${styles.close}`}
							type="button"
							onClick={handleCloseButtonClick}
							aria-label="Закрыть слайдер"
						>
							<svg
								className={styles.cross}
								viewBox="0 0 18 18"
								aria-hidden="true"
							>
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
