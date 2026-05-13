import { Route, Routes, BrowserRouter } from 'react-router-dom';

import { AppRoute } from '../../constants';
import '../../global.module.scss';
import { useAppSelector } from '../../hooks/useStore';
import AboutPage from '../../pages/about-page/about-page';
import CakeArticlePage from '../../pages/cake-article-page/cake-article-page';
import CatalogPage from '../../pages/catalog-page/catalog-page';
import ContactsPage from '../../pages/contacts-page/contacts-page';
import DeliveryPage from '../../pages/delivery-page/delivery-page';
import FaqPage from '../../pages/faq-page/faq-page';
import MainPage from '../../pages/main-page/main-page';
import OrderRegistrationPage from '../../pages/order-registration-page/order-registration-page';
import RewievsPage from '../../pages/rewievs-page/rewievs-page';
import ShoppingCartPage from '../../pages/shopping-cart-page/shopping-cart-page';
import ThanksPage from '../../pages/thanks-page/thanks-page';
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
				<Route path={AppRoute.Root} element={<MainLayout />}>
					<Route
						index
						element={
							<MainPage
								cakes={cakeOffers}
								bentoCakes={bentoCakesffers}
							/>
						}
					/>
					<Route path={AppRoute.About} element={<AboutPage />} />
					<Route
						path={AppRoute.Catalog}
						element={
							<MainPage
								cakes={cakeOffers}
								bentoCakes={bentoCakesffers}
							/>
						}
					/>
					<Route
						path={AppRoute.CakesCatalog}
						element={<CatalogPage cakes={cakeOffers} />}
					/>
					<Route
						path={AppRoute.BentoCakesCatalog}
						element={<CatalogPage cakes={bentoCakesffers} />}
					/>
					<Route
						path={AppRoute.Delivery}
						element={<DeliveryPage />}
					/>
					<Route path={AppRoute.Faq} element={<FaqPage />} />
					<Route path={AppRoute.Reviews} element={<RewievsPage />} />
					<Route
						path={AppRoute.Contacts}
						element={<ContactsPage />}
					/>
				</Route>
				<Route
					path={AppRoute.CakeOfferArticle}
					element={<CakeArticlePage />}
				/>
				<Route
					path={AppRoute.ShoppingCart}
					element={<ShoppingCartPage />}
				/>
				<Route
					path={AppRoute.OrderRegistration}
					element={<OrderRegistrationPage />}
				/>
				<Route path={AppRoute.Thanks} element={<ThanksPage />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
