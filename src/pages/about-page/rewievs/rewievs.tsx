import Title from '../../../components/title/title';
import REWIEVS from '../../../mocks/rewievs/rewievs';
import styles from './rewievs.module.scss';

type RewievsItemProps = {
	avatar: string;
	name: string;
	text: string;
	rating: number;
};

const RewievsItem = ({ avatar, name, text, rating }: RewievsItemProps) => {
	return (
		<li className={styles.component__item}>
			<div className={styles.component__item__head}>
				<img
					className={styles.component__item__avatar}
					src={avatar}
					alt={name}
					width="48"
					height="48"
				/>
				<div>
					<span className={styles.component__item__name}>{name}</span>
					<div className={styles.component__item__stars}>
						{Array.from({ length: 5 }, (_, i) => (
							<svg
								key={i}
								className={`${styles.component__item__star} ${
									i < rating ? styles.component__item__star_filled : ''
								}`}
								viewBox="0 0 16 16"
								aria-hidden="true"
							>
								<use xlinkHref="#star"></use>
							</svg>
						))}
					</div>
				</div>
			</div>
			<p className={styles.component__item__text}>{text}</p>
		</li>
	);
};

const Rewievs = () => {
	return (
		<section className={styles.component}>
			<Title
				level="h3"
				titleClass={`title_fw800 ${styles.component__title}`}
				titleText="Отзывы"
			/>
			<ul className={styles.component__list}>
				{REWIEVS.map(rewiev => (
					<RewievsItem
						key={rewiev.id}
						avatar={rewiev.avatar}
						name={rewiev.name}
						text={rewiev.text}
						rating={rewiev.rating}
					/>
				))}
			</ul>
		</section>
	);
};

export default Rewievs;
