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
			console.log(current(state));
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
		}
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
	getSortingStatus
} = mainProcess.actions;
export const {
	selectTotalPrice,
	selectActiveOffer,
	selectShoppingCart,
	selelectSortingStatus
} = mainProcess.selectors;
