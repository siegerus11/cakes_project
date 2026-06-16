import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import withHistory from '../../../mocks/withHistory';
import Form from './form';

describe('Component: Form', () => {
	const handleSubmit = jest.fn();

	beforeEach(() => {
		handleSubmit.mockClear();
	});

	const renderForm = () => {
		const componentWithHistory = withHistory(
			<Form onSubmit={handleSubmit} />
		);
		return render(componentWithHistory);
	};

	it('Should render correctly', () => {
		const formTestId = 'order-registration-form';
		const submitButtonText = 'Оформить заказ';
		const namePlaceholderText = 'Имя';
		const phonePlaceholderText = 'Телефон';
		const adressPlaceholderText = 'Адрес';

		renderForm();

		expect(screen.getByTestId(formTestId)).toBeInTheDocument();
		expect(
			screen.getByText(/Доставка курьером по Москве/i)
		).toBeInTheDocument();
		expect(
			screen.getByPlaceholderText(namePlaceholderText)
		).toBeInTheDocument();
		expect(
			screen.getByPlaceholderText(phonePlaceholderText)
		).toBeInTheDocument();
		expect(
			screen.getByPlaceholderText(adressPlaceholderText)
		).toBeInTheDocument();
		expect(screen.getByText(submitButtonText)).toBeInTheDocument();
	});

	it('Should render correctly when user enters name', async () => {
		const expectedUserName = 'Alex';

		renderForm();

		await userEvent.type(
			screen.getByPlaceholderText('Имя'),
			expectedUserName
		);

		expect(screen.getByDisplayValue(expectedUserName)).toBeInTheDocument();
	});

	it('Should toggle comment textarea when clicking area button', async () => {
		const textAreaRole = 'textbox';
		const addButtonText = 'Добавить комментарий';

		renderForm();

		expect(
			screen.queryByRole(textAreaRole, { name: /comment/i })
		).not.toBeInTheDocument();

		await userEvent.click(screen.getByText(addButtonText));

		expect(
			screen.getByRole(textAreaRole, { name: /comment/i })
		).toBeInTheDocument();
	});

	it('Should call onSubmit with form values when all required fields are filled', async () => {
		const submitButtonText = 'Оформить заказ';
		const namePlaceholderText = 'Имя';
		const phonePlaceholderText = 'Телефон';
		const adressPlaceholderText = 'Адрес';

		const expectedFormValues = {
			name: 'Alex',
			phone: '+79991234567',
			address: 'ул. Ленина, 1',
			comment: ''
		};

		renderForm();

		await userEvent.type(
			screen.getByPlaceholderText(namePlaceholderText),
			expectedFormValues.name
		);
		await userEvent.type(
			screen.getByPlaceholderText(phonePlaceholderText),
			expectedFormValues.phone
		);
		await userEvent.type(
			screen.getByPlaceholderText(adressPlaceholderText),
			expectedFormValues.address
		);

		await userEvent.click(screen.getByText(submitButtonText));

		expect(handleSubmit).toHaveBeenCalledTimes(1);
		expect(handleSubmit).toHaveBeenCalledWith(expectedFormValues);
	});

	it('Should not call onSubmit when required fields are empty', async () => {
		const submitButtonText = 'Оформить заказ';

		renderForm();

		await userEvent.click(screen.getByText(submitButtonText));

		expect(handleSubmit).not.toHaveBeenCalled();
	});
});
