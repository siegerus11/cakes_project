import { useCallback, useState } from 'react';

import { Question } from '../../types/types';
import Title from '../title/title';
import styles from './questions.module.scss';

type QuestionsItemProps = {
	title: string;
	text: string;
	isActive: boolean;
	index: number;
	onOpenButtonClick: (idx: number) => void;
};

const QuestionsItem = ({
	title,
	text,
	isActive,
	index,
	onOpenButtonClick
}: QuestionsItemProps) => {
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
					className={`${styles.questions__close} ${
						isActive ? styles.questions__close_active : ''
					}`}
					aria-label={isActive ? 'Скрыть вопрос' : 'Показать вопрос'}
					onClick={() => onOpenButtonClick(index)}
				></button>
			</div>
			{isActive && <p className={styles.questions__text}>{text}</p>}
		</li>
	);
};

type QuestionsProps = {
	wrapperClass?: string;
	titleClass: string;
	questions: Question[];
};

const Questions = ({ titleClass, wrapperClass, questions }: QuestionsProps) => {
	const [relavantQuestions, setRelavantQuestions] =
		useState<Question[]>(questions);

	const handleOpenButtonClick = useCallback(
		(idx: number) => {
			setRelavantQuestions(
				relavantQuestions.map((question, i) => {
					if (i === idx) {
						return {
							...question,
							isActive: !question.isActive
						};
					}
					return question;
				})
			);
		},
		[relavantQuestions]
	);

	return (
		<section className={`questions ${wrapperClass}`}>
			<Title
				level="h3"
				titleClass={`title_fw800 questions-title ${titleClass}`}
				titleText="Популярные вопросы"
			/>

			<ul className={styles.questions__list}>
				{relavantQuestions.map((question, i) => {
					const keyValue = `${question.title}-${i}`;
					return (
						<QuestionsItem
							key={keyValue}
							title={question.title}
							text={question.text}
							isActive={question.isActive}
							index={i}
							onOpenButtonClick={handleOpenButtonClick}
						/>
					);
				})}
			</ul>
		</section>
	);
};

export default Questions;
