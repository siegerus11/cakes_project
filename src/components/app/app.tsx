import { useEffect } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Route, Routes, useLocation } from 'react-router-dom';

import { AppRoute } from '../../constants';
import '../../global.module.scss';
import { useAppSelector, useActionCreators } from '../../hooks/useStore';
import AboutPage from '../../pages/about-page/about-page';
import CakeArticlePage from '../../pages/cake-article-page/cake-article-page';
import CatalogPage from '../../pages/catalog-page/catalog-page';
import ContactsPage from '../../pages/contacts-page/contacts-page';
import DeliveryPage from '../../pages/delivery-page/delivery-page';
import MainPage from '../../pages/main-page/main-page';
import NotFoundPage, {
	ErrorFallbackComponent
} from '../../pages/not-found-page/not-found-page';
import OrderRegistrationPage from '../../pages/order-registration-page/order-registration-page';
import ShoppingCartPage from '../../pages/shopping-cart-page/shopping-cart-page';
import ThanksPage from '../../pages/thanks-page/thanks-page';
import { selectCakeOffers } from '../../store/cake-offers-data/cake-offers-data';
import {
	selectShoppingCart,
	cartProcessActions
} from '../../store/cart-process/cart-process';
import { CakeOrder } from '../../types/types';
import getStorageCartValues from '../../utils/getStorageCartValues';
import MainLayout from '../layout/main-layout';
import './app.module.scss';

function App() {
	const location = useLocation();

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [location.pathname]);

	const cakeOffers = useAppSelector(selectCakeOffers);
	const bentoCakesOffers = cakeOffers.filter(cake => cake.isBento === true);
	const { addCartItem } = useActionCreators(cartProcessActions);
	const shoppingCart = useAppSelector(selectShoppingCart);

	useEffect(() => {
		if (typeof window === 'undefined') return;

		const storageValues = getStorageCartValues().filter(
			(item: CakeOrder) =>
				!shoppingCart.some(order => order.orderId === item.orderId)
		);

		storageValues.forEach(item => {
			addCartItem(item);
		});
	}, [addCartItem, shoppingCart]);

	return (
		<ErrorBoundary FallbackComponent={ErrorFallbackComponent}>
			<Routes>
				<Route path={AppRoute.Root} element={<MainLayout />}>
					<Route
						index
						element={
							<MainPage
								cakes={cakeOffers}
								bentoCakes={bentoCakesOffers}
							/>
						}
					/>
					<Route path={AppRoute.About} element={<AboutPage />} />
					<Route
						path={AppRoute.Catalog}
						element={
							<MainPage
								cakes={cakeOffers}
								bentoCakes={bentoCakesOffers}
							/>
						}
					/>
					<Route
						path={AppRoute.CakesCatalog}
						element={
							<CatalogPage
								cakes={{ cakeOffers, bentoCakesOffers }}
							/>
						}
					/>
					<Route
						path={AppRoute.BentoCakesCatalog}
						element={
							<CatalogPage
								bentoCatalog
								cakes={{ cakeOffers, bentoCakesOffers }}
							/>
						}
					/>
					<Route
						path={AppRoute.Search}
						element={
							<CatalogPage
								cakes={{ cakeOffers, bentoCakesOffers }}
								searchPage
							/>
						}
					/>
					<Route
						path={AppRoute.Delivery}
						element={<DeliveryPage />}
					/>
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

				<Route path="*" element={<NotFoundPage />} />
			</Routes>
		</ErrorBoundary>
	);
}

export default App;
