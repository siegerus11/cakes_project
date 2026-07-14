import { combineReducers, configureStore } from '@reduxjs/toolkit';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import { NameSpace, APIRoute, LoadingStatus } from '../constants';
import makeFakeOffer from '../mocks/makeFakeOffer';
import makeFakeOrder from '../mocks/makeFakeOrder';
import {
	fetchOffersAction,
	sendOrderAction,
	getDiscountAction
} from './api-actions';
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

	let store: typeof mockStore;

	afterEach(() => {
		mockAxiosAdapter.reset();
	});

	beforeEach(() => {
		store = configureStore({
			reducer: mockRootReducer,
			middleware: getDefaultMiddleware =>
				getDefaultMiddleware({
					thunk: {
						extraArgument: api
					}
				})
		});
	});

	describe('data/fetchOffers action', () => {
		it('Should dispatch data/fetchOffers.pending and data/fetchOffers.fulfilled', async () => {
			const mockOffers = Array.from({ length: 3 }, makeFakeOffer);
			mockAxiosAdapter.onGet(APIRoute.offers).reply(200, mockOffers);

			const dispatchPromise = store.dispatch(fetchOffersAction());

			expect(store.getState()[NameSpace.Data].offersLoadingStatus).toBe(
				LoadingStatus.Loading
			);

			const result = await dispatchPromise;

			expect(result.type).toBe(fetchOffersAction.fulfilled.type);
			expect(result.payload).toEqual(mockOffers);
			expect(store.getState()[NameSpace.Data].offersLoadingStatus).toBe(
				LoadingStatus.Success
			);
		});

		it('Should dispatch data/fetchOffers.rejected on network error', async () => {
			mockAxiosAdapter.onGet(APIRoute.offers).reply(400);

			const result = await store.dispatch(fetchOffersAction());

			expect(result.type).toBe(fetchOffersAction.rejected.type);
			expect(store.getState()[NameSpace.Data].offersLoadingStatus).toBe(
				LoadingStatus.Failed
			);
		});
	});

	describe('cart/sendOrder action', () => {
		it('Should dispatch cart/sendOrder.pending and cart/sendOrder.fulfilled', async () => {
			const fakeOrder = {
				shoppingCart: [makeFakeOrder()],
				userData: {
					name: 'name',
					phone: 'phone',
					address: 'address',
					comment: 'comment'
				},
				finalSum: 1000
			};
			mockAxiosAdapter.onPost(APIRoute.order).reply(200, fakeOrder);

			const dispatchedPromise = store.dispatch(
				sendOrderAction(fakeOrder)
			);

			expect(store.getState()[NameSpace.Data].orderSendingStatus).toBe(
				LoadingStatus.Loading
			);

			const result = await dispatchedPromise;

			expect(result.type).toBe(sendOrderAction.fulfilled.type);
			expect(result.meta.arg).toEqual(fakeOrder);
		});
	});

	describe('cart/getDiscount action', () => {
		it('Should dispatch cart/getDiscount.pending and cart/getDiscount.fulfilled', async () => {
			const promoCode = 'PROMO15';
			mockAxiosAdapter.onPost(APIRoute.promoCode).reply(200, {
				valid: true,
				discount: 15,
				discountedSum: 3060
			});

			const dispatchPromise = store.dispatch(
				getDiscountAction(promoCode)
			);

			expect(store.getState()[NameSpace.Cart].discountLoadingStatus).toBe(
				LoadingStatus.Loading
			);

			const result = await dispatchPromise;

			expect(result.type).toBe(getDiscountAction.fulfilled.type);
			expect(result.meta.arg).toBe(promoCode);
			expect(store.getState()[NameSpace.Cart].discountLoadingStatus).toBe(
				LoadingStatus.Success
			);
		});

		it('Should dispatch cart/getDiscount.rejected on network error', async () => {
			const promoCode = 'INVALID';
			mockAxiosAdapter.onPost(APIRoute.promoCode).reply(400);

			const result = await store.dispatch(getDiscountAction(promoCode));

			expect(result.type).toBe(getDiscountAction.rejected.type);
			expect(store.getState()[NameSpace.Cart].discountLoadingStatus).toBe(
				LoadingStatus.Failed
			);
		});

		it('Should dispatch cart/getDiscount.rejected with invalid_promo on 400 with valid: false', async () => {
			const promoCode = 'INVALID_PROMO';
			mockAxiosAdapter.onPost(APIRoute.promoCode).reply(400, {
				valid: false,
				message: 'Неверный промокод'
			});

			const result = await store.dispatch(getDiscountAction(promoCode));

			expect(result.type).toBe(getDiscountAction.rejected.type);
			expect(result.payload).toBe('invalid_promo');
			expect(store.getState()[NameSpace.Cart].discountError).toBe('Неверный промокод');
			expect(store.getState()[NameSpace.Cart].discountLoadingStatus).toBe(
				LoadingStatus.Failed
			);
		});
	});
});
