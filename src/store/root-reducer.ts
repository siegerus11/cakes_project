import { combineReducers } from '@reduxjs/toolkit';

import { NameSpace } from '../constants';
import { cakeOffersData } from './cake-offers-data/cake-offers-data';

export const rootReducer = combineReducers({
	[NameSpace.Data]: cakeOffersData.reducer
});
