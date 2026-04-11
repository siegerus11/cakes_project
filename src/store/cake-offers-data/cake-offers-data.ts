import { createSlice } from '@reduxjs/toolkit';

import { NameSpace } from '../../constants';
import { cakeOffers } from '../../mocks/cake-offers/cake-offers';
import { CakeOffer } from '../../types/types';

type InitialState = {
	cakeOffers: CakeOffer[];
};

const initialState: InitialState = {
	cakeOffers: cakeOffers
};

export const cakeOffersData = createSlice({
	name: NameSpace.Data,
	initialState,
	reducers: {},
	selectors: {
		cakeOffersSelector: state => state.cakeOffers
	}
});

export const { cakeOffersSelector } = cakeOffersData.selectors;
