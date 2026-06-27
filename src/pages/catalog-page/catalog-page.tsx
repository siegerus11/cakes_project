import { useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';

import BreadCrumbs from '../../components/bread-crumbs/bread-crumbs';
import CardsList from '../../components/cards-list/cards-list';
import Clauses from '../../components/clause/clause';
import Loader from '../../components/loader/loader';
import Title from '../../components/title/title';
import { NAVS, LoadingStatus } from '../../constants';
import { useActionCreators, useAppSelector } from '../../hooks/useStore';
import { selectOffersLoadingStatus } from '../../store/cake-offers-data/cake-offers-data';
import { mainProcessActions } from '../../store/main-process/main-process';
import { CakeOffer } from '../../types/types';
import getNavData from '../../utils/getNavData';
import styles from './catalog-page.module.scss';
import NotFoundCake from './no-found-cake/no-found-cake';
import SortList from './sort-list/sort-list';

type CatalogPageProps = {
	cakes: { cakeOffers: CakeOffer[]; bentoCakesOffers: CakeOffer[] };
	bentoCatalog?: boolean;
	searchPage?: boolean;
};

const CatalogPage = ({
	cakes,
	searchPage = false,
	bentoCatalog
}: CatalogPageProps) => {
	const cakeOffers = bentoCatalog ? cakes.bentoCakesOffers : cakes.cakeOffers;
	const { pathname } = useLocation();
	const { getSortingStatus } = useActionCreators(mainProcessActions);
	const loadingStatus = useAppSelector(selectOffersLoadingStatus);
	const pageTitle = useMemo(() => {
		const navData = getNavData(pathname, NAVS);
		return navData?.title ?? 'Каталог';
	}, [pathname]);

	useEffect(() => {
		getSortingStatus('');
	}, [getSortingStatus]);

	if (loadingStatus === LoadingStatus.Loading) {
		return <Loader message="Loading..." />;
	}
	if (loadingStatus === LoadingStatus.Failed) {
		return <Loader message="Data loading Error" />;
	}
	return (
		<>
			<div className="container">
				<BreadCrumbs />
			</div>
			<main className={`page page_catalog ${styles.component}`}>
				<div className="container">
					<Title titleText={pageTitle} level="h1" hr />
					<SortList />
				</div>
				{searchPage ? (
					<>
						<div className="container_catalog-list container">
							<Title
								titleClass={styles.subtitle}
								titleText="Торты:"
								level="h2"
							/>
							<CardsList cakes={cakeOffers} isMainPage={false} />
						</div>
						<div className="container_catalog-list container">
							<Title
								titleClass={styles.subtitle}
								titleText="Бенто-торты:"
								level="h2"
							/>
							<CardsList
								cakes={cakes.bentoCakesOffers}
								isMainPage={false}
							/>
						</div>
					</>
				) : (
					<div className="container_catalog-list container ">
						<CardsList cakes={cakeOffers} isMainPage={false} />
					</div>
				)}
				<div className="container">
					<NotFoundCake />
					<Clauses />
				</div>
			</main>
		</>
	);
};

export default CatalogPage;
