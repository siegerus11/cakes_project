import Title from '../title/title';
import styles from './questions.module.scss';

type QuestionsItemProps = {
	title: string;
	text: string;
};

const QuestionsItem = ({ title, text }: QuestionsItemProps) => {
	return (
		<li className={styles.questions__item}>
			<Title
				level="h4"
				titleText={title}
				titleClass={styles.questions__subtitle}
			/>
			<p className={styles.questions__text}>{text}</p>
		</li>
	);
};

type QuestionsProps = {
	wrapperClass?: string;
	titleClass: string;
};

const Questions = ({ titleClass, wrapperClass }: QuestionsProps) => {
	return (
		<section className={`questions ${wrapperClass}`}>
			<div className={styles.questions__headline}>
				<Title
					level="h3"
					titleClass={`title_fw800 questions__title ${titleClass}`}
					titleText="Популярные вопросы"
				/>
			</div>

			<ul className={styles.questions__list}>
				<QuestionsItem title="" text="" />
			</ul>
		</section>
	);
};

export default Questions;
