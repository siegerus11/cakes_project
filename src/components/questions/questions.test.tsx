import { render, screen, fireEvent } from '@testing-library/react';

import { Question } from '../../types/types';
import Questions from './questions';

describe('Component: Questions', () => {
	const mockQuestions: Question[] = [
		{ title: 'Вопрос 1', text: 'Ответ на вопрос 1', isActive: false },
		{ title: 'Вопрос 2', text: 'Ответ на вопрос 2', isActive: false },
		{ title: 'Вопрос 3', text: 'Ответ на вопрос 3', isActive: false }
	];

	const renderQuestions = ({
		titleClass = '',
		wrapperClass = '',
		questions = mockQuestions
	}: {
		titleClass?: string;
		wrapperClass?: string;
		questions?: Question[];
	} = {}) => {
		return render(
			<Questions
				titleClass={titleClass}
				wrapperClass={wrapperClass}
				questions={questions}
			/>
		);
	};

	it('should render section with title', () => {
		const expectedTitle = 'Популярные вопросы';

		renderQuestions();

		expect(screen.getByText(expectedTitle)).toBeInTheDocument();
	});

	it('should render all questions', () => {
		const firstQuestionText = 'Вопрос 1';
		const secondQuestionText = 'Вопрос 2';
		const thirdQuestionText = 'Вопрос 3';

		renderQuestions();

		expect(screen.getByText(firstQuestionText)).toBeInTheDocument();
		expect(screen.getByText(secondQuestionText)).toBeInTheDocument();
		expect(screen.getByText(thirdQuestionText)).toBeInTheDocument();
	});

	it('should not render answers initially', () => {
		const firstAnswerText = 'Ответ на вопрос 1';
		const secondAnswerText = 'Ответ на вопрос 2';
		const thirdAnswerText = 'Ответ на вопрос 3';

		renderQuestions();

		expect(screen.queryByText(firstAnswerText)).not.toBeInTheDocument();
		expect(screen.queryByText(secondAnswerText)).not.toBeInTheDocument();
		expect(screen.queryByText(thirdAnswerText)).not.toBeInTheDocument();
	});

	it('should show answer when question is clicked', () => {
		const expectedAnswer = 'Ответ на вопрос 1';

		renderQuestions();

		const questionButton = screen.getByText('Вопрос 1');
		fireEvent.click(questionButton);

		expect(screen.getByText(expectedAnswer)).toBeInTheDocument();
	});

	it('should hide answer when clicked again', () => {
		const expectedAnswer = 'Ответ на вопрос 1';

		renderQuestions();

		const questionButton = screen.getByText('Вопрос 1');

		fireEvent.click(questionButton);
		expect(screen.getByText(expectedAnswer)).toBeInTheDocument();

		fireEvent.click(questionButton);
		expect(screen.queryByText(expectedAnswer)).not.toBeInTheDocument();
	});

	it('should allow only one question to be active at a time', () => {
		renderQuestions();

		fireEvent.click(screen.getByText('Вопрос 1'));
		expect(screen.getByText('Ответ на вопрос 1')).toBeInTheDocument();

		fireEvent.click(screen.getByText('Вопрос 2'));
		expect(screen.getByText('Ответ на вопрос 2')).toBeInTheDocument();
		expect(screen.queryByText('Ответ на вопрос 1')).toBeInTheDocument();
	});

	it('should apply wrapper class', () => {
		const { container } = renderQuestions({
			wrapperClass: 'custom-wrapper'
		});

		const section = container.querySelector('.custom-wrapper');
		expect(section).toBeInTheDocument();
	});

	it('should render questions with initial active state', () => {
		const questionsWithActive = [
			{ title: 'Вопрос 1', text: 'Ответ 1', isActive: true },
			{ title: 'Вопрос 2', text: 'Ответ 2', isActive: false }
		];

		renderQuestions({ questions: questionsWithActive });

		expect(screen.getByText('Ответ 1')).toBeInTheDocument();
		expect(screen.queryByText('Ответ 2')).not.toBeInTheDocument();
	});
});
