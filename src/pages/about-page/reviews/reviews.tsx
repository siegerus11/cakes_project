import Title from '../../../components/title/title';
import REVIEWS from '../../../mocks/reviews/reviews';
import styles from './reviews.module.scss';

type ReviewsItemProps = {
	avatar: string;
	name: string;
	text: string;
	rating: number;
	date: string;
};

const ReviewsItem = ({
	avatar,
	name,
	text,
	rating,
	date
}: ReviewsItemProps) => {
	return (
		<li className={styles.item}>
			<div className={styles.item__head}>
				<img
					className={styles.item__avatar}
					src={avatar}
					alt={name}
					width="48"
					height="48"
				/>
				<div>
					<span className={styles.item__name}>{name}</span>
					<div className={styles.item__stars}>
						{Array.from({ length: 5 }, (_, i) => (
							<svg
								key={i}
								className={`${styles.item__star} ${
									i < rating ? styles.item__star_filled : ''
								}`}
								viewBox="0 0 16 16"
								aria-hidden="true"
							>
								<use xlinkHref="#star" />
							</svg>
						))}
					</div>
				</div>
			</div>
			<p className={styles.item__text}>{text}</p>
			<span className={styles.item__date}>{date}</span>
		</li>
	);
};

const Reviews = () => {
	return (
		<section id="reviews" className={styles.component}>
			<Title
				level="h3"
				titleClass={`title_fw800 ${styles.component__title}`}
				titleText="Отзывы"
			/>
			<ul className={styles.component__list}>
				{REVIEWS.map(review => (
					<ReviewsItem
						key={review.id}
						avatar={review.avatar}
						name={review.name}
						text={review.text}
						rating={review.rating}
						date={review.date}
					/>
				))}
			</ul>
		</section>
	);
};

export default Reviews;
