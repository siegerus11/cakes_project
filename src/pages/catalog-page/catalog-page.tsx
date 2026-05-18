import { useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';

import BreadCrumbs from '../../components/bread-crumbs/bread-crumbs';
import CardsList from '../../components/cards-list/cards-list';
import Clauses from '../../components/clause/clauses';
import Title from '../../components/title/title';
import { NAVS } from '../../constants';
import { useAppDispatch } from '../../hooks/useStore';
import { getSortingStatus } from '../../store/main-process/main-process';
import { CakeOffer } from '../../types/types';
import getNavData from '../../utils/getNavData';
import styles from './catalog-page.module.scss';
import NotFoundCake from './no-found-cake/no-found-cake';
import SortList from './sort-list/sort-list';

type CatalogPageProps = {
	cakes: CakeOffer[];
};

const CatalogPage = ({ cakes }: CatalogPageProps) => {
	const { pathname } = useLocation();
	const dispatch = useAppDispatch();
	const pageTitle = useMemo(() => {
		const navData = getNavData(pathname, NAVS);
		return navData?.title ?? 'Каталог';
	}, [pathname]);

	useEffect(() => {
		dispatch(getSortingStatus(''));
	}, [dispatch]);

	return (
		<>
			<div className="container">
				<BreadCrumbs />
			</div>
			<main className={`page page_catalog ${styles.component}`}>
				<div className="container">
					<Title titleText={pageTitle} level="h1" />
					<hr />
					<SortList />
				</div>
				<div className="container_catalog-list container ">
					<CardsList cakes={cakes} isMainPage={false} />
				</div>
				<div className="container">
					<NotFoundCake />
					<Clauses />
				</div>
			</main>
		</>
	);
};

export default CatalogPage;
