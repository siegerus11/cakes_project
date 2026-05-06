import { Link, useLocation } from 'react-router-dom';

import { AppRoute } from '../../constants';
import { useAppSelector } from '../../hooks/useStore';
import { selectShoppingCart } from '../../store/main-process/main-process';
import styles from './cart-indicator.module.scss';

const ShoppingCartItem = () => {
	const cart = useAppSelector(selectShoppingCart);
	const count = cart.length;
	const location = useLocation();

	if (count === 0) return null;

	return (
		<Link
			className={styles.component}
			to={AppRoute.ShoppingCart}
			state={{ from: location.pathname }}
		>
			<svg className={styles.component__icon} viewBox="0 0 20 20">
				<use xlinkHref="#cart"></use>
			</svg>
			<div className={styles.component__indicator}>
				<span className={styles.component__count}>{count}</span>
			</div>
		</Link>
	);
};

export default ShoppingCartItem;
