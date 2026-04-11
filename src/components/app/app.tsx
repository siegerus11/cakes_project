import { Route, Routes, BrowserRouter } from 'react-router-dom';

import { AppRoute } from '../../constants';
import '../../global.module.scss';
import { useAppSelector } from '../../hooks/store';
import AboutPage from '../../pages/about-page/about-page';
import CakeArticlePage from '../../pages/cake-article-page/cake-article-page';
import CatalogPage from '../../pages/catalog-page/catalog-page';
import ContactsPage from '../../pages/contacts-page/contacts-page';
import DeliveryPage from '../../pages/delivery-page/delivery-page';
import FaqPage from '../../pages/faq-page/faq-page';
import MainPage from '../../pages/main-page/main-page';
import RewievsPage from '../../pages/rewievs-page/rewievs-page';
import { cakeOffersSelector } from '../../store/cake-offers-data/cake-offers-data';
import MainLayout from '../layout/main-layout';
import './app.module.scss';

function App() {
	const cakeOffers = useAppSelector(cakeOffersSelector);
	const bentoCakesffers = cakeOffers.filter(cake => cake.isBento === true);

	return (
		<BrowserRouter
			future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
		>
			<Routes>
				<Route path={AppRoute.ROOT} element={<MainLayout />}>
					<Route
						index
						element={
							<MainPage
								cakes={cakeOffers}
								bentoCakes={bentoCakesffers}
							/>
						}
					/>
					<Route path={AppRoute.ABOUT} element={<AboutPage />} />
					<Route
						path={AppRoute.CATALOG}
						element={
							<MainPage
								cakes={cakeOffers}
								bentoCakes={bentoCakesffers}
							/>
						}
					/>
					<Route
						path={AppRoute.CAKES_CATALOG}
						element={<CatalogPage cakes={cakeOffers} />}
					/>
					<Route
						path={AppRoute.BENTO_CAKES_CATALOG}
						element={<CatalogPage cakes={bentoCakesffers} />}
					/>
					<Route
						path={AppRoute.DELIVERY}
						element={<DeliveryPage />}
					/>
					<Route path={AppRoute.FAQ} element={<FaqPage />} />
					<Route path={AppRoute.REVIEWS} element={<RewievsPage />} />
					<Route
						path={AppRoute.CONTACTS}
						element={<ContactsPage />}
					/>
				</Route>
				<Route
					path={AppRoute.CAKE_OFFER_ARTICLE}
					element={<CakeArticlePage />}
				/>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
