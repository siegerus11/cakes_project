import { screen, render } from '@testing-library/react';
import { ReactElement } from 'react';

import ButtonController from './button-controller';

jest.mock('react-draggable', () => {
	const MockDraggable = ({ children }: { children: ReactElement }) => (
		<div>{children}</div>
	);
	return {
		__esModule: true,
		default: MockDraggable
	};
});

describe('Component: ButtonController', () => {
	it('should render children', () => {
		const expectedText = 'Test content';

		render(
			<ButtonController>
				<span>{expectedText}</span>
			</ButtonController>
		);

		expect(screen.getByText(expectedText)).toBeInTheDocument();
	});

	it('should render drag handle button', () => {
		const expectedAriaLabel = 'Переместить заказ';

		render(
			<ButtonController>
				<span>Content</span>
			</ButtonController>
		);

		expect(screen.getByLabelText(expectedAriaLabel)).toBeInTheDocument();
	});

	it('should apply outerClass to container', () => {
		const expectedClass = 'custom-class';

		render(
			<ButtonController outerClass={expectedClass}>
				<span>Content</span>
			</ButtonController>
		);

		const container =
			screen.getByLabelText('Переместить заказ').parentElement;

		expect(container?.className).toContain(expectedClass);
	});
});
