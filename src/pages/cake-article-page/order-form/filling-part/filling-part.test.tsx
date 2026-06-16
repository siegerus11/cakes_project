import { render, screen, fireEvent } from '@testing-library/react';

import makeFakeCakeOffer from '../../../../mocks/makeFakeOffer';
import { CakeOffer, CheckBoxValue, Filling } from '../../../../types/types';
import FillingPart from './filling-part';

const mockFillings: Filling[] = [
	{
		name: 'chocolate',
		title: 'Шоколадная',
		price: 500,
		description: 'Описание 1',
		isInclude: false,
		image: '/img1.jpg'
	},
	{
		name: 'vanilla',
		title: 'Ванильная',
		price: 400,
		description: 'Описание 2',
		isInclude: false,
		image: '/img2.jpg'
	},
	{
		name: 'strawberry',
		title: 'Клубничная',
		price: 600,
		description: 'Описание 3',
		isInclude: false,
		image: '/img3.jpg'
	}
];

const fakeOffer: CakeOffer = {
	...makeFakeCakeOffer(),
	filling: mockFillings
};

const mockCheckBoxValues: CheckBoxValue = {
	chocolate: false,
	vanilla: false,
	strawberry: false
};

describe('Component: FillingPart', () => {
	const mockOnCheckBoxChange = jest.fn();
	const mockOnDescribeClick = jest.fn();

	const renderFillingPart = (
		cake: CakeOffer = fakeOffer,
		checkBoxValues: CheckBoxValue = mockCheckBoxValues
	) => {
		return render(
			<FillingPart
				cake={cake}
				checkBoxValues={checkBoxValues}
				onCheckBoxChange={mockOnCheckBoxChange}
				onDescribeClick={mockOnDescribeClick}
			/>
		);
	};

	beforeEach(() => {
		mockOnCheckBoxChange.mockClear();
		mockOnDescribeClick.mockClear();
	});

	it('should render section title', () => {
		const expectedTitle = 'Начинка';

		renderFillingPart();

		expect(screen.getByText(expectedTitle)).toBeInTheDocument();
	});

	it('should render all fillings', () => {
		const expectedFillingsText = ['Шоколадная', 'Ванильная', 'Клубничная'];

		renderFillingPart();

		expect(screen.getByText(expectedFillingsText[0])).toBeInTheDocument();
		expect(screen.getByText(expectedFillingsText[1])).toBeInTheDocument();
		expect(screen.getByText(expectedFillingsText[2])).toBeInTheDocument();
	});

	it('should render checkbox for each filling', () => {
		renderFillingPart();
		const fillingLableTexts = [
			'Выбрать начинку: Шоколадная',
			'Выбрать начинку: Ванильная',
			'Выбрать начинку: Клубничная'
		];

		expect(screen.getByLabelText(fillingLableTexts[0])).toBeInTheDocument();
		expect(screen.getByLabelText(fillingLableTexts[1])).toBeInTheDocument();
		expect(screen.getByLabelText(fillingLableTexts[2])).toBeInTheDocument();
	});

	it('should render filling images', () => {
		renderFillingPart();

		const images = screen.getAllByRole('img');
		expect(images.length).toBe(3);
	});

	it('should render describe buttons', () => {
		renderFillingPart();

		const describeButtons = screen.getAllByText('описание');
		expect(describeButtons.length).toBe(3);
	});

	it('should call onCheckBoxChange when checkbox is clicked', () => {
		renderFillingPart();

		const checkbox = screen.getByLabelText('Выбрать начинку: Шоколадная');
		fireEvent.click(checkbox);

		expect(mockOnCheckBoxChange).toHaveBeenCalledTimes(1);
	});

	it('should call onDescribeClick when describe button is clicked', () => {
		const buttonText = 'описание';

		renderFillingPart();

		const describeButtons = screen.getAllByText(buttonText);
		fireEvent.click(describeButtons[0]);

		expect(mockOnDescribeClick).toHaveBeenCalledWith(0);
	});

	it('should call onDescribeClick with correct index for each filling', () => {
		const buttonText = 'описание';

		renderFillingPart();

		const describeButtons = screen.getAllByText(buttonText);

		fireEvent.click(describeButtons[1]);
		expect(mockOnDescribeClick).toHaveBeenCalledWith(1);

		fireEvent.click(describeButtons[2]);
		expect(mockOnDescribeClick).toHaveBeenCalledWith(2);
	});

	it('should render checked checkbox when value is true', () => {
		const checkedValues: CheckBoxValue = {
			chocolate: true,
			vanilla: false,
			strawberry: false
		};

		renderFillingPart(fakeOffer, checkedValues);

		const checkbox = screen.getByLabelText(
			'Выбрать начинку: Шоколадная'
		) as HTMLInputElement;
		expect(checkbox.checked).toBe(true);
	});

	it('should render unchecked checkbox when value is false', () => {
		const chechboxLabelText = 'Выбрать начинку: Шоколадная';

		renderFillingPart();

		const checkbox = screen.getByLabelText(
			chechboxLabelText
		) as HTMLInputElement;
		expect(checkbox.checked).toBe(false);
	});

	it('should render empty list when cake has no fillings', () => {
		const cakeWithoutFillings = { ...fakeOffer, filling: [] };

		renderFillingPart(cakeWithoutFillings);

		expect(screen.queryAllByRole('img').length).toBe(0);
	});
});
