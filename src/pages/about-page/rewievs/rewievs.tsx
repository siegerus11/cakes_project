import Title from '../../../components/title/title';
import REWIEVS from '../../../mocks/rewievs/rewievs';
import styles from './rewievs.module.scss';

type RewievsItemProps = {
	avatar: string;
	name: string;
	text: string;
	rating: number;
	date: string;
};

const STAR_PATH = 'M8 1.2l2.1 4.3 4.7.7-3.4 3.3.8 4.7L8 12l-4.2 2.2.8-4.7L1.2 6.2l4.7-.7L8 1.2z';

const RewievsItem = ({ avatar, name, text, rating, date }: RewievsItemProps) => {
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
					<div className={styles.component__stars}>
						{Array.from({ length: 5 }, (_, i) => (
							<svg
								key={i}
								className={styles.component__star}
								viewBox="0 0 16 16"
								aria-hidden="true"
							>
								<path
									d={STAR_PATH}
									fill={i < rating ? '#ff4c80' : 'none'}
									stroke={i < rating ? '#ff4c80' : '#b1b1b1'}
									strokeWidth="0.5"
								/>
							</svg>
						))}
					</div>
				</div>
			</div>
			<p className={styles.component__item__text}>{text}</p>
			<span className={styles.component__item__date}>{date}</span>
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
						date={rewiev.date}
					/>
				))}
			</ul>
		</section>
	);
};

export default Rewievs;
