import { combineReducers, configureStore, Store } from '@reduxjs/toolkit';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { ReactElement } from 'react';
import { Provider } from 'react-redux';

import { NameSpace } from '../constants';
import { cakeOffersData } from '../store/cake-offers-data/cake-offers-data';
import { cartProcess } from '../store/cart-process/cart-process';
import { mainProcess } from '../store/main-process/main-process';
import { State } from '../types/store';

type ComponentWithMockStore = {
	withStoreComponent: ReactElement;
	mockStore: Store;
	mockAxiosAdapter: MockAdapter;
};

export default function withStore(
	component: ReactElement
): ComponentWithMockStore {
	const api = axios.create({
		baseURL: '../../mock-api',
		timeout: 5000
	});
	const mockAxiosAdapter = new MockAdapter(api);
	const mockRootReducer = combineReducers({
		[NameSpace.Data]: cakeOffersData.reducer,
		[NameSpace.Main]: mainProcess.reducer,
		[NameSpace.Cart]: cartProcess.reducer
	});
	const mockStore = configureStore({
		reducer: mockRootReducer,
		middleware: getDefaultMiddleware =>
			getDefaultMiddleware({
				thunk: {
					extraArgument: api
				}
			})
	});
	return {
		withStoreComponent: <Provider store={mockStore}>{component}</Provider>,
		mockStore,
		mockAxiosAdapter
	};
}
