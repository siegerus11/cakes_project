import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { NameSpace } from '../../constants';

type InitialState = {
	totalPrice: number;
	activeOffer: string;
	sortingStatus: string;
};

const initialState: InitialState = {
	totalPrice: 0,
	activeOffer: '',
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
		selectSortingStatus: state => state.sortingStatus
	}
});

export const {
	setTotalPrice,
	setActiveOffer,
	getSortingStatus
} = mainProcess.actions;

export const {
	selectTotalPrice,
	selectActiveOffer,
	selectSortingStatus
} = mainProcess.selectors;
