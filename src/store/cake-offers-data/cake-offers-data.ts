import { createSlice } from '@reduxjs/toolkit';

import { NameSpace, LoadingStatus } from '../../constants';
import { CakeOffer } from '../../types/types';
import { fetchOffersAction, sendOrderAction } from '../api-actions';

type InitialState = {
	cakeOffers: CakeOffer[];
	offersLoadingStatus: (typeof LoadingStatus)[keyof typeof LoadingStatus];
	orderSendingStatus: (typeof LoadingStatus)[keyof typeof LoadingStatus];
};

const initialState: InitialState = {
	cakeOffers: [],
	offersLoadingStatus: LoadingStatus.Idle,
	orderSendingStatus: LoadingStatus.Idle
};

export const cakeOffersData = createSlice({
	name: NameSpace.Data,
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder
			.addCase(fetchOffersAction.pending, state => {
				return {
					...state,
					offersLoadingStatus: LoadingStatus.Loading
				};
			})
			.addCase(fetchOffersAction.fulfilled, (state, action) => {
				return {
					...state,
					cakeOffers: action.payload,
					offersLoadingStatus: LoadingStatus.Success
				};
			})
			.addCase(fetchOffersAction.rejected, state => {
				return {
					...state,
					offersLoadingStatus: LoadingStatus.Failed
				};
			})
			.addCase(sendOrderAction.pending, state => {
				return {
					...state,
					orderSendingStatus: LoadingStatus.Loading
				};
			})
			.addCase(sendOrderAction.fulfilled, state => {
				return {
					...state,
					orderSendingStatus: LoadingStatus.Success
				};
			})
			.addCase(sendOrderAction.rejected, state => {
				return {
					...state,
					orderSendingStatus: LoadingStatus.Failed
				};
			});
	},
	selectors: {
		selectCakeOffers: state => state.cakeOffers,
		selectOffersLoadingStatus: state => state.offersLoadingStatus
	}
});

export const cakeOffersDataActions = {
	...cakeOffersData.actions,
	fetchOffersAction,
	sendOrderAction
};

export const { selectCakeOffers, selectOffersLoadingStatus } =
	cakeOffersData.selectors;
