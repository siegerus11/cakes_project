import { createAction } from '@reduxjs/toolkit';

import { LoadingStatus, discoundValue } from '../../constants';
import makeFakeOrder from '../../mocks/makeFakeOrder';
import { cartProcess, cartProcessActions } from './cart-process';

describe('Cart-proecss slice', () => {
	it('Should return initialState with empty action', () => {
		const emptyAction = { type: '' };
		const expectedState = {
			shoppingCart: [makeFakeOrder()],
			discountLoadingStatus: LoadingStatus.Idle
		};

		const result = cartProcess.reducer(expectedState, emptyAction);

		expect(result).toEqual(expectedState);
	});

	it('Should return default initial state with empty action and undefined state', () => {
		const emptyAction = { type: '' };
		const expectedState = {
			shoppingCart: [],
			discountLoadingStatus: LoadingStatus.Idle
		};

		const result = cartProcess.reducer(undefined, emptyAction);

		expect(result).toEqual(expectedState);
	});

	it('Should return state with discountLoadingStatus: Loading', () => {
		const expectedState = {
			shoppingCart: [],
			discountLoadingStatus: LoadingStatus.Loading
		};

		const getDiscountActionPending = createAction(
			'cart/getDiscount/pending'
		);
		const result = cartProcess.reducer(
			expectedState,
			getDiscountActionPending()
		);

		expect(result).toEqual(expectedState);
	});

	it('Should return state with discountLoadingStatus: Success and discounted orders', () => {
		const discountedOrder = {
			...makeFakeOrder(),
			price: Math.round(makeFakeOrder().price * (1 - discoundValue / 100))
		};
		const initialState = {
			shoppingCart: Array.from({ length: 3 }, makeFakeOrder),
			discountLoadingStatus: LoadingStatus.Idle
		};
		const expectedState = {
			shoppingCart: [discountedOrder, discountedOrder, discountedOrder],
			discountLoadingStatus: LoadingStatus.Success
		};

		const result = cartProcess.reducer(
			initialState,
			cartProcessActions.getDiscountAction.fulfilled(
				undefined,
				'',
				'code'
			)
		);

		expect(result).toEqual(expectedState);
	});

	it('Should return state with discountLoadingStatus: Failed', () => {
		const expectedState = {
			shoppingCart: [],
			discountLoadingStatus: LoadingStatus.Failed
		};

		const getDiscountActionRejected = createAction(
			'cart/getDiscount/rejected'
		);
		const result = cartProcess.reducer(
			expectedState,
			getDiscountActionRejected()
		);

		expect(result).toEqual(expectedState);
	});

	it('Should return state with order', () => {
		const fakeOrder = makeFakeOrder();
		const initialState = {
			shoppingCart: [],
			discountLoadingStatus: LoadingStatus.Idle
		};
		const expectedState = {
			shoppingCart: [fakeOrder],
			discountLoadingStatus: LoadingStatus.Idle
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
			discountLoadingStatus: LoadingStatus.Idle
		};
		const expectedState = {
			shoppingCart: [incremenedFakeOrder],
			discountLoadingStatus: LoadingStatus.Idle
		};

		const result = cartProcess.reducer(
			initialState,
			cartProcessActions.setCartItemQuantity({
				id: fakeOrder.cakeId,
				num: 1
			})
		);

		expect(result).toEqual(expectedState);
	});

	it('Should return state with empty cart', () => {
		const initialState = {
			shoppingCart: Array.from({ length: 3 }, makeFakeOrder),
			discountLoadingStatus: LoadingStatus.Idle
		};
		const expectedState = {
			shoppingCart: [],
			discountLoadingStatus: LoadingStatus.Idle
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
			cakeId: 'targetId'
		};
		const initialState = {
			shoppingCart: [makeFakeOrder(), expectDetetedOrder],
			discountLoadingStatus: LoadingStatus.Idle
		};
		const expectedState = {
			shoppingCart: [makeFakeOrder()],
			discountLoadingStatus: LoadingStatus.Idle
		};

		const result = cartProcess.reducer(
			initialState,
			cartProcessActions.removeCartItem('targetId')
		);

		expect(result).toEqual(expectedState);
	});
});
