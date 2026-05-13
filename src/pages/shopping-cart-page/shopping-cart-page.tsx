import { useState, ChangeEvent, AnimationEvent } from 'react';
import { Link, generatePath, useLocation } from 'react-router-dom';

import ButtonController from '../../components/button-controller/button-controller';
import Overlay from '../../components/overlay/overlay';
import Popup from '../../components/popup/popup';
import Title from '../../components/title/title';
import Button, { SubmitButton } from '../../components/ui/button/button';
import { AppRoute, ConfirmMessage } from '../../constants';
import useConfirm from '../../hooks/useConfirm';
import useMediaQuery from '../../hooks/useMediaQuery';
import { useAppSelector, useAppDispatch } from '../../hooks/useStore';
import useTouch from '../../hooks/useTouch';
import {
	selectActiveOffer,
	selectFinalSum,
	selectShoppingCart,
	clearCart
} from '../../store/main-process/main-process';
import getFormattedPrice from '../../utils/getFormattedPrice';
import CartList from './cart-item/cart-item';
import styles from './shopping-cart-page.module.scss';

const ShoppingCartPage = () => {
	const [popupIsVisible, setPopupIsVisible] = useState<boolean>(false);
	const [isAnimate, setIsAnimate] = useState<boolean>(false);
	const [inputValue, setInputValue] = useState<string>('');

	const activeOfferId = useAppSelector(selectActiveOffer);
	const shoppingCart = useAppSelector(selectShoppingCart);
	const dispatch = useAppDispatch();
	const finalSum = getFormattedPrice(useAppSelector(selectFinalSum));
	const location = useLocation();
	const confirm = useConfirm();

	const isMobile = useMediaQuery('(max-width: 576px)');

	const backLink: string =
		location.state?.from === AppRoute.CakeOfferArticle
			? generatePath(AppRoute.CakeOfferArticle, {
					id: activeOfferId
			  })
			: location.state?.from;

	const handleTrashButtonClick = () => {
		const answer = confirm(ConfirmMessage.ClearCart);
		if (answer) dispatch(clearCart());
	};

	const handlePopupTouchClose = () => {
		setIsAnimate(true);
	};
	const handlePopupClickClose = () => {
		if (!isMobile) setPopupIsVisible(false);
	};

	const { handleTouchStart, handleTouchMove, handleTouchEnd } = useTouch(
		handlePopupTouchClose
	);

	const handlePopupAnimationEnd = (e: AnimationEvent) => {
		if (e.animationName === styles.popupClosing) {
			setPopupIsVisible(false);
			setIsAnimate(false);
		}
	};

	const handlePromoButtonClick = () => {
		setPopupIsVisible(true);
	};

	const handleInputClearClick = () => {
		setInputValue('');
	};

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		setInputValue(e.target.value);
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
						path={
							shoppingCart.length
								? AppRoute.orderRegistration
								: AppRoute.Catalog
						}
					>
						{shoppingCart.length ? (
							<span>Верно, далее</span>
						) : (
							<span>К каталогу</span>
						)}
					</Button>
				</div>
			</div>
			<ButtonController outerClass={`${styles.controller}`}>
				<Button
					className={`button button_primary ${styles.controller__button}`}
					path={AppRoute.orderRegistration}
				>
					<span>Верно, далее</span>
				</Button>
			</ButtonController>
			{popupIsVisible && (
				<Overlay>
					<Popup
						outerClass={`popup ${styles.popup} ${
							isAnimate ? styles.popup_closing : ''
						}`}
						closeClass={styles.popup__close}
						onCloseClick={handlePopupClickClose}
						onAnimationEnd={handlePopupAnimationEnd}
						onTouchStart={handleTouchStart}
						onTouchMove={handleTouchMove}
						onTouchEnd={handleTouchEnd}
					>
						<Title
							titleText="Промокод"
							titleClass={styles.popup__title}
						/>
						<div className={styles.popup__wrapper}>
							<form id="promo-form">
								<input
									className={styles.popup__input}
									placeholder="Введите промокод"
									onChange={handleInputChange}
									value={inputValue}
									name="promo"
									id="promo"
								/>
							</form>
							{inputValue && (
								<button
									className={styles.popup__clear}
									type="button"
									onClick={handleInputClearClick}
									aria-label="Очистить"
								/>
							)}
						</div>
						<SubmitButton
							className={`button button_primary ${styles.popup__button}`}
							formId="promo-form"
						>
							<span>Применить</span>
						</SubmitButton>
					</Popup>
				</Overlay>
			)}
		</div>
	);
};

export default ShoppingCartPage;
