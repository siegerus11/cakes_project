import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { NameSpace } from '../../constants';

export type mainProcessState = {
	totalPrice: number;
	activeOffer: string;
	sortingStatus: string;
	searchQuerry: string;
	errorText: string;
};

const initialState: mainProcessState = {
	totalPrice: 0,
	activeOffer: '',
	sortingStatus: '',
	searchQuerry: '',
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

		setSearchQuerry: (state, action: PayloadAction<string>) => {
			return {
				...state,
				searchQuerry: action.payload
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
		selectSearchQuerry: state => state.searchQuerry,
		selectErrorMessage: state => state.errorText
	}
});

export const mainProcessActions = { ...mainProcess.actions };

export const {
	selectTotalPrice,
	selectActiveOffer,
	selectSortingStatus,
	selectSearchQuerry,
	selectErrorMessage
} = mainProcess.selectors;
