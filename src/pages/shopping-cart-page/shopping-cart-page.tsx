import { Link, generatePath, useLocation } from 'react-router-dom';

import { AppRoute } from '../../constants';
import { useAppSelector } from '../../hooks/useStore';
import { selectActiveOffer } from '../../store/main-process/main-process';
import styles from './shopping-cart-page.module.scss';

type ShoppingCartPageProps = {};

const ShoppingCartPage = (props: ShoppingCartPageProps) => {
	const activeOfferId = useAppSelector(selectActiveOffer);
	const location = useLocation();

	console.log(location.state);

	const backLink =
		location.state?.from === AppRoute.CAKE_OFFER_ARTICLE
			? generatePath(AppRoute.CAKE_OFFER_ARTICLE, {
					id: activeOfferId
			  })
			: location.state?.from;
	return (
		<div className={`page ${styles.page}`}>
			<div className="container">
				<Link to={backLink}>Назад к торту</Link>
			</div>
		</div>
	);
};

export default ShoppingCartPage;
