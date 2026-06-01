import { createSlice } from '@reduxjs/toolkit';

import { NameSpace } from '../../constants';
import { CakeOffer } from '../../types/types';
import { fetchOffersAction } from '../api-actions';

type InitialState = {
	cakeOffers: CakeOffer[];
};

const initialState: InitialState = {
	cakeOffers: []
};

export const cakeOffersData = createSlice({
	name: NameSpace.Data,
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder.addCase(fetchOffersAction.fulfilled, (state, action) => {
			return {
				...state,
				cakeOffers: action.payload
			};
		});
	},
	selectors: {
		selectCakeOffers: state => state.cakeOffers
	}
});

export const { selectCakeOffers } = cakeOffersData.selectors;
