import { createSlice, PayloadAction, current } from '@reduxjs/toolkit';

import { NameSpace } from '../../constants';
import { CakeOrder } from '../../types/types';

type InitialState = {
	totalPrice: number;
	activeOffer: string;
	shoppingCart: CakeOrder[];
	sortingStatus: string;
};

const initialState: InitialState = {
	totalPrice: 0,
	activeOffer: '',
	shoppingCart: [],
	sortingStatus: ''
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
			return {
				...state,
				shoppingCart: [...state.shoppingCart, action.payload]
			};
		},
		getSortingStatus: (state, action: PayloadAction<string>) => {
			return {
				...state,
				sortingStatus: action.payload
			};
		},
		clearCart: state => {
			return {
				...state,
				shoppingCart: []
			};
		},
		setCartQuantity: (
			state,
			action: PayloadAction<{ id: string; num: number }>
		) => {
			console.log(current(state));
			return {
				...state,
				shoppingCart: state.shoppingCart.map(order => {
					if (order.cakeId === action.payload.id) {
						return {
							...order,
							quantity:
								order.quantity + action.payload.num ||
								order.quantity
						};
					}
					return order;
				})
			};
		}
		// decreaseQuantity: (state, action: PayloadAction<string>) => {
		// 	return {
		// 		...state,
		// 		shoppingCart: state.shoppingCart.map(order => {
		// 			if (order.cakeId === action.payload) {
		// 				return {
		// 					...order,
		// 					quantity: order.quantity - 1
		// 				};
		// 			}
		// 			return order;
		// 		})
		// 	};
		// }
	},

	selectors: {
		selectTotalPrice: state => state.totalPrice,
		selectActiveOffer: state => state.activeOffer,
		selectShoppingCart: state => state.shoppingCart,
		selelectSortingStatus: state => state.sortingStatus
	}
});

export const {
	setTotalPrice,
	setActiveOffer,
	setShoppingCart,
	getSortingStatus,
	setCartQuantity
} = mainProcess.actions;
export const {
	selectTotalPrice,
	selectActiveOffer,
	selectShoppingCart,
	selelectSortingStatus
} = mainProcess.selectors;
