import { screen, render, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { NameSpace } from '../../../constants';
import makeFakeCakeOffer from '../../../mocks/makeFakeOffer';
import withHistory from '../../../mocks/withHistory';
import withStore from '../../../mocks/withStore';
import { CakeOffer } from '../../../types/types';
import SearchComponent from './search';

describe('Component: SearchComponent', () => {
	const fakeCake = makeFakeCakeOffer();

	const mockCakes: CakeOffer[] = [
		{ ...fakeCake, id: '1', title: 'Шоколадный торт', isBento: false },
		{ ...fakeCake, id: '2', title: 'Ванильный бенто', isBento: true },
		{ ...fakeCake, id: '3', title: 'Клубничный торт', isBento: false }
	];

	const renderSearch = (cakes: CakeOffer[] = mockCakes) => {
		const componentWithHistory = withHistory(<SearchComponent />);
		const { withStoreComponent } = withStore(componentWithHistory, {
			[NameSpace.Data]: {
				cakeOffers: cakes,
				offersLoadingStatus: 'Success',
				orderSendingStatus: 'Idle'
			}
		});
		return render(withStoreComponent);
	};

	it('should render search input', () => {
		const expectedPlaceholder = 'Поиск';
		const expectedLabel = 'Поиск по товарам';

		renderSearch();

		const input = screen.getByPlaceholderText(expectedPlaceholder);
		expect(input).toBeInTheDocument();
		expect(input).toHaveAttribute('type', 'search');
		expect(screen.getByLabelText(expectedLabel)).toBeInTheDocument();
	});

	it('should update input value on type', async () => {
		const expectedValue = 'Шоколад';
		const user = userEvent.setup();

		renderSearch();

		const input = screen.getByPlaceholderText('Поиск');
		await user.type(input, expectedValue);

		expect(input).toHaveValue(expectedValue);
	});

	it('should dispatch setSearchQuerry after debounce', async () => {
		const expectedValue = 'торт';
		jest.useFakeTimers();
		const user = userEvent.setup({
			advanceTimers: jest.advanceTimersByTime
		});

		renderSearch();

		const input = screen.getByPlaceholderText('Поиск');
		await user.type(input, expectedValue);

		jest.advanceTimersByTime(500);

		await waitFor(() => {
			const inputAfter = screen.getByPlaceholderText('Поиск');
			expect(inputAfter).toHaveValue(expectedValue);
		});

		jest.useRealTimers();
	});

	it('should navigate to CakesCatalog when matching non-bento cake', async () => {
		const expectedQuerry = 'Шоколад';
		jest.useFakeTimers();
		const user = userEvent.setup({
			advanceTimers: jest.advanceTimersByTime
		});

		const componentWithHistory = withHistory(<SearchComponent />, '/');
		const { withStoreComponent, mockStore } = withStore(
			componentWithHistory,
			{
				[NameSpace.Data]: {
					cakeOffers: mockCakes,
					offersLoadingStatus: 'Success',
					orderSendingStatus: 'Idle'
				}
			}
		);

		render(withStoreComponent);

		const input = screen.getByPlaceholderText('Поиск');
		await user.type(input, expectedQuerry);

		jest.advanceTimersByTime(500);

		await waitFor(() => {
			const { searchQuerry } = mockStore.getState()[NameSpace.Main];
			expect(searchQuerry).toBe(expectedQuerry);
		});

		jest.useRealTimers();
	});

	it('should navigate to BentoCakesCatalog when matching bento cake', async () => {
		const expectedQuerry = 'Бенто';
		jest.useFakeTimers();
		const user = userEvent.setup({
			advanceTimers: jest.advanceTimersByTime
		});

		const bentoOnlyCakes: CakeOffer[] = [
			{ ...fakeCake, id: '1', title: 'Бенто ванильный', isBento: true },
			{ ...fakeCake, id: '2', title: 'Бенто шоколадный', isBento: true }
		];

		const componentWithHistory = withHistory(<SearchComponent />, '/');
		const { withStoreComponent, mockStore } = withStore(
			componentWithHistory,
			{
				[NameSpace.Data]: {
					cakeOffers: bentoOnlyCakes,
					offersLoadingStatus: 'Success',
					orderSendingStatus: 'Idle'
				}
			}
		);

		render(withStoreComponent);

		const input = screen.getByPlaceholderText('Поиск');
		await user.type(input, expectedQuerry);

		jest.advanceTimersByTime(500);

		await waitFor(() => {
			const { searchQuerry } = mockStore.getState()[NameSpace.Main];
			expect(searchQuerry).toBe(expectedQuerry);
		});

		jest.useRealTimers();
	});

	it('should not navigate when search query is empty', async () => {
		const expectedValue = '';
		jest.useFakeTimers();
		const user = userEvent.setup({
			advanceTimers: jest.advanceTimersByTime
		});

		renderSearch();

		const input = screen.getByPlaceholderText('Поиск');
		fireEvent.change(input, { target: { value: expectedValue } });

		jest.advanceTimersByTime(500);

		await waitFor(() => {
			expect(input).toHaveValue(expectedValue);
		});

		jest.useRealTimers();
	});

	it('should not navigate when no cakes match', async () => {
		const expectedValue = 'НесуществующийТорт';
		jest.useFakeTimers();
		const user = userEvent.setup({
			advanceTimers: jest.advanceTimersByTime
		});

		renderSearch();

		const input = screen.getByPlaceholderText('Поиск');
		await user.type(input, expectedValue);

		jest.advanceTimersByTime(500);

		await waitFor(() => {
			expect(input).toHaveValue(expectedValue);
		});

		jest.useRealTimers();
	});
});
