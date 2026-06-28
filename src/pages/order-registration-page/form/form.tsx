import { useState, SubmitEvent, ChangeEvent } from 'react';

import SubmitButton from '../../../components/ui/button/submit-button';
import { validation, LoadingStatus } from '../../../constants';
import { useAppSelector } from '../../../hooks/useStore';
import { cakeOffersDataSelectors } from '../../../store/cake-offers-data/cake-offers-data';
import { UserData } from '../../../types/types';
import styles from './form.module.scss';

type FormProps = {
	onSubmit: (formValues: UserData) => void;
};

const Form = ({ onSubmit }: FormProps) => {
	const orderSendingStatus = useAppSelector(
		cakeOffersDataSelectors.selectOrderSendingStatus
	);

	const formValuesInitial = {
		name: '',
		phone: '',
		address: '',
		comment: ''
	};

	const [isAreaVisible, setIsAreaVisible] = useState<boolean>(false);
	const [formValues, setFormValues] = useState(formValuesInitial);
	const [formErrors, setFormErrors] = useState<Record<string, string>>({});

	const handleAreaButtonClick = () => {
		setIsAreaVisible(prevState => !prevState);
	};

	const validateField = (name: string, value: string): string => {
		const result = validation[name as keyof typeof validation]?.(value);
		return typeof result === 'string' ? result : '';
	};

	const handleIputChange = (
		e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const error = validateField(e.target.name, e.target.value);

		setFormErrors(prevState => ({
			...prevState,
			[e.target.name]: error
		}));

		setFormValues(prevState => ({
			...prevState,
			[e.target.name]: e.target.value
		}));
	};

	const handleFormSubmit = (e: SubmitEvent) => {
		e.preventDefault();

		const errors: Record<string, string> = {};
		const requiredFields = ['name', 'phone', 'address'] as const;

		requiredFields.forEach(field => {
			const error = validateField(field, formValues[field]);
			if (error) {
				errors[field] = error;
			}
		});

		setFormErrors(errors);

		if (Object.keys(errors).length > 0) {
			return;
		}

		onSubmit(formValues);
	};

	const maxLength = 300;
	const commentLength = formValues.comment.length;

	return (
		<form
			onSubmit={handleFormSubmit}
			id="order-registration-form"
			data-testid="order-registration-form"
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
					<svg className={styles.payment__arrow} aria-hidden="true">
						<use xlinkHref="#arrow-sm"></use>
					</svg>
				</div>
			</section>
			<div className={styles.description}>
				Стоимость и время доставки согласуем при подтверждении заказа
			</div>
			<div className={styles.fields}>
			<input
				className={styles.input}
				placeholder="Имя"
				type="text"
				name="name"
				id="name"
				autoComplete="true"
				aria-label="Имя"
				value={formValues.name}
				onChange={handleIputChange}
			/>
				{formErrors.name && (
					<span className="error-message">{formErrors.name}</span>
				)}
			<input
				className={styles.input}
				placeholder="Телефон"
				type="text"
				name="phone"
				id="phone"
				autoComplete="true"
				aria-label="Телефон"
				value={formValues.phone}
				onChange={handleIputChange}
			/>
				{formErrors.phone && (
					<span className="error-message">{formErrors.phone}</span>
				)}
			<input
				className={styles.input}
				placeholder="Адрес"
				type="text"
				name="address"
				id="address"
				autoComplete="true"
				aria-label="Адрес"
				value={formValues.address}
				onChange={handleIputChange}
			/>
				{formErrors.address && (
					<span className="error-message">{formErrors.address}</span>
				)}
			</div>
			<button
				className={styles.areaButton}
				type="button"
				onClick={handleAreaButtonClick}
			>
				Добавить комментарий
			</button>
			{isAreaVisible && (
				<>
				<textarea
					className={styles.textarea}
					name="comment"
					id="comment"
					value={formValues.comment}
					onChange={handleIputChange}
					aria-label="Комментарий к заказу"
				></textarea>
					<span className={styles.counter}>
						{maxLength - commentLength} символов осталось
					</span>
					{formErrors.comment && (
						<span className="error-message">
							{formErrors.comment}
						</span>
					)}
				</>
			)}
			<SubmitButton
				className={`button button_primary ${styles.button}`}
				label="Оформить заказ"
				formId="order-registration-form"
				isDisabled={orderSendingStatus === LoadingStatus.Loading}
			>
				<span>Оформить заказ</span>
			</SubmitButton>
		</form>
	);
};

export default Form;
