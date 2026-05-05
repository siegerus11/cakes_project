import { Link } from 'react-router-dom';

import { AppRoute } from '../../constants';
import { useAppSelector } from '../../hooks/useStore';
import { selectShoppingCart } from '../../store/main-process/main-process';
import styles from './cart-indicator.module.scss';

const ShoppingCartItem = () => {
	const cart = useAppSelector(selectShoppingCart);
	const count = cart.length;

	if (count === 0) return null;

	return (
		<Link className={styles.component} to={AppRoute.SHOPPING_CART}>
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
