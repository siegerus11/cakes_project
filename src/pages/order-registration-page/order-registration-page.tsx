import { useState } from 'react';
import { Link } from 'react-router-dom';

import ButtonController from '../../components/button-controller/button-controller';
import Title from '../../components/title/title';
import { SubmitButton } from '../../components/ui/button/button';
import { AppRoute } from '../../constants';
import styles from './order-registration-page.module.scss';

const OrderRegistrationPage = () => {
	const [isAreaVisible, setIsAreaVisible] = useState(false);

	const handleAreaButtonClick = () => {
		setIsAreaVisible(prevState => !prevState);
	};

	return (
		<>
			<div className={`page ${styles.page}`}>
				<div className="container_secondary container_m-pdg15 container">
					<Link
						className={`back-link back-link_m-small ${styles.back}`}
						to={AppRoute.ShoppingCart}
					>
						{' '}
						<span>Назад</span>
					</Link>

					<div className={styles.wrapper}>
						<Title
							titleText="Оформление заказа"
							titleClass={`title_fw800 title_fz30 ${styles.title}`}
						/>
						<form>
							<section className={styles.delivery}>
								<div className={styles.delivery__header}>
									<svg
										className={styles.delivery__icon}
										viewBox="0 0 18 18"
									>
										<use xlinkHref="#deliveryman"></use>
									</svg>
									<h3 className={styles.delivery__title}>
										Доставка курьером по Москве
									</h3>
									<svg
										className={styles.delivery__arrow}
										viewBox="0 0 18 18"
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
									>
										<use xlinkHref="#card"></use>
									</svg>
									<h3 className={styles.payment__title}>
										Оплата переводом на карту
									</h3>
									<svg className={styles.payment__arrow}>
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
								/>
								<input
									className={styles.input}
									placeholder="Телефон"
									type="text"
									name="number"
									id="number"
								/>
								<input
									className={styles.input}
									placeholder="Адрес"
									type="text"
									name="address"
									id="address"
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
								></textarea>
							)}
						</form>
						<SubmitButton
							className={`button button_primary ${styles.button}`}
						>
							<span>Оформить заказ</span>
						</SubmitButton>
					</div>
				</div>
			</div>
			<ButtonController outerClass={styles.controller}>
				<SubmitButton
					className={`button button_primary ${styles.controller__button}`}
				>
					<span>Оформить заказ</span>
				</SubmitButton>
			</ButtonController>
		</>
	);
};

export default OrderRegistrationPage;
