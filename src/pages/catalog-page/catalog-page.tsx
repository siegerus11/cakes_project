import { CakeOffer } from '../../types/types';
import BreadCrumbs from '../../components/bread-crumbs/bread-crumbs';
import Title from '../../components/title/title';
import SortList from '../../components/sort-list/sort-list';
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
			<section className={`page ${styles.component}`}>
				<Title titleText={pageTitle} />
				<hr />
				<SortList />
			</section>
		</>
	);
};

export default CatalogPage;
