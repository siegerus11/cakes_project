import { useEffect, lazy, Suspense, ComponentProps } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Route, Routes, useLocation } from 'react-router-dom';

import { AppRoute } from '../../constants';
import '../../global.module.scss';
import { useAppSelector, useActionCreators } from '../../hooks/useStore';
import MainPage from '../../pages/main-page/main-page';
import { ErrorFallbackComponent } from '../../pages/not-found-page/not-found-page';
import { selectCakeOffers } from '../../store/cake-offers-data/cake-offers-data';
import {
	selectShoppingCart,
	cartProcessActions
} from '../../store/cart-process/cart-process';
import { CakeOrder } from '../../types/types';
import getStorageCartValues from '../../utils/getStorageCartValues';
import MainLayout from '../layout/main-layout';
import Loader from '../loader/loader';
import PageSkeleton from '../page-skeleton/page-skeleton';
import './app.module.scss';

const AboutPage = lazy(() => import('../../pages/about-page/about-page'));
const CakeArticlePage = lazy(
	() => import('../../pages/cake-article-page/cake-article-page')
);
const CatalogPage = lazy(() => import('../../pages/catalog-page/catalog-page'));
const ContactsPage = lazy(
	() => import('../../pages/contacts-page/contacts-page')
);
const DeliveryPage = lazy(
	() => import('../../pages/delivery-page/delivery-page')
);
const NotFoundPage = lazy(
	() => import('../../pages/not-found-page/not-found-page')
);
const OrderRegistrationPage = lazy(
	() => import('../../pages/order-registration-page/order-registration-page')
);
const ShoppingCartPage = lazy(
	() => import('../../pages/shopping-cart-page/shopping-cart-page')
);
const ThanksPage = lazy(() => import('../../pages/thanks-page/thanks-page'));

const CatalogPageWrapper = ({
	cakes,
	bentoCatalog,
	searchPage
}: ComponentProps<typeof CatalogPage>) => {
	return (
		<Suspense fallback={<PageSkeleton message="Loading..." />}>
			<CatalogPage
				cakes={cakes}
				bentoCatalog={bentoCatalog}
				searchPage={searchPage}
			/>
		</Suspense>
	);
};

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
					<Route
						path={AppRoute.About}
						element={
							<Suspense
								fallback={<PageSkeleton message="Loading..." />}
							>
								<AboutPage />
							</Suspense>
						}
					/>
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
							<CatalogPageWrapper
								cakes={{ cakeOffers, bentoCakesOffers }}
							/>
						}
					/>
					<Route
						path={AppRoute.BentoCakesCatalog}
						element={
							<CatalogPageWrapper
								cakes={{ cakeOffers, bentoCakesOffers }}
								bentoCatalog
							/>
						}
					/>
					<Route
						path={AppRoute.Search}
						element={
							<CatalogPageWrapper
								cakes={{ cakeOffers, bentoCakesOffers }}
								searchPage
							/>
						}
					/>
					<Route
						path={AppRoute.Delivery}
						element={
							<Suspense
								fallback={<PageSkeleton message="Loading..." />}
							>
								<DeliveryPage />
							</Suspense>
						}
					/>
					<Route
						path={AppRoute.Contacts}
						element={
							<Suspense
								fallback={<PageSkeleton message="Loading..." />}
							>
								<ContactsPage />
							</Suspense>
						}
					/>
				</Route>
				<Route
					path={AppRoute.CakeOfferArticle}
					element={
						<Suspense
							fallback={<PageSkeleton message="Loading..." />}
						>
							<CakeArticlePage />
						</Suspense>
					}
				/>
				<Route
					path={AppRoute.ShoppingCart}
					element={
						<Suspense
							fallback={<PageSkeleton message="Loading..." />}
						>
							<ShoppingCartPage />
						</Suspense>
					}
				/>
				<Route
					path={AppRoute.OrderRegistration}
					element={
						<Suspense
							fallback={<PageSkeleton message="Loading..." />}
						>
							<OrderRegistrationPage />
						</Suspense>
					}
				/>
				<Route
					path={AppRoute.Thanks}
					element={
						<Suspense
							fallback={<PageSkeleton message="Loading..." />}
						>
							<ThanksPage />
						</Suspense>
					}
				/>

				<Route
					path="*"
					element={
						<Suspense
							fallback={<PageSkeleton message="Loading..." />}
						>
							<NotFoundPage />
						</Suspense>
					}
				/>
			</Routes>
		</ErrorBoundary>
	);
}

export default App;
