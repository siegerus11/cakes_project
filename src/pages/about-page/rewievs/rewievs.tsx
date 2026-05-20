import Title from '../../../components/title/title';
import REWIEVS from '../../../mocks/rewievs/rewievs';
import styles from './rewievs.module.scss';

type RewievsItemProps = {};

const RewievsItem = (props: RewievsItemProps) => {
	return (
		<li className={styles.component__item}>
			<div className={styles.component__item__img}></div>
			<div className={styles.component__item__text}></div>
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
					<RewievsItem key={rewiev.id} />
				))}
			</ul>
		</section>
	);
};

export default Rewievs;
