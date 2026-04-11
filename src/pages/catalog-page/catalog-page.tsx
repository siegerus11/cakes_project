import { useLocation } from 'react-router-dom';

import BreadCrumbs from '../../components/bread-crumbs/bread-crumbs';
import CardsList from '../../components/cards-list/cards-list';
import Clauses from '../../components/clause/clauses';
import Title from '../../components/title/title';
import { NAVS } from '../../constants';
import { CakeOffer } from '../../types/types';
import { getNavData } from '../../utils/getNavData';
import styles from './catalog-page.module.scss';
import NotFoundCake from './no-found-cake/no-found-cake';
import SortList from './sort-list/sort-list';

type CatalogPageProps = {
	cakes: CakeOffer[];
};

const CatalogPage = ({ cakes }: CatalogPageProps) => {
	const { pathname } = useLocation();
	const pageTitle = getNavData(pathname, NAVS)!.title;
	return (
		<>
			<div className="container">
				<BreadCrumbs />
			</div>
			<section className={`page page_catalog ${styles.component}`}>
				<div className="container">
					<h1 className="visually-hidden">Каталог тортов</h1>
					<Title titleText={pageTitle} />
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
			</section>
		</>
	);
};

export default CatalogPage;
