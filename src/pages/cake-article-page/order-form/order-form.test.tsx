import { render, screen } from '@testing-library/react';
import { ReactNode } from 'react';

import makeFakeCakeOffer from '../../../mocks/makeFakeOffer';
import withHistory from '../../../mocks/withHistory';
import withStore from '../../../mocks/withStore';
import OrderForm from './order-form';

jest.mock('../../../hooks/useCheckBox', () => ({
	__esModule: true,
	default: () => [{}, jest.fn()]
}));

jest.mock('../../../hooks/useRadio', () => ({
	__esModule: true,
	default: () => [[], jest.fn()]
}));

jest.mock('../../../utils/createCheckboxInitial', () => ({
	__esModule: true,
	default: () => ({})
}));

jest.mock('../../../utils/createRadioInitial', () => ({
	__esModule: true,
	default: () => []
}));

jest.mock('../../../utils/getPriceByCheckboxValue', () => ({
	__esModule: true,
	default: () => []
}));

jest.mock('../../../utils/getPricesByRadioValue', () => ({
	__esModule: true,
	getPricesByRadioValue: () => []
}));

jest.mock('../../../utils/getPricesSum', () => ({
	__esModule: true,
	default: () => 3600
}));

jest.mock('uuid', () => ({
	__esModule: true,
	v4: () => 'test-uuid'
}));

jest.mock('./adder/adder', () => {
	const MockAdder = ({ priceCounter }: { priceCounter: number }) => (
		<div data-testid="adder">{priceCounter} ₽</div>
	);
	return { __esModule: true, default: MockAdder };
});

jest.mock('./filling-part/filling-part', () => {
	const MockFillingPart = () => <div data-testid="filling-part" />;
	return { __esModule: true, default: MockFillingPart };
});

jest.mock('./weight-part/weight-part', () => {
	const MockWeightPart = () => <div data-testid="weight-part" />;
	return { __esModule: true, default: MockWeightPart };
});

jest.mock('./optional-part/optional-part', () => {
	const MockOptionalPart = () => <div data-testid="optional-part" />;
	return { __esModule: true, default: MockOptionalPart };
});

jest.mock('../../../components/button-controller/button-controller', () => {
	const MockButtonController = ({ children }: { children: ReactNode }) => (
		<div data-testid="button-controller">{children}</div>
	);
	return { __esModule: true, default: MockButtonController };
});

jest.mock('../../../components/shopping-cart-item/shopping-cart-item', () => {
	const MockShoppingCartItem = ({ className }: { className: string }) => (
		<div data-testid="shopping-cart-item" className={className} />
	);
	return { __esModule: true, default: MockShoppingCartItem };
});

jest.mock('../../../components/ui/button/submit-button', () => {
	const MockSubmitButton = ({ children }: { children: ReactNode }) => (
		<button type="submit" data-testid="submit-button">
			{children}
		</button>
	);
	return { __esModule: true, default: MockSubmitButton };
});

describe('Component: OrderForm', () => {
	const mockOnDescribeClick = jest.fn();

	const fakeCake = makeFakeCakeOffer();

	const renderOrderForm = () => {
		const component = withHistory(
			<OrderForm
				cake={fakeCake}
				initialprice={3600}
				onDescribeClick={mockOnDescribeClick}
			/>
		);
		const { withStoreComponent } = withStore(component);
		return render(withStoreComponent);
	};

	it('should render form', () => {
		const { container } = renderOrderForm();

		expect(container.querySelector('form')).toBeInTheDocument();
	});

	it('should render form with correct id', () => {
		const orderFormId = 'order-form';

		const { container } = renderOrderForm();

		expect(container.querySelector('form')?.getAttribute('id')).toBe(
			orderFormId
		);
	});

	it('should render filling part', () => {
		const filingTestId = 'filling-part';

		renderOrderForm();

		expect(screen.getByTestId(filingTestId)).toBeInTheDocument();
	});

	it('should render weight part', () => {
		const weightTestId = 'weight-part';

		renderOrderForm();

		expect(screen.getByTestId(weightTestId)).toBeInTheDocument();
	});

	it('should render optional part', () => {
		const optionalPartTestId = 'optional-part';

		renderOrderForm();

		expect(screen.getByTestId(optionalPartTestId)).toBeInTheDocument();
	});

	it('should render two adders', () => {
		const addersTestId = 'adder';

		renderOrderForm();

		const adders = screen.getAllByTestId(addersTestId);
		expect(adders.length).toBe(2);
	});

	it('should render description section', () => {
		const expectedDescriptionText = 'description';

		renderOrderForm();

		expect(screen.getByText(expectedDescriptionText)).toBeInTheDocument();
	});

	it('should render button controller', () => {
		const buttonControllerTestId = 'button-controller';

		renderOrderForm();

		expect(screen.getByTestId(buttonControllerTestId)).toBeInTheDocument();
	});

	it('should render submit button', () => {
		const submitButtonTestId = 'submit-button';

		renderOrderForm();

		expect(screen.getByTestId(submitButtonTestId)).toBeInTheDocument();
	});

	it('should render shopping cart item in controller', () => {
		const shoppingCartItemTestId = 'shopping-cart-item';

		renderOrderForm();

		expect(screen.getByTestId(shoppingCartItemTestId)).toBeInTheDocument();
	});

	it('should render hide description button', () => {
		const expectedAriaLabel = 'Показать описание';

		renderOrderForm();

		expect(screen.getByLabelText(expectedAriaLabel)).toBeInTheDocument();
	});
});
