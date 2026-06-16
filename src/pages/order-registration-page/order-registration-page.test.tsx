import { render, screen } from '@testing-library/react';

import { NameSpace, LoadingStatus } from '../../constants';
import withHistory from '../../mocks/withHistory';
import withStore from '../../mocks/withStore';
import OrderRegistrationPage from './order-registration-page';

jest.mock('./form/form', () => {
	const MockForm = () => (
		<form data-testid="form">
			<input name="name" />
		</form>
	);
	return { __esModule: true, default: MockForm };
});

describe('Component: OrderRegistrationPage', () => {
	const renderOrderRegistrationPage = () => {
		const component = withHistory(<OrderRegistrationPage />);
		const { withStoreComponent } = withStore(component, {
			[NameSpace.Cart]: {
				shoppingCart: [],
				discountLoadingStatus: LoadingStatus.Idle
			}
		});
		return render(withStoreComponent);
	};

	it('should render page title', () => {
		const expectedTitle = 'Оформление заказа';

		renderOrderRegistrationPage();

		expect(screen.getByText(expectedTitle)).toBeInTheDocument();
	});

	it('should render back button', () => {
		const expectedAriaLabel = 'Назад';

		renderOrderRegistrationPage();

		expect(screen.getByLabelText(expectedAriaLabel)).toBeInTheDocument();
	});

	it('should render form', () => {
		renderOrderRegistrationPage();

		expect(screen.getByTestId('form')).toBeInTheDocument();
	});

	it('should render submit button', () => {
		const expectedLabel = 'Оформить заказ';

		renderOrderRegistrationPage();

		expect(screen.getByText(expectedLabel)).toBeInTheDocument();
	});
});
