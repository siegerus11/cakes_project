import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { NameSpace } from '../../constants';

type InitialState = {
	totalPrice: number;
};

const initialState: InitialState = {
	totalPrice: 0
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
		}
	},
	selectors: {
		selectTotalPrice: state => state.totalPrice
	}
});

export const { setTotalPrice } = mainProcess.actions;
export const { selectTotalPrice } = mainProcess.selectors;
