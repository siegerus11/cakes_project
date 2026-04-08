import { CakeOffer } from '../../types/types';
import BreadCrumbs from '../../components/bread-crumbs/bread-crumbs';
import Title from '../../components/title/title';
import { NAVS } from '../../constants';
import { getLinkData } from '../../utils/getLinkData';
import { useLocation } from 'react-router-dom';

type CatalogPageProps = {
	cakes: CakeOffer[];
};

const CatalogPage = ({ cakes }: CatalogPageProps) => {
	const { pathname } = useLocation();
	const pageTitle = getLinkData(pathname, NAVS).title;
	return (
		<>
			<BreadCrumbs />
			<div className="page catalog-page">
				<Title titleText={pageTitle} />
			</div>
		</>
	);
};

export default CatalogPage;
