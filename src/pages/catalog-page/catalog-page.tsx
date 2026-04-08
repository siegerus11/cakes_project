import { CakeOffer } from '../../types/types';
import BreadCrumbs from '../../components/bread-crumbs/bread-crumbs';
import { useLocation } from 'react-router-dom';

type CatalogPageProps = {
	cakes: CakeOffer[];
};

const CatalogPage = ({ cakes }: CatalogPageProps) => {
	const location = useLocation();
	console.log(location.pathname.includes('catalog'));

	return (
		<>
			<BreadCrumbs />
			<div className="page catalog-page">
				<nav>CatalogPage {cakes.length}</nav>
			</div>
		</>
	);
};

export default CatalogPage;
