import { render, screen, fireEvent } from '@testing-library/react';

import { Radio } from '../../../../types/types';
import WeightPart from './weight-part';

const mockRadios: Radio[] = [
	{ weightValue: 1.5, isChecked: true },
	{ weightValue: 3, isChecked: false },
	{ weightValue: 5, isChecked: false }
];

describe('Component: WeightPart', () => {
	const mockOnRadioChange = jest.fn();

	const renderWeightPart = (radios: Radio[] = mockRadios) => {
		return render(
			<WeightPart radios={radios} onRadioChange={mockOnRadioChange} />
		);
	};

	beforeEach(() => {
		mockOnRadioChange.mockClear();
	});

	it('should render section title', () => {
		const expectedTitle = 'Вес';

		renderWeightPart();

		expect(screen.getByText(expectedTitle)).toBeInTheDocument();
	});

	it('should render interactor button with active weight', () => {
		const expectedText = /1\.5 кг/;

		renderWeightPart();

		expect(screen.getByText(expectedText)).toBeInTheDocument();
	});

	it('should render interactor button with correct aria attributes', () => {
		const expectedAriaLabel = 'Выберите вес торта';

		renderWeightPart();

		const button = screen.getByLabelText(expectedAriaLabel);
		expect(button).toBeInTheDocument();
		expect(button.getAttribute('aria-expanded')).toBe('false');
	});

	it('should open dropdown when interactor is clicked', () => {
		const expectedAriaLabel = 'Выберите вес торта';

		renderWeightPart();

		const button = screen.getByLabelText(expectedAriaLabel);
		fireEvent.click(button);

		expect(button.getAttribute('aria-expanded')).toBe('true');
	});

	it('should close dropdown when interactor is clicked again', () => {
		const expectedAriaLabel = 'Выберите вес торта';

		renderWeightPart();

		const button = screen.getByLabelText(expectedAriaLabel);
		fireEvent.click(button);
		fireEvent.click(button);

		expect(button.getAttribute('aria-expanded')).toBe('false');
	});

	it('should render radio options when dropdown is open', () => {
		const expectedAriaLabel = 'Выберите вес торта';

		renderWeightPart();

		const button = screen.getByLabelText(expectedAriaLabel);
		fireEvent.click(button);

		const radiogroup = screen.getByRole('radiogroup');
		expect(radiogroup).toBeInTheDocument();
	});

	it('should render all radio options', () => {
		const expectedAriaLabel = 'Выберите вес торта';

		renderWeightPart();

		const button = screen.getByLabelText(expectedAriaLabel);
		fireEvent.click(button);

		const radios = screen.getAllByRole('radio');
		expect(radios.length).toBe(3);
	});

	it('should call onRadioChange when radio is clicked', () => {
		const expectedAriaLabel = 'Выберите вес торта';

		renderWeightPart();

		const button = screen.getByLabelText(expectedAriaLabel);
		fireEvent.click(button);

		const radios = screen.getAllByRole('radio');
		fireEvent.click(radios[1]);

		expect(mockOnRadioChange).toHaveBeenCalledTimes(1);
	});

	it('should not render dropdown initially', () => {
		renderWeightPart();

		expect(screen.queryByRole('radiogroup')).not.toBeInTheDocument();
	});

	it('should update interactor text when different radio is selected', () => {
		const { rerender } = renderWeightPart();

		const updatedRadios: Radio[] = [
			{ weightValue: 1.5, isChecked: false },
			{ weightValue: 3, isChecked: true },
			{ weightValue: 5, isChecked: false }
		];

		rerender(
			<WeightPart
				radios={updatedRadios}
				onRadioChange={mockOnRadioChange}
			/>
		);

		expect(screen.getByText(/3 кг/)).toBeInTheDocument();
	});
});
