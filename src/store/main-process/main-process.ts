import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { NameSpace } from '../../constants';

type InitialState = {
	totalPrice: number;
	activeOffer: string;
	sortingStatus: string;
	errorText: string;
};

const initialState: InitialState = {
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
		selectErrorText: state => state.errorText
	}
});

export const { setTotalPrice, setActiveOffer, getSortingStatus, setError } =
	mainProcess.actions;

export const {
	selectTotalPrice,
	selectActiveOffer,
	selectSortingStatus,
	selectErrorText
} = mainProcess.selectors;
