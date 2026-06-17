import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { NameSpace, LoadingStatus, discoundValue } from '../../constants';
import { CakeOrder } from '../../types/types';
import { getDiscountAction } from '../api-actions';

export type CartProcessState = {
	shoppingCart: CakeOrder[];
	discountLoadingStatus: (typeof LoadingStatus)[keyof typeof LoadingStatus];
};

const initialState: CartProcessState = {
	shoppingCart: [],
	discountLoadingStatus: LoadingStatus.Idle
};

export const cartProcess = createSlice({
	name: NameSpace.Cart,
	initialState,
	reducers: {
		addCartItem: (state, action: PayloadAction<CakeOrder>) => {
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
				shoppingCart: []
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
				discountLoadingStatus: LoadingStatus.Loading
			};
		});
		builder.addCase(getDiscountAction.fulfilled, state => {
			return {
				...state,
				discountLoadingStatus: LoadingStatus.Success,
				shoppingCart: state.shoppingCart.map(order => {
					return {
						...order,
						price: Math.round(
							order.price * (1 - discoundValue / 100)
						)
					};
				})
			};
		});
		builder.addCase(getDiscountAction.rejected, state => {
			return {
				...state,
				discountLoadingStatus: LoadingStatus.Failed
			};
		});
	},

	selectors: {
		selectShoppingCart: state => state.shoppingCart,
		selectFinalSum: state =>
			state.shoppingCart.reduce(
				(sum, order) => sum + order.price * order.quantity,
				0
			),
		selectdiscountLoadingStatus: state => state.discountLoadingStatus
	}
});

export const cartProcessActions = { ...cartProcess.actions, getDiscountAction };

export const {
	selectShoppingCart,
	selectFinalSum,
	selectdiscountLoadingStatus
} = cartProcess.selectors;
