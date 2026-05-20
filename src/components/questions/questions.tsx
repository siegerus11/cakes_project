import { Question } from '../../types/types';
import Title from '../title/title';
import styles from './questions.module.scss';

type QuestionsItemProps = {
	title: string;
	text: string;
};

const QuestionsItem = ({ title, text }: QuestionsItemProps) => {
	return (
		<li className={styles.questions__item}>
			<div className={styles.questions__headline}>
				<Title
					level="h4"
					titleText={title}
					titleClass={styles.questions__subtitle}
				/>
				<button
					type="button"
					className={styles.questions__close}
					aria-label="Показать вопрос"
				>
					X
				</button>
			</div>
		</li>
	);
};

type QuestionsProps = {
	wrapperClass?: string;
	titleClass: string;
	questions: Question[];
};

const Questions = ({ titleClass, wrapperClass, questions }: QuestionsProps) => {
	return (
		<section className={`questions ${wrapperClass}`}>
			<Title
				level="h3"
				titleClass={`title_fw800 questions-title ${titleClass}`}
				titleText="Популярные вопросы"
			/>

			<ul className={styles.questions__list}>
				<QuestionsItem title="" text="" />
			</ul>
		</section>
	);
};

export default Questions;
