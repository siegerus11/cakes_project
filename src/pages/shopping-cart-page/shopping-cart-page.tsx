import {
	useState,
	ChangeEvent,
	AnimationEvent,
	FormEvent,
	useMemo,
	useCallback
} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import ButtonController from '../../components/button-controller/button-controller';
import Overlay from '../../components/overlay/overlay';
import Popup from '../../components/popup/popup';
import Title from '../../components/title/title';
import { LinkButton } from '../../components/ui/button/button';
import SubmitButton from '../../components/ui/button/submit-button';
import { AppRoute, ConfirmMessage, validation } from '../../constants';
import useMediaQuery from '../../hooks/useMediaQuery';
import { useAppSelector, useActionCreators } from '../../hooks/useStore';
import useTouch from '../../hooks/useTouch';
import {
	cartProcessSelectors,
	cartProcessActions
} from '../../store/cart-process/cart-process';
import applyСonfirm from '../../utils/applyСonfirm';
import getFormattedPrice from '../../utils/getFormattedPrice';
import CartList from './cart-item/cart-item';
import styles from './shopping-cart-page.module.scss';

const ShoppingCartPage = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const [popupIsVisible, setPopupIsVisible] = useState<boolean>(false);
	const [isAnimate, setIsAnimate] = useState<boolean>(false);
	const [inputValue, setInputValue] = useState<string>('');
	const [errorMessage, setErrorMessage] = useState<string>('');

	const shoppingCart = useAppSelector(
		cartProcessSelectors.selectShoppingCart
	);
	const { clearCart, getDiscountAction } =
		useActionCreators(cartProcessActions);
	const finalSumValue = useAppSelector(cartProcessSelectors.selectFinalSum);
	const finalSum = useMemo(
		() => getFormattedPrice(finalSumValue),
		[finalSumValue]
	);

	const isMobile = useMediaQuery('(max-width: 576px)');

	const handleTrashButtonClick = useCallback(() => {
		const answer = applyСonfirm(ConfirmMessage.ClearCart);
		if (answer) {
			clearCart();
			localStorage.clear();
		}
	}, [clearCart]);

	const handlePopupTouchClose = useCallback(() => {
		setIsAnimate(true);
	}, []);

	const handlePopupClickClose = useCallback(() => {
		if (!isMobile) setPopupIsVisible(false);
	}, [isMobile]);

	const { handleTouchStart, handleTouchMove, handleTouchEnd } = useTouch(
		handlePopupTouchClose
	);

	const handlePopupAnimationEnd = useCallback((e: AnimationEvent) => {
		if (e.animationName === styles.popupClosing) {
			setPopupIsVisible(false);
			setIsAnimate(false);
		}
	}, []);

	const handlePromoButtonClick = useCallback(() => {
		setPopupIsVisible(true);
	}, []);

	const handleInputClearClick = () => {
		setInputValue('');
		setErrorMessage('');
	};

	const promoInputValidate = (value: string) => {
		const result = validation.promo(value);
		if (result === true) {
			setErrorMessage('');
		} else if (typeof result === 'string') {
			setErrorMessage(result);
		}
	};

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { value } = e.target;
		setInputValue(value);
		promoInputValidate(value);
	};

	const validPromo = validation.promo(inputValue);
	const isValidPromo = validPromo === true;

	const handlePromoSubmit = (e: FormEvent) => {
		e.preventDefault();
		if (!isValidPromo) return;
		getDiscountAction(inputValue);
	};

	const buttonPath = useMemo(
		() =>
			shoppingCart.length ? AppRoute.OrderRegistration : AppRoute.Catalog,
		[shoppingCart.length]
	);

	const handleBackClick = () => {
		const backPath = location.state?.from || AppRoute.Catalog;
		navigate(backPath, { state: { fromCart: true } });
	};

	const buttonText = shoppingCart.length ? 'Верно, далее' : 'К каталогу';

	return (
		<main className={`page ${styles.page}`}>
			<div className="container">
				<button
					className={`back-link back-link_m-small ${styles.back}`}
					type="button"
					onClick={handleBackClick}
				>
					<svg viewBox="0 0 18 18" aria-hidden="true">
						<use xlinkHref="#nav-arrow-big" />
					</svg>
					<span>Назад</span>
				</button>
				<div className={styles.wrapper}>
					<div className={styles.header}>
						<Title
							titleText="Ваш заказ"
							titleClass={styles.title}
							level="h1"
						/>
						<button
							className={`cart-press ${styles.trashButton}`}
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
					<LinkButton
						className={`button button_primary ${styles.button}`}
						path={buttonPath}
						label={buttonText}
					>
						<span>{buttonText}</span>
					</LinkButton>
				</div>
			</div>
			<ButtonController outerClass={`${styles.controller}`}>
				<LinkButton
					className={`button button_primary ${styles.controller__button}`}
					path={buttonPath}
					label={buttonText}
				>
					<span>{buttonText}</span>
				</LinkButton>
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
							level="h2"
						/>
						<div className={styles.popup__wrapper}>
							<form id="promo-form" onSubmit={handlePromoSubmit}>
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
						<span className="error-message">{errorMessage}</span>
						<SubmitButton
							className={`button button_primary ${styles.popup__button}`}
							formId="promo-form"
							label="Применить"
							isDisabled={!isValidPromo}
						>
							<span>Применить</span>
						</SubmitButton>
					</Popup>
				</Overlay>
			)}
		</main>
	);
};

export default ShoppingCartPage;
