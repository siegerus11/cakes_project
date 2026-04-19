import { useState, useEffect } from 'react';
import { CakeOffer, Slide } from '../../../types/types';
import styles from './slider.module.scss';

type SliderProps = {
	cake: CakeOffer;
};

const Slider = ({ cake }: SliderProps) => {
	const getSlidesInitial = (array: string[]): Slide[] => {
		return array.map((item, i) => {
			return {
				slideSrc: item,
				slideAlt: 'cake-slide',
				isVisible: i === 0 ? true : false
			};
		});
	};

	const slidesInitial = getSlidesInitial(cake.images);
	const [slideIndex, setSlideIndex] = useState(0);
	const [slides, setSlides] = useState<Slide[]>(slidesInitial);
	const handleSlideButtonClick = (num: number) => {
		setSlideIndex(prevState => {
			const newIndex = prevState + num;
			if (newIndex < 0) return 0;
			else if (newIndex >= slides.length) return slides.length - 1;
			console.log(slideIndex);
			return newIndex;
		});
	};

	const handleDotsClick = (idx: number) => {
		setSlideIndex(idx);
	};

	useEffect(() => {
		setSlides(
			slides.map((slide, idx) => {
				return idx === slideIndex
					? { ...slide, isVisible: true }
					: { ...slide, isVisible: false };
			})
		);
	}, [slideIndex]);

	return (
		<div className={styles.component}>
			<div className={styles.wrapper}>
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
					></button>
				)}
				{slideIndex <= slides.length && (
					<button
						className={styles.forward}
						type="button"
						onClick={() => handleSlideButtonClick(1)}
					></button>
				)}
				<div className={styles.dots}>
					{slides.map((slide, i) => {
						const keyValue = `${Math.random() * i}-${
							slide.slideSrc
						}`;
						return (
							<button
								className={
									i === slideIndex
										? `${styles.dots__dot} ${styles.dots__dot_active}`
										: styles.dots__dot
								}
								key={keyValue}
								onClick={() => handleDotsClick(i)}
							></button>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default Slider;
