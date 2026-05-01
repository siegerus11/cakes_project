import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { NameSpace, startingPrice } from '../../constants';

type InitialState = {
	totalPrice: number[];
};

const initialState: InitialState = {
	totalPrice: [startingPrice]
};

export const mainProcess = createSlice({
	name: NameSpace.Main,
	initialState,
	reducers: {
		changeTotalPrice: (state, action: PayloadAction<number>) => {
			state.totalPrice = [...state.totalPrice, action.payload];
		}
	},
	selectors: {
		selectTotalPrice: state => state.totalPrice
	}
});

export const { selectTotalPrice } = mainProcess.selectors;
