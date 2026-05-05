import { Link, generatePath, useLocation } from 'react-router-dom';

import Title from '../../components/title/title';
import { AppRoute } from '../../constants';
import { useAppSelector } from '../../hooks/useStore';
import { selectActiveOffer } from '../../store/main-process/main-process';
import CartList from './cart-item/cart-item';
import styles from './shopping-cart-page.module.scss';

type ShoppingCartPageProps = {};

const ShoppingCartPage = (props: ShoppingCartPageProps) => {
	const activeOfferId = useAppSelector(selectActiveOffer);
	const location = useLocation();

	const backLink =
		location.state?.from === AppRoute.CAKE_OFFER_ARTICLE
			? generatePath(AppRoute.CAKE_OFFER_ARTICLE, {
					id: activeOfferId
			  })
			: location.state?.from;
	return (
		<div className={`page ${styles.page}`}>
			<div className="container_secondary container">
				<Link className={`back-link ${styles.back}`} to={backLink}>
					Назад
				</Link>
				<div className={styles.wrapper}>
					<div className={styles.header}>
						<Title
							titleText="Ваш заказ"
							titleClass={styles.title}
						/>
						<button
							className={styles.trashButton}
							aria-label="Удалить заказ"
							type="button"
						>
							<svg className={styles.icon} viewBox="0 0 16 16">
								<use xlinkHref="#basket"></use>
							</svg>
						</button>
					</div>
					<CartList />
					<div className={styles.total}>
						<span className={styles.total__amount}>
							Итого: 14 800 ₽
						</span>
						<button
							className={`dot-lined ${styles.total__button}`}
							type="button"
						>
							<span>Ввести промокод</span>
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ShoppingCartPage;
