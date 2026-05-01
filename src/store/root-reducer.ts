import { combineReducers } from '@reduxjs/toolkit';

import { NameSpace } from '../constants';
import { cakeOffersData } from './cake-offers-data/cake-offers-data';
import { mainProcess } from './main-process/main-process';

const rootReducer = combineReducers({
	[NameSpace.Data]: cakeOffersData.reducer,
	[NameSpace.Main]: mainProcess.reducer
});

export default rootReducer;
