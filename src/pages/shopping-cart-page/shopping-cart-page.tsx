import { useState } from 'react';
import { Link, generatePath, useLocation } from 'react-router-dom';

import ButtonController from '../../components/button-controller/button-controller';
import Overlay from '../../components/overlay/overlay';
import Popup from '../../components/popup/popup';
import Title from '../../components/title/title';
import Button from '../../components/ui/button/button';
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
	const [popupIsVisible, setPopupIsVisible] = useState<boolean>(false);

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

	const handlePopupClose = () => {
		setPopupIsVisible(prevState => !prevState);
	};

	const handlePromoButtonClick = () => {
		setPopupIsVisible(true);
	};
	return (
		<div className={`page ${styles.page}`}>
			<div className="container">
				<Link
					className={`back-link back-link_m-small ${styles.back}`}
					to={backLink}
				>
					<span>Назад</span>
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
							onClick={handlePromoButtonClick}
						>
							<span>Ввести промокод</span>
						</button>
					</div>

					<Button
						className={`button button_primary ${styles.button}`}
					>
						<span>Верно, далее</span>
					</Button>
				</div>
			</div>
			<ButtonController outerClass={`${styles.controller}`}>
				<Button
					className={`button button_primary ${styles.controller__button}`}
				>
					<span>Верно, далее</span>
				</Button>
			</ButtonController>
			{popupIsVisible && (
				<Overlay>
					<Popup
						outerClass={`popup ${styles.popup}`}
						closeClass={styles.popup__close}
						onCloseClick={handlePopupClose}
					>
						<Title
							titleText="Промокод"
							titleClass={styles.popup__title}
						/>
						<input
							className={styles.popup__input}
							placeholder="Введите промокод"
						/>
						<Button
							className={`button button_primary ${styles.popup__button}`}
						>
							<span>Применить</span>
						</Button>
					</Popup>
				</Overlay>
			)}
		</div>
	);
};

export default ShoppingCartPage;
