import { useState } from 'react';
import { CakeOffer, Slide } from '../../../types/types';
import styles from './slider.module.scss';

type SliderProps = {
	cake: CakeOffer;
};
let slideIndex = 0;

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

	const [slides, setSlides] = useState<Slide[]>(slidesInitial);

	const setSlideIndex = (num: number) => {
		slideIndex = slideIndex + num;
		if (slideIndex <= 0) slideIndex = slides.length - 1;
		if (slideIndex >= slides.length) slideIndex = 0;
	};

	const handleSlideButtonClick = (num: number) => {
		setSlideIndex(num);
		setSlides(
			slides.map((slide, idx) => {
				return idx === slideIndex
					? { ...slide, isVisible: true }
					: { ...slide, isVisible: false };
			})
		);
	};

	// useEffect(() => {
	// 	setSlides(
	// 		slides.map((slide, idx) => {
	// 			return idx === slideIndex
	// 				? { ...slide, isVisible: true }
	// 				: { ...slide, isVisible: false };
	// 		})
	// 	);
	// }, [slideIndex]);

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
			</div>
			<button
				className={styles.back}
				type="button"
				onClick={() => handleSlideButtonClick(-1)}
			>
				Prev
			</button>
			<button
				className={styles.forward}
				type="button"
				onClick={() => handleSlideButtonClick(1)}
			>
				Next
			</button>
			<div className={styles.dots}>
				<button></button>
				<button></button>
				<button></button>
				<button></button>
			</div>
		</div>
	);
};

export default Slider;
