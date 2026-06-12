import { createAction } from '@reduxjs/toolkit';

import { LoadingStatus } from '../../constants';
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
			cartProcessActions.setShoppingCart(fakeOrder)
		);

		expect(result).toEqual(expectedState);
	});
});
