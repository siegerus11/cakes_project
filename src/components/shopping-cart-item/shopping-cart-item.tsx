import { Link, useLocation } from 'react-router-dom';

import { AppRoute } from '../../constants';
import { useAppSelector } from '../../hooks/useStore';
import { selectShoppingCart } from '../../store/cart-process/cart-process';
import styles from './shopping-cart-item.module.scss';

type ShoppingCartItemProps = {
	className?: string;
	fixed?: boolean;
};

const ShoppingCartItem = ({ className = '', fixed }: ShoppingCartItemProps) => {
	const cart = useAppSelector(selectShoppingCart);
	const count = cart.length;
	const location = useLocation();

	const componentClass = fixed
		? `${styles.component} ${styles.component_fixed}`
		: styles.component;

	if (count === 0) return null;

	return (
		<Link
			className={`${componentClass} ${className}`}
			to={AppRoute.ShoppingCart}
			state={{ from: location.pathname }}
			aria-label="Корзина"
			data-testid="Корзина"
		>
			<svg
				className={styles.component__icon}
				viewBox="0 0 20 20"
				aria-hidden="true"
			>
				<use xlinkHref="#cart"></use>
			</svg>
			<div className={styles.component__indicator}>
				<span className={styles.component__count}>{count}</span>
			</div>
		</Link>
	);
};

export default ShoppingCartItem;
