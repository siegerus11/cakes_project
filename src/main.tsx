import 'leaflet/dist/leaflet.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import App from './components/app/app';
import store from './store';
import { cakeOffersDataActions } from './store/cake-offers-data/cake-offers-data';

store.dispatch(cakeOffersDataActions.fetchOffersAction());

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	// <React.StrictMode>
	<BrowserRouter
		future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
	>
		<Provider store={store}>
			<App />
		</Provider>
	</BrowserRouter>

	// </React.StrictMode>
);
