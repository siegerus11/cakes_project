import 'leaflet/dist/leaflet.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import App from './components/app/app';
import store from './store';
import { cakeOffersDataActions } from './store/cake-offers-data/cake-offers-data';

store.dispatch(cakeOffersDataActions.fetchOffersAction());

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>
);
