import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { NameSpace, startingPrice } from '../../constants';

type InitialState = {
	totalPrice: number;
};

const initialState: InitialState = {
	totalPrice: startingPrice
};

export const mainProcess = createSlice({
	name: NameSpace.Main,
	initialState,
	reducers: {
		setTotalPrice: (state, action: PayloadAction<number>) => {
			return {
				...state,
				totalPrice: state.totalPrice + action.payload
			};
		}
	},
	selectors: {
		selectTotalPrice: state => state.totalPrice
	}
});

export const { setTotalPrice } = mainProcess.actions;
export const { selectTotalPrice } = mainProcess.selectors;
