import { createSlice, PayloadAction, current } from '@reduxjs/toolkit';

import { NameSpace } from '../../constants';
import { CakeOrder } from '../../types/types';

type InitialState = {
	totalPrice: number;
	activeOffer: string;
	shoppingCart: CakeOrder[];
	sortingStatus: string;
	finalSum: number;
};

const initialState: InitialState = {
	totalPrice: 0,
	activeOffer: '',
	shoppingCart: [],
	sortingStatus: '',
	finalSum: 0
};

export const mainProcess = createSlice({
	name: NameSpace.Main,
	initialState,
	reducers: {
		setTotalPrice: (state, action: PayloadAction<number>) => {
			return {
				...state,
				totalPrice: action.payload
			};
		},

		setActiveOffer: (state, action: PayloadAction<string>) => {
			return {
				...state,
				activeOffer: action.payload
			};
		},
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
		getSortingStatus: (state, action: PayloadAction<string>) => {
			return {
				...state,
				sortingStatus: action.payload
			};
		},
		resetSortingStatus: state => {
			return {
				...state,
				sortingStatus: ''
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
		selectTotalPrice: state => state.totalPrice,
		selectActiveOffer: state => state.activeOffer,
		selectShoppingCart: state => state.shoppingCart,
		selelectSortingStatus: state => state.sortingStatus,
		selectFinalSum: state => state.finalSum
	}
});

export const {
	setTotalPrice,
	setActiveOffer,
	setShoppingCart,
	getSortingStatus,
	setCartQuantity,
	clearCart,
	removeCartItem,
	resetSortingStatus
} = mainProcess.actions;
export const {
	selectTotalPrice,
	selectActiveOffer,
	selectShoppingCart,
	selelectSortingStatus,
	selectFinalSum
} = mainProcess.selectors;
