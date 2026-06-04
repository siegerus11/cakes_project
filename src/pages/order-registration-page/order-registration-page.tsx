import { useState, FormEvent, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';

import ButtonController from '../../components/button-controller/button-controller';
import Title from '../../components/title/title';
import SubmitButton from '../../components/ui/button/submit-button';
import { AppRoute } from '../../constants';
import { useActionCreators, useAppSelector } from '../../hooks/useStore';
import {
	cartProcessActions,
	selectShoppingCart,
	selectFinalSum
} from '../../store/cart-process/cart-process';
import { Order } from '../../types/types';
import styles from './order-registration-page.module.scss';

const OrderRegistrationPage = () => {
	const navigate = useNavigate();
	const [isAreaVisible, setIsAreaVisible] = useState<boolean>(false);
	const [formValues, setFormValues] = useState({
		user: '',
		number: '',
		address: '',
		comment: ''
	});
	const cart = useAppSelector(selectShoppingCart);
	const sum = useAppSelector(selectFinalSum);
	const order: Order = {
		shoppingCart: cart,
		userData: formValues,
		finalSum: sum
	};

	// const { setUserMessage } = useActionCreators(cartProcessActions);

	const handleAreaButtonClick = () => {
		setIsAreaVisible(prevState => !prevState);
	};

	const handleIputChange = (e: ChangeEvent) => {
		const target = e.target as HTMLInputElement;
		setFormValues(prevState => ({
			...prevState,
			[target.name]: target.value
		}));
	};

	const handleFormSubmit = (e: FormEvent) => {
		e.preventDefault();

		navigate(AppRoute.Thanks);
	};

	return (
		<>
			<main className={`page ${styles.page}`}>
				<div className="container_secondary container_m-pdg15 container">
					<button
						className={`back-link back-link_m-small ${styles.back}`}
						type="button"
						onClick={() => navigate(-1)}
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
						<form
							onSubmit={handleFormSubmit}
							id="order-registration-form"
						>
							<section className={styles.delivery}>
								<div className={styles.delivery__header}>
									<svg
										className={styles.delivery__icon}
										viewBox="0 0 18 18"
										aria-hidden="true"
									>
										<use xlinkHref="#deliveryman"></use>
									</svg>
									<h2 className={styles.delivery__title}>
										Доставка курьером по Москве
									</h2>
									<svg
										className={styles.delivery__arrow}
										viewBox="0 0 18 18"
										aria-hidden="true"
									>
										<use xlinkHref="#arrow-sm"></use>
									</svg>
								</div>
							</section>
							<section className={styles.payment}>
								<div className={styles.payment__header}>
									<svg
										className={styles.payment__icon}
										viewBox="0 0 18 18"
										aria-hidden="true"
									>
										<use xlinkHref="#card"></use>
									</svg>
									<h2 className={styles.payment__title}>
										Оплата переводом на карту
									</h2>
									<svg
										className={styles.payment__arrow}
										aria-hidden="true"
									>
										<use xlinkHref="#arrow-sm"></use>
									</svg>
								</div>
							</section>
							<div className={styles.description}>
								Стоимость и время доставки согласуем при
								подтверждении заказа
							</div>
							<div className={styles.fields}>
								<input
									className={styles.input}
									placeholder="Имя"
									type="text"
									name="user"
									id="user"
									value={formValues.user}
									onChange={handleIputChange}
								/>
								<input
									className={styles.input}
									placeholder="Телефон"
									type="text"
									name="number"
									id="number"
									value={formValues.number}
									onChange={handleIputChange}
								/>
								<input
									className={styles.input}
									placeholder="Адрес"
									type="text"
									name="address"
									id="address"
									value={formValues.address}
									onChange={handleIputChange}
								/>
							</div>
							<button
								className={styles.areaButton}
								type="button"
								onClick={handleAreaButtonClick}
							>
								Добавить комментарий
							</button>
							{isAreaVisible && (
								<textarea
									className={styles.textarea}
									name="comment"
									id="comment"
									value={formValues.comment}
									onChange={handleIputChange}
								></textarea>
							)}
						</form>
						<SubmitButton
							className={`button button_primary ${styles.button}`}
							label="Оформить заказ"
							formId="order-registration-form"
						>
							<span>Оформить заказ</span>
						</SubmitButton>
					</div>
				</div>
			</main>
			<ButtonController outerClass={styles.controller}>
				<SubmitButton
					className={`button button_primary ${styles.controller__button}`}
					label="Оформить заказ"
				>
					<span>Оформить заказ</span>
				</SubmitButton>
			</ButtonController>
		</>
	);
};

export default OrderRegistrationPage;
