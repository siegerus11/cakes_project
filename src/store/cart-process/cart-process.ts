import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { NameSpace } from '../../constants';
import { CakeOrder } from '../../types/types';

type CartProcess = {
	shoppingCart: CakeOrder[];
	finalSum: number;
};

const initialState: CartProcess = {
	shoppingCart: [],
	finalSum: 0
};

export const cartProcess = createSlice({
	name: NameSpace.Cart,
	initialState,
	reducers: {
		setShoppingCart: (state, action: PayloadAction<CakeOrder>) => {
			const updatedCart = [...state.shoppingCart, action.payload];
			return {
				...state,
				shoppingCart: updatedCart,
				finalSum: updatedCart.reduce(
					(sum, order) => sum + order.price * order.quantity,
					0
				)
			};
		},
		setCartQuantity: (
			state,
			action: PayloadAction<{ id: string; num: number }>
		) => {
			const updatedCart = state.shoppingCart.map(order => {
				if (order.cakeId === action.payload.id) {
					return {
						...order,
						quantity:
							order.quantity + action.payload.num ||
							order.quantity
					};
				}
				return order;
			});
			return {
				...state,
				shoppingCart: updatedCart,
				finalSum: updatedCart.reduce(
					(sum, order) => sum + order.price * order.quantity,
					0
				)
			};
		},
		clearCart: state => {
			return {
				...state,
				shoppingCart: [],
				finalSum: 0
			};
		},
		removeCartItem: (state, action: PayloadAction<string>) => {
			const updatedCart = state.shoppingCart.filter(
				order => order.cakeId !== action.payload
			);
			return {
				...state,
				shoppingCart: updatedCart,
				finalSum: updatedCart.reduce(
					(sum, order) => sum + order.price * order.quantity,
					0
				)
			};
		}
	},

	selectors: {
		selectShoppingCart: state => state.shoppingCart,
		selectFinalSum: state => state.finalSum
	}
});

export const {
	setShoppingCart,
	setCartQuantity,
	clearCart,
	removeCartItem
} = cartProcess.actions;

export const { selectShoppingCart, selectFinalSum } = cartProcess.selectors;
