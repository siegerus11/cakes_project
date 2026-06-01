import { createSlice } from '@reduxjs/toolkit';

import { NameSpace, LoadingStatus } from '../../constants';
import { CakeOffer } from '../../types/types';
import { fetchOffersAction } from '../api-actions';

type InitialState = {
	cakeOffers: CakeOffer[];
	offersLoadingStatus: (typeof LoadingStatus)[keyof typeof LoadingStatus];
};

const initialState: InitialState = {
	cakeOffers: [],
	offersLoadingStatus: LoadingStatus.Idle
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
			});
	},
	selectors: {
		selectCakeOffers: state => state.cakeOffers,
		selectOffersLoadingStatus: state => state.offersLoadingStatus
	}
});

export const { selectCakeOffers, selectOffersLoadingStatus } =
	cakeOffersData.selectors;
