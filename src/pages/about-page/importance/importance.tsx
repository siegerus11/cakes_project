import Title from '../../../components/title/title';
import { IMPORTANCES } from '../../../constants';
import styles from './importance.module.scss';

type importanceItemProps = {
	title: string;
	text: string;
};

const ImportanceItem = ({ title, text }: importanceItemProps) => {
	return (
		<li className={styles.component__item}>
			<Title
				titleClass={styles.component__subtitle}
				titleText={title}
				level="h4"
			/>
			<p className={styles.component__text}>{text}</p>
		</li>
	);
};

const Importance = () => {
	return (
		<section className={styles.component}>
			<Title
				titleText="Наши ценности"
				level="h3"
				titleClass={`title title_fw800 ${styles.component__title}`}
			/>
			<ul className={styles.component__list}>
				{IMPORTANCES.map((item, i) => {
					const keyValue = `${item.title}-${i}`;
					return (
						<ImportanceItem
							key={keyValue}
							text={item.description}
							title={item.title}
						/>
					);
				})}
			</ul>
		</section>
	);
};

export default Importance;
