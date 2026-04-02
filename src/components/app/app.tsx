import React from 'react';
import { Route, Routes } from 'react-router-dom';

import '../../global.module.scss';
import './app.module.scss';

import { AppRoute } from '../../constants';
import { cakeOffers } from '../../mocks/cake-offers/cake-offers';

import MainLayout from '../layout/main-layout';

import MainPage from '../../pages/main-page/main-page';
import AboutPage from '../../pages/about-page/about-page';
import CatalogPage from '../../pages/catalog-page/catalog-page';
import DeliveryPage from '../../pages/delivery-page/delivery-page';
import FaqPage from '../../pages/faq-page/faq-page';
import RewievsPage from '../../pages/rewievs-page/rewievs-page';
import ContactsPage from '../../pages/contacts-page/contacts-page';

function App() {
	const bentoCakes = cakeOffers.filter(cake => cake.isBento === true);
	return (
		<Routes>
			<Route path={AppRoute.ROOT} element={<MainLayout />}>
				<Route
					index
					element={
						<MainPage cakes={cakeOffers} bentoCakes={bentoCakes} />
					}
				/>
				<Route path={AppRoute.ABOUT} element={<AboutPage />} />
				<Route
					path={AppRoute.CATALOG}
					element={
						<MainPage cakes={cakeOffers} bentoCakes={bentoCakes} />
					}
				/>
				<Route path={AppRoute.DELIVERY} element={<DeliveryPage />} />
				<Route path={AppRoute.FAQ} element={<FaqPage />} />
				<Route path={AppRoute.REVIEWS} element={<RewievsPage />} />
				<Route path={AppRoute.CONTACTS} element={<ContactsPage />} />
			</Route>
		</Routes>
	);
}

export default App;
