import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { NameSpace } from '../../constants';

export type mainProcessState = {
	totalPrice: number;
	activeOffer: string;
	sortingStatus: string;
	errorText: string;
};

const initialState: mainProcessState = {
	totalPrice: 0,
	activeOffer: '',
	sortingStatus: '',
	errorText: ''
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
		getSortingStatus: (state, action: PayloadAction<string>) => {
			return {
				...state,
				sortingStatus: action.payload
			};
		},
		setError: (state, action: PayloadAction<string>) => {
			return {
				...state,
				errorText: action.payload
			};
		}
	},

	selectors: {
		selectTotalPrice: state => state.totalPrice,
		selectActiveOffer: state => state.activeOffer,
		selectSortingStatus: state => state.sortingStatus,
		selectErrorMessage: state => state.errorText
	}
});

export const mainProcessActions = { ...mainProcess.actions };

export const {
	selectTotalPrice,
	selectActiveOffer,
	selectSortingStatus,
	selectErrorMessage
} = mainProcess.selectors;
