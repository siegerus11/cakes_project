import { combineReducers } from '@reduxjs/toolkit';

import { NameSpace } from '../constants';
import { cakeOffersData } from './cake-offers-data/cake-offers-data';
import { cartProcess } from './cart-process/cart-process';
import { mainProcess } from './main-process/main-process';

const rootReducer = combineReducers({
	[NameSpace.Data]: cakeOffersData.reducer,
	[NameSpace.Main]: mainProcess.reducer,
	[NameSpace.Cart]: cartProcess.reducer
});

export default rootReducer;
