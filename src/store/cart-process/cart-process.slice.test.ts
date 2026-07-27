import { createAction } from '@reduxjs/toolkit';

import { LoadingStatus } from '../../constants';
import makeFakeOrder from '../../mocks/makeFakeOrder';
import { cartProcess, cartProcessActions } from './cart-process';

describe('Cart-proecss slice', () => {
	it('Should return initialState with empty action', () => {
		const emptyAction = { type: '' };
		const expectedState = {
			shoppingCart: [makeFakeOrder()],
			discountLoadingStatus: LoadingStatus.Idle,
			discount: 0,
			discountError: null
		};

		const result = cartProcess.reducer(expectedState, emptyAction);

		expect(result).toEqual(expectedState);
	});

	it('Should return default initial state with empty action and undefined state', () => {
		const emptyAction = { type: '' };
		const expectedState = {
			shoppingCart: [],
			discountLoadingStatus: LoadingStatus.Idle,
			discount: 0,
			discountError: null
		};

		const result = cartProcess.reducer(undefined, emptyAction);

		expect(result).toEqual(expectedState);
	});

	it('Should return state with discountLoadingStatus: Loading', () => {
		const expectedState = {
			shoppingCart: [],
			discountLoadingStatus: LoadingStatus.Loading,
			discount: 0,
			discountError: null
		};

		const getDiscountActionPending = createAction<void>(
			'cart/getDiscount/pending'
		);
		const result = cartProcess.reducer(
			expectedState,
			getDiscountActionPending()
		);

		expect(result).toEqual(expectedState);
	});

	it('Should return state with discountLoadingStatus: Success and discount value', () => {
		const fakeOrder = makeFakeOrder();
		const initialState = {
			shoppingCart: [fakeOrder],
			discountLoadingStatus: LoadingStatus.Idle,
			discount: 0,
			discountError: null
		};
		const expectedState = {
			shoppingCart: [fakeOrder],
			discountLoadingStatus: LoadingStatus.Success,
			discount: 15,
			discountError: null
		};

		const result = cartProcess.reducer(
			initialState,
			cartProcessActions.getDiscountAction.fulfilled(
				{ discount: 15, discountedSum: 3060 },
				'code',
				'requestId'
			)
		);

		expect(result).toEqual(expectedState);
	});

	it('Should return state with discountLoadingStatus: Failed', () => {
		const initialState = {
			shoppingCart: [],
			discountLoadingStatus: LoadingStatus.Idle,
			discount: 0,
			discountError: null
		};
		const expectedState = {
			shoppingCart: [],
			discountLoadingStatus: LoadingStatus.Failed,
			discount: 0,
			discountError: 'Неверный промокод'
		};

		const getDiscountActionRejected = createAction<string>(
			'cart/getDiscount/rejected'
		);
		const result = cartProcess.reducer(
			initialState,
			getDiscountActionRejected('invalid_promo')
		);

		expect(result).toEqual(expectedState);
	});

	it('Should return state with order', () => {
		const fakeOrder = makeFakeOrder();
		const initialState = {
			shoppingCart: [],
			discountLoadingStatus: LoadingStatus.Idle,
			discount: 0,
			discountError: null
		};
		const expectedState = {
			shoppingCart: [fakeOrder],
			discountLoadingStatus: LoadingStatus.Idle,
			discount: 0,
			discountError: null
		};

		const result = cartProcess.reducer(
			initialState,
			cartProcessActions.addCartItem(fakeOrder)
		);

		expect(result).toEqual(expectedState);
	});
	it('Should return state with incremented order', () => {
		const fakeOrder = makeFakeOrder();
		const incremenedFakeOrder = {
			...fakeOrder,
			quantity: 2
		};
		const initialState = {
			shoppingCart: [fakeOrder],
			discountLoadingStatus: LoadingStatus.Idle,
			discount: 0,
			discountError: null
		};
		const expectedState = {
			shoppingCart: [incremenedFakeOrder],
			discountLoadingStatus: LoadingStatus.Idle,
			discount: 0,
			discountError: null
		};

		const result = cartProcess.reducer(
			initialState,
			cartProcessActions.setCartItemQuantity({
				id: fakeOrder.orderId,
				num: 1
			})
		);

		expect(result).toEqual(expectedState);
	});

	it('Should return state with empty cart', () => {
		const initialState = {
			shoppingCart: Array.from({ length: 3 }, makeFakeOrder),
			discountLoadingStatus: LoadingStatus.Idle,
			discount: 15,
			discountError: null
		};
		const expectedState = {
			shoppingCart: [],
			discountLoadingStatus: LoadingStatus.Idle,
			discount: 0,
			discountError: null
		};

		const result = cartProcess.reducer(
			initialState,
			cartProcessActions.clearCart()
		);

		expect(result).toEqual(expectedState);
	});

	it('Should return state with with one deleted order', () => {
		const expectDetetedOrder = {
			...makeFakeOrder(),
			orderId: 'targetId'
		};
		const initialState = {
			shoppingCart: [makeFakeOrder(), expectDetetedOrder],
			discountLoadingStatus: LoadingStatus.Idle,
			discount: 0,
			discountError: null
		};
		const expectedState = {
			shoppingCart: [makeFakeOrder()],
			discountLoadingStatus: LoadingStatus.Idle,
			discount: 0,
			discountError: null
		};

		const result = cartProcess.reducer(
			initialState,
			cartProcessActions.removeCartItem('targetId')
		);

		expect(result).toEqual(expectedState);
	});
});
