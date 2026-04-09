import { CakeOffer } from '../../types/types';
import BreadCrumbs from '../../components/bread-crumbs/bread-crumbs';
import Title from '../../components/title/title';
import SortList from './sort-list/sort-list';
import CardsList from '../../components/cards-list/cards-list';
import NotFoundCake from './no-found-cake/no-found-cake';
import Clauses from '../../components/clause/clauses';
import { NAVS } from '../../constants';
import { getNavData } from '../../utils/getLinkData';
import { useLocation } from 'react-router-dom';
import styles from './catalog-page.module.scss';

type CatalogPageProps = {
	cakes: CakeOffer[];
};

const CatalogPage = ({ cakes }: CatalogPageProps) => {
	const { pathname } = useLocation();
	const pageTitle = getNavData(pathname, NAVS)!.title;
	return (
		<>
			<BreadCrumbs />
			<section className={`page page_catalog ${styles.component}`}>
				<h1 className="visually-hidden">Каталог тортов</h1>
				<Title titleText={pageTitle} />
				<hr />
				<SortList />
				<CardsList cakes={cakes} isMainPage={false} />
				<NotFoundCake />
				<Clauses />
			</section>
		</>
	);
};

export default CatalogPage;
