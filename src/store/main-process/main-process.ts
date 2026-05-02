import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { NameSpace } from '../../constants';
import { CakeOffer } from '../../types/types';

type InitialState = {
	totalPrice: number;
	activeOffer: CakeOffer | null;
};

const initialState: InitialState = {
	totalPrice: 0,
	activeOffer: null
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

		setActiveOffer: (state, action: PayloadAction<CakeOffer>) => {
			return {
				...state,
				activeOffer: action.payload
			};
		}
	},
	selectors: {
		selectTotalPrice: state => state.totalPrice,
		selectActiveOffer: state => state.activeOffer
	}
});

export const { setTotalPrice, setActiveOffer } = mainProcess.actions;
export const { selectTotalPrice } = mainProcess.selectors;
