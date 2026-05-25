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
		<li className={styles.item}>
			<div
				className={styles.headline}
				role="button"
				tabIndex={0}
				onKeyDown={() => onOpenButtonClick(index)}
				onClick={() => onOpenButtonClick(index)}
			>
				<Title
					level="h4"
					titleText={title}
					titleClass={styles.subtitle}
				/>
				<button
					type="button"
					className={`close ${styles.close} ${
						isActive ? styles.close_active : ''
					}`}
					aria-label={isActive ? 'Скрыть вопрос' : 'Показать вопрос'}
				>
					<svg
						className={styles.cross}
						viewBox="0 0 18 18"
						aria-hidden="true"
					>
						<use xlinkHref="#close"></use>
					</svg>
				</button>
			</div>
			{isActive && <p className={styles.text}>{text}</p>}
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
		<section className={`questions ${wrapperClass}`} id="questions">
			<Title
				level="h3"
				titleClass={`title_fw800 questions-title ${titleClass}`}
				titleText="Популярные вопросы"
			/>

			<ul className={styles.list}>
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
