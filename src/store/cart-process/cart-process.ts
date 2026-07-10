import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { NameSpace, LoadingStatus } from '../../constants';
import { CakeOrder } from '../../types/types';
import { getDiscountAction } from '../api-actions';

export type CartProcessState = {
	shoppingCart: CakeOrder[];
	discountLoadingStatus: (typeof LoadingStatus)[keyof typeof LoadingStatus];
	discount: number;
	discountError: string | null;
};

const initialState: CartProcessState = {
	shoppingCart: [],
	discountLoadingStatus: LoadingStatus.Idle,
	discount: 0,
	discountError: null
};

export const cartProcess = createSlice({
	name: NameSpace.Cart,
	initialState,
	reducers: {
		addCartItem: (state, action: PayloadAction<CakeOrder>) => {
			const sameIndex = state.shoppingCart.findIndex(
				order => order.orderId === action.payload.orderId
			);
			if (sameIndex !== -1) {
				const updatedCart = state.shoppingCart.map((order, i) => {
					return i === sameIndex ? action.payload : order;
				});
				return {
					...state,
					shoppingCart: updatedCart
				};
			}

			const updatedCart = [...state.shoppingCart, action.payload];
			return {
				...state,
				shoppingCart: updatedCart
			};
		},
		setCartItemQuantity: (
			state,
			action: PayloadAction<{ id: string; num: number }>
		) => {
			const updatedCart = state.shoppingCart.map(order => {
				if (order.orderId === action.payload.id) {
					return {
						...order,
						quantity: Math.max(
							0,
							order.quantity + action.payload.num
						)
					};
				}
				return order;
			});
			return {
				...state,
				shoppingCart: updatedCart
			};
		},
		clearCart: state => {
			return {
				...state,
				shoppingCart: [],
				discount: 0,
				discountError: null,
				discountLoadingStatus: LoadingStatus.Idle
			};
		},
		removeCartItem: (state, action: PayloadAction<string>) => {
			const updatedCart = state.shoppingCart.filter(
				order => order.orderId !== action.payload
			);
			return {
				...state,
				shoppingCart: updatedCart
			};
		}
	},

	extraReducers(builder) {
		builder.addCase(getDiscountAction.pending, state => {
			return {
				...state,
				discountLoadingStatus: LoadingStatus.Loading,
				discountError: null
			};
		});
		builder.addCase(getDiscountAction.fulfilled, (state, action) => {
			const { discount } = action.payload;

			return {
				...state,
				discountLoadingStatus: LoadingStatus.Success,
				discount
			};
		});
		builder.addCase(getDiscountAction.rejected, (state, action) => {
			const errorMessage =
				action.payload === 'invalid_promo'
					? 'Неверный промокод'
					: action.error.message || '';

			return {
				...state,
				discountLoadingStatus: LoadingStatus.Failed,
				discountError: errorMessage
			};
		});
	},

	selectors: {
		selectShoppingCart: state => state.shoppingCart,
		selectOriginalSum: state =>
			state.shoppingCart.reduce(
				(sum, order) => sum + order.price * order.quantity,
				0
			),
		selectFinalSum: state => {
			const originalSum = state.shoppingCart.reduce(
				(sum, order) => sum + order.price * order.quantity,
				0
			);

			if (state.discount > 0) {
				return Math.round(originalSum * (1 - state.discount / 100));
			}

			return originalSum;
		},
		selectdiscountLoadingStatus: state => state.discountLoadingStatus,
		selectDiscount: state => state.discount,
		selectDiscountError: state => state.discountError
	}
});

export const cartProcessActions = { ...cartProcess.actions, getDiscountAction };

export const {
	selectShoppingCart,
	selectOriginalSum,
	selectFinalSum,
	selectdiscountLoadingStatus,
	selectDiscount,
	selectDiscountError
} = cartProcess.selectors;
export const cartProcessSelectors = {
	...cartProcess.selectors,
	selectFinalSum
};
