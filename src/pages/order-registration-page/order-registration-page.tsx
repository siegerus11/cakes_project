import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import ButtonController from '../../components/button-controller/button-controller';
import Title from '../../components/title/title';
import SubmitButton from '../../components/ui/button/submit-button';
import { AppRoute, LoadingStatus } from '../../constants';
import { useActionCreators, useAppSelector } from '../../hooks/useStore';
import {
	cakeOffersDataActions,
	cakeOffersDataSelectors
} from '../../store/cake-offers-data/cake-offers-data';
import {
	cartProcessActions,
	cartProcessSelectors
} from '../../store/cart-process/cart-process';
import { Order } from '../../types/types';
import Form from './form/form';
import styles from './order-registration-page.module.scss';

const OrderRegistrationPage = () => {
	const navigate = useNavigate();
	const [isPaymantHasStatus, setIsPaymantHasStatus] =
		useState<boolean>(false);

	const cart = useAppSelector(cartProcessSelectors.selectShoppingCart);
	const orderSendingStatus = useAppSelector(
		cakeOffersDataSelectors.selectOrderSendingStatus
	);
	const sum = useAppSelector(cartProcessSelectors.selectFinalSum);

	const { sendOrderAction } = useActionCreators(cakeOffersDataActions);
	const { clearCart } = useActionCreators(cartProcessActions);

	const handleFormSubmit = (formValues: Order['userData']) => {
		const order: Order = {
			shoppingCart: cart,
			userData: formValues,
			finalSum: sum
		};

		sendOrderAction(order).then(response => {
			if (response.meta.requestStatus === 'fulfilled') {
				clearCart();
				localStorage.clear();
				navigate(AppRoute.Thanks);
			}
		});
	};

	const handleBackClick = () => {
		navigate(-1);
	};

	const getPaymantStatus = (status: boolean) => {
		setIsPaymantHasStatus(status);
	};

	return (
		<>
			<main className={`page ${styles.page}`}>
				<div className="container_secondary container_m-pdg15 container">
					<button
						className={`back-link back-link_m-small ${styles.back}`}
						type="button"
						onClick={handleBackClick}
						aria-label="Назад"
					>
						<svg viewBox="0 0 18 18" aria-hidden="true">
							<use xlinkHref="#nav-arrow-big" />
						</svg>
						<span>Назад</span>
					</button>

					<div className={styles.wrapper}>
						<Title
							titleText="Оформление заказа"
							titleClass={`title_fw800 title_fz30 ${styles.title}`}
							level="h1"
						/>
						<Form
							onSubmit={handleFormSubmit}
							finalSum={sum}
							getPaymantStatus={getPaymantStatus}
						/>
					</div>
				</div>
			</main>
			{isPaymantHasStatus || (
				<ButtonController outerClass={styles.controller}>
					<SubmitButton
						className={`button button_primary ${styles.controller__button}`}
						label="Оформить заказ"
						formId="order-registration-form"
						isDisabled={
							orderSendingStatus === LoadingStatus.Loading
						}
					>
						<span>Оформить заказ</span>
					</SubmitButton>
				</ButtonController>
			)}
		</>
	);
};

export default OrderRegistrationPage;
