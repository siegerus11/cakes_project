import { useNavigate } from 'react-router-dom';

import ButtonController from '../../components/button-controller/button-controller';
import Title from '../../components/title/title';
import SubmitButton from '../../components/ui/button/submit-button';
import { AppRoute, LoadingStatus } from '../../constants';
import { useActionCreators, useAppSelector } from '../../hooks/useStore';
import {
	cakeOffersDataActions,
	selectOrderSendingStatus
} from '../../store/cake-offers-data/cake-offers-data';
import {
	selectShoppingCart,
	selectFinalSum
} from '../../store/cart-process/cart-process';
import { Order } from '../../types/types';
import Form from './form/form';
import styles from './order-registration-page.module.scss';

const OrderRegistrationPage = () => {
	const navigate = useNavigate();

	const cart = useAppSelector(selectShoppingCart);
	const orderSendingStatus = useAppSelector(selectOrderSendingStatus);
	const sum = useAppSelector(selectFinalSum);

	const { sendOrderAction } = useActionCreators(cakeOffersDataActions);

	const handleFormSubmit = (formValues: Order['userData']) => {
		const order: Order = {
			shoppingCart: cart,
			userData: formValues,
			finalSum: sum
		};

		sendOrderAction(order).then(response => {
			if (response.meta.requestStatus === 'fulfilled') {
				navigate(AppRoute.Thanks);
			}
		});
	};

	const handleBackClick = () => {
		navigate(-1);
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
						<Form onSubmit={handleFormSubmit} />
					</div>
				</div>
			</main>
			<ButtonController outerClass={styles.controller}>
				<SubmitButton
					className={`button button_primary ${styles.controller__button}`}
					label="Оформить заказ"
					formId="order-registration-form"
					isDisabled={orderSendingStatus === LoadingStatus.Loading}
				>
					<span>Оформить заказ</span>
				</SubmitButton>
			</ButtonController>
		</>
	);
};

export default OrderRegistrationPage;
