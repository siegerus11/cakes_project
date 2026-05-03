import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { NameSpace } from '../../constants';
import { CakeOrder } from '../../types/types';

type InitialState = {
	totalPrice: number;
	activeOffer: string;
	shoppingCart: CakeOrder[];
};

const initialState: InitialState = {
	totalPrice: 0,
	activeOffer: '',
	shoppingCart: []
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
		}
	},
	selectors: {
		selectTotalPrice: state => state.totalPrice,
		selectActiveOffer: state => state.activeOffer,
		selectShoppingCart: state => state.shoppingCart
	}
});

export const { setTotalPrice, setActiveOffer, setShoppingCart } =
	mainProcess.actions;
export const { selectTotalPrice, selectActiveOffer, selectShoppingCart } =
	mainProcess.selectors;
