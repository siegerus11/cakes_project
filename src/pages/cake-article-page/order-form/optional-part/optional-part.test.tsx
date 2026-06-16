import { render, screen, fireEvent } from '@testing-library/react';

import makeFakeCakeOffer from '../../../../mocks/makeFakeOffer';
import { CakeOffer, CheckBoxValue, Optional } from '../../../../types/types';
import OptionalPart from './optional-part';

const mockOptionally: Optional[] = [
	{
		name: 'berries',
		title: 'Ягоды',
		price: 300,
		isInclude: false,
		image: '/img1.jpg'
	},
	{
		name: 'nuts',
		title: 'Орехи',
		price: 200,
		isInclude: false,
		image: '/img2.jpg'
	},
	{
		name: 'chocolate',
		title: 'Шоколадная крошка',
		price: 150,
		isInclude: false,
		image: '/img3.jpg'
	}
];

const fakeOffer: CakeOffer = {
	...makeFakeCakeOffer(),
	optionally: mockOptionally
};

const mockCheckBoxValues: CheckBoxValue = {
	berries: false,
	nuts: false,
	chocolate: false
};

describe('Component: OptionalPart', () => {
	const mockOnCheckBoxChange = jest.fn();

	const renderOptionalPart = (
		cake: CakeOffer = fakeOffer,
		checkBoxValues: CheckBoxValue = mockCheckBoxValues
	) => {
		return render(
			<OptionalPart
				cake={cake}
				checkBoxValues={checkBoxValues}
				onCheckBoxChange={mockOnCheckBoxChange}
			/>
		);
	};

	beforeEach(() => {
		mockOnCheckBoxChange.mockClear();
	});

	it('should render section title', () => {
		const expectedTitle = 'Дополнительно';

		renderOptionalPart();

		expect(screen.getByText(expectedTitle)).toBeInTheDocument();
	});

	it('should render all optional items', () => {
		const expectedOptionalItemsText = [
			'Ягоды',
			'Орехи',
			'Шоколадная крошка'
		];

		renderOptionalPart();

		expect(
			screen.getByText(expectedOptionalItemsText[0])
		).toBeInTheDocument();
		expect(
			screen.getByText(expectedOptionalItemsText[1])
		).toBeInTheDocument();
		expect(
			screen.getByText(expectedOptionalItemsText[2])
		).toBeInTheDocument();
	});

	it('should render checkbox for each optional item', () => {
		const expectedOptionalLabelsText = [
			'Дополнительно: Ягоды, цена +300 ₽',
			'Дополнительно: Орехи, цена +200 ₽',
			'Дополнительно: Шоколадная крошка, цена +150 ₽'
		];

		renderOptionalPart();

		expect(
			screen.getByLabelText(expectedOptionalLabelsText[0])
		).toBeInTheDocument();
		expect(
			screen.getByLabelText(expectedOptionalLabelsText[1])
		).toBeInTheDocument();
		expect(
			screen.getByLabelText(expectedOptionalLabelsText[2])
		).toBeInTheDocument();
	});

	it('should render optional images', () => {
		renderOptionalPart();

		const images = screen.getAllByRole('img');
		expect(images.length).toBe(3);
	});

	it('should render prices', () => {
		const pricesText = ['+300 ₽', '+200 ₽', '+150 ₽'];

		renderOptionalPart();

		expect(screen.getByText(pricesText[0])).toBeInTheDocument();
		expect(screen.getByText(pricesText[1])).toBeInTheDocument();
		expect(screen.getByText(pricesText[2])).toBeInTheDocument();
	});

	it('should call onCheckBoxChange when checkbox is clicked', () => {
		const checkboxLabelText = 'Дополнительно: Ягоды, цена +300 ₽';

		renderOptionalPart();

		const checkbox = screen.getByLabelText(checkboxLabelText);
		fireEvent.click(checkbox);

		expect(mockOnCheckBoxChange).toHaveBeenCalledTimes(1);
	});

	it('should render checked checkbox when value is true', () => {
		const checkboxLabelText = 'Дополнительно: Ягоды, цена +300 ₽';
		const checkedValues: CheckBoxValue = {
			berries: true,
			nuts: false,
			chocolate: false
		};

		renderOptionalPart(fakeOffer, checkedValues);

		const checkbox = screen.getByLabelText(
			checkboxLabelText
		) as HTMLInputElement;
		expect(checkbox.checked).toBe(true);
	});

	it('should render unchecked checkbox when value is false', () => {
		const checkboxLabelText = 'Дополнительно: Ягоды, цена +300 ₽';

		renderOptionalPart();

		const checkbox = screen.getByLabelText(
			checkboxLabelText
		) as HTMLInputElement;
		expect(checkbox.checked).toBe(false);
	});

	it('should render empty list when cake has no optional items', () => {
		const cakeWithoutOptional = { ...fakeOffer, optionally: [] };

		renderOptionalPart(cakeWithoutOptional);

		expect(screen.queryAllByRole('img').length).toBe(0);
	});

	it('should apply small font class for long titles', () => {
		const longTitleOption: Optional[] = [
			{
				name: 'long',
				title: 'Очень длинное название, которое содержит много символов',
				price: 100,
				isInclude: false,
				image: '/img.jpg'
			}
		];
		const cakeWithLongTitle = { ...fakeOffer, optionally: longTitleOption };

		renderOptionalPart(cakeWithLongTitle);

		expect(screen.getByText(/Очень длинное название/)).toBeInTheDocument();
	});
});
