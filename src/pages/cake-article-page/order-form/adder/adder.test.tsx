import { render, screen } from '@testing-library/react';

import getFormattedPrice from '../../../../utils/getFormattedPrice';
import Adder from './adder';

describe('Component: Adder', () => {
	const renderAdder = ({
		priceCounter = getFormattedPrice(3600),
		isWrapped = false,
		formId = 'test-form'
	}: {
		priceCounter?: string;
		isWrapped?: boolean;
		formId?: string;
	} = {}) => {
		return render(
			<Adder
				priceCounter={priceCounter}
				isWrapped={isWrapped}
				formId={formId}
			/>
		);
	};

	it('should render formatted price', () => {
		const expectedPrice = /3\s?600\s?₽/;

		renderAdder();

		expect(screen.getByText(expectedPrice)).toBeInTheDocument();
	});

	it('should render submit button', () => {
		const expectedLabel = 'Добавить в корзину';

		renderAdder();

		expect(screen.getByText(expectedLabel)).toBeInTheDocument();
	});

	it('should pass formId to submit button', () => {
		const expectedFormId = 'order-form';

		renderAdder({ formId: expectedFormId });

		const button = screen.getByLabelText('Добавить в корзину');
		expect(button.getAttribute('form')).toBe(expectedFormId);
	});

	it('should render with different prices', () => {
		const expectedPrice = /5\s?200\s?₽/;

		renderAdder({ priceCounter: getFormattedPrice(5200) });

		expect(screen.getByText(expectedPrice)).toBeInTheDocument();
	});
});
