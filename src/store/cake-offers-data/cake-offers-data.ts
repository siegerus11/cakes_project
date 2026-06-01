import { createSlice } from '@reduxjs/toolkit';

import { NameSpace } from '../../constants';
import cakeOffers from '../../mocks/cake-offers/cake-offers';
import { CakeOffer } from '../../types/types';
import { fetchOffersAction } from '../api-actions';

type InitialState = {
	cakeOffers: CakeOffer[];
};

const initialState: InitialState = {
	cakeOffers
};

export const cakeOffersData = createSlice({
	name: NameSpace.Data,
	initialState,
	reducers: {},
	selectors: {
		selectCakeOffers: state => state.cakeOffers
	}
});

export const { selectCakeOffers } = cakeOffersData.selectors;
