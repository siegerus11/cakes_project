import { render, screen } from '@testing-library/react';
import { ReactNode } from 'react';

import SubmitButton from './submit-button';

describe('Component: SubmitButton', () => {
	const expectedChildrenText = 'Submit';

	const renderSubmitButton = ({
		className = 'test-submit',
		label,
		formId,
		isDisabled = false,
		children = expectedChildrenText
	}: {
		className?: string;
		label?: string;
		formId?: string;
		isDisabled?: boolean;
		children?: ReactNode;
	} = {}) =>
		render(
			<SubmitButton
				className={className}
				label={label}
				formId={formId}
				isDisabled={isDisabled}
			>
				{children}
			</SubmitButton>
		);

	it('should render submit button', () => {
		renderSubmitButton();

		const button = screen.getByRole('button');

		expect(button).toBeInTheDocument();
		expect(button.textContent).toBe(expectedChildrenText);
	});

	it('should set type="submit"', () => {
		renderSubmitButton();

		expect(screen.getByRole('button').getAttribute('type')).toBe('submit');
	});

	it('should apply className', () => {
		const expectedClassName = 'submit-class';

		renderSubmitButton({ className: expectedClassName });

		expect(screen.getByRole('button').className).toBe(expectedClassName);
	});

	it('should apply aria-label', () => {
		const expectedLabelText = 'send';

		renderSubmitButton({ label: expectedLabelText });

		expect(screen.getByLabelText(expectedLabelText)).toBeInTheDocument();
	});

	it('should set form attribute when formId is provided', () => {
		const expectedFormId = 'my-form';

		renderSubmitButton({ formId: expectedFormId });

		expect(screen.getByRole('button').getAttribute('form')).toBe(
			expectedFormId
		);
	});

	it('should be disabled when isDisabled is true', () => {
		renderSubmitButton({ isDisabled: true });

		expect(screen.getByRole('button')).toBeDisabled();
	});

	it('should be enabled by default', () => {
		renderSubmitButton();

		expect(screen.getByRole('button')).not.toBeDisabled();
	});
});
