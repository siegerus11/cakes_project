import {
	useState,
	ChangeEvent,
	AnimationEvent,
	FormEvent,
	useMemo,
	useCallback
} from 'react';
import { useNavigate } from 'react-router-dom';

import ButtonController from '../../components/button-controller/button-controller';
import Overlay from '../../components/overlay/overlay';
import Popup from '../../components/popup/popup';
import Title from '../../components/title/title';
import Button from '../../components/ui/button/button';
import SubmitButton from '../../components/ui/button/submit-button';
import { AppRoute, ConfirmMessage } from '../../constants';
import useConfirm from '../../hooks/useConfirm';
import useMediaQuery from '../../hooks/useMediaQuery';
import { useAppSelector, useAppDispatch } from '../../hooks/useStore';
import useTouch from '../../hooks/useTouch';
import {
	selectFinalSum,
	selectShoppingCart,
	clearCart
} from '../../store/cart-process/cart-process';
import getFormattedPrice from '../../utils/getFormattedPrice';
import CartList from './cart-item/cart-item';
import styles from './shopping-cart-page.module.scss';

const ShoppingCartPage = () => {
	const navigate = useNavigate();
	const [popupIsVisible, setPopupIsVisible] = useState<boolean>(false);
	const [isAnimate, setIsAnimate] = useState<boolean>(false);
	const [inputValue, setInputValue] = useState<string>('');

	const shoppingCart = useAppSelector(selectShoppingCart);
	const dispatch = useAppDispatch();
	const finalSumValue = useAppSelector(selectFinalSum);
	const finalSum = useMemo(
		() => getFormattedPrice(finalSumValue),
		[finalSumValue]
	);
	const confirm = useConfirm();

	const isMobile = useMediaQuery('(max-width: 576px)');

	const handleTrashButtonClick = useCallback(() => {
		const answer = confirm(ConfirmMessage.ClearCart);
		if (answer) dispatch(clearCart());
	}, [confirm, dispatch]);

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

	const handleInputClearClick = useCallback(() => {
		setInputValue('');
	}, []);

	const handleInputChange = useCallback(
		(e: ChangeEvent<HTMLInputElement>) => {
			setInputValue(e.target.value);
		},
		[]
	);

	const handlePromoSubmit = useCallback((e: FormEvent) => {
		e.preventDefault();
	}, []);

	const buttonPath = useMemo(
		() =>
			shoppingCart.length ? AppRoute.OrderRegistration : AppRoute.Catalog,
		[shoppingCart.length]
	);

	const buttonText = shoppingCart.length ? 'Верно, далее' : 'К каталогу';

	return (
		<main className={`page ${styles.page}`}>
			<div className="container">
				<button
					className={`back-link back-link_m-small ${styles.back}`}
					type="button"
					onClick={() => navigate(-1)}
				>
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
					<Button
						className={`button button_primary ${styles.button}`}
						path={buttonPath}
						label={buttonText}
					>
						<span>{buttonText}</span>
					</Button>
				</div>
			</div>
			<ButtonController outerClass={`${styles.controller}`}>
				<Button
					className={`button button_primary ${styles.controller__button}`}
					path={AppRoute.OrderRegistration}
					label="Верно, далее"
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
						<SubmitButton
							className={`button button_primary ${styles.popup__button}`}
							formId="promo-form"
							label="Применить"
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
