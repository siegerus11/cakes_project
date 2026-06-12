import { combineReducers, configureStore } from '@reduxjs/toolkit';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import { NameSpace, APIRoute, LoadingStatus } from '../constants';
import makeFakeOffer from '../mocks/makeFakeOffer';
import { fetchOffersAction } from './api-actions';
import { cakeOffersData } from './cake-offers-data/cake-offers-data';
import { cartProcess } from './cart-process/cart-process';
import { mainProcess } from './main-process/main-process';

const api = axios.create({
	baseURL: '../../mock-api',
	timeout: 5000
});

describe('Thunk api actions', () => {
	const mockAxiosAdapter = new MockAdapter(api);

	const mockRootReducer = combineReducers({
		[NameSpace.Data]: cakeOffersData.reducer,
		[NameSpace.Main]: mainProcess.reducer,
		[NameSpace.Cart]: cartProcess.reducer
	});

	const mockStore = configureStore({
		reducer: mockRootReducer,
		middleware: getDefaultMiddleware =>
			getDefaultMiddleware({
				thunk: {
					extraArgument: api
				}
			})
	});

	afterEach(() => {
		mockAxiosAdapter.reset();
	});

	describe('data/fetchOffers action', () => {
		it('Should dispatch data/fetchOffers.pending and data/fetchOffers.fulfilled', async () => {
			const mockOffers = Array.from({ length: 3 }, makeFakeOffer);
			mockAxiosAdapter.onGet(APIRoute.offers).reply(200, mockOffers);

			const dispatchPromise = mockStore.dispatch(fetchOffersAction());

			expect(
				mockStore.getState()[NameSpace.Data].offersLoadingStatus
			).toBe(LoadingStatus.Loading);

			const result = await dispatchPromise;

			expect(result.type).toBe('data/fetchOffers/fulfilled');
			expect(result.payload).toEqual(mockOffers);
			expect(
				mockStore.getState()[NameSpace.Data].offersLoadingStatus
			).toBe(LoadingStatus.Success);
		});

		it('Should dispatch data/fetchOffers.rejected on network error', async () => {
			mockAxiosAdapter.onGet(APIRoute.offers).reply(400);

			const result = await mockStore.dispatch(fetchOffersAction());

			expect(result.type).toBe('data/fetchOffers/rejected');
			expect(
				mockStore.getState()[NameSpace.Data].offersLoadingStatus
			).toBe(LoadingStatus.Failed);
		});
	});
});
