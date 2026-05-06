import { Link, generatePath, useLocation } from 'react-router-dom';

import Title from '../../components/title/title';
import { AppRoute, ConfirmMessage } from '../../constants';
import useConfirm from '../../hooks/useConfirm';
import { useAppSelector, useAppDispatch } from '../../hooks/useStore';
import {
	selectActiveOffer,
	selectFinalSum,
	clearCart
} from '../../store/main-process/main-process';
import CartList from './cart-item/cart-item';
import styles from './shopping-cart-page.module.scss';

const ShoppingCartPage = () => {
	const activeOfferId = useAppSelector(selectActiveOffer);
	const dispatch = useAppDispatch();
	const finalSum = useAppSelector(selectFinalSum);
	const location = useLocation();
	const confirm = useConfirm();

	const backLink =
		location.state?.from === AppRoute.CakeOfferArticle
			? generatePath(AppRoute.CakeOfferArticle, {
					id: activeOfferId
			  })
			: location.state?.from;

	const handleTrashButtonClick = () => {
		const answer = confirm(ConfirmMessage.ClearCart);
		if (answer) dispatch(clearCart());
	};

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
							onClick={handleTrashButtonClick}
						>
							<svg className={styles.icon} viewBox="0 0 16 16">
								<use xlinkHref="#basket"></use>
							</svg>
						</button>
					</div>
					<CartList />
					<div className={styles.total}>
						<span className={styles.total__amount}>
							Итого: {finalSum} ₽
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
