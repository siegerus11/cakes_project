import {
	useState,
	FormEvent,
	ChangeEvent,
	useRef,
	useEffect,
	useCallback
} from 'react';

import SubmitButton from '../../../components/ui/button/submit-button';
import BACKEND_URL from '../../../config/env';
import { validation, LoadingStatus, APIRoute } from '../../../constants';
import { useAppSelector } from '../../../hooks/useStore';
import { cakeOffersDataSelectors } from '../../../store/cake-offers-data/cake-offers-data';
import styles from './form.module.scss';

type FormProps = {
	onSubmit: (formValues: {
		name: string;
		phone: string;
		address: string;
		comment: string;
	}) => void;
	getPaymantStatus: (status: boolean) => void;
	finalSum: number;
};

type PaymentStatus = 'idle' | 'pending' | 'processing' | 'success' | 'failed';

const Form = ({ onSubmit, finalSum, getPaymantStatus }: FormProps) => {
	const orderSendingStatus = useAppSelector(
		cakeOffersDataSelectors.selectOrderSendingStatus
	);
	const iframeRef = useRef<HTMLIFrameElement>(null);

	const formValuesInitial = {
		name: '',
		phone: '',
		address: '',
		comment: ''
	};

	const [isAreaVisible, setIsAreaVisible] = useState<boolean>(false);
	const [formValues, setFormValues] = useState(formValuesInitial);
	const [formErrors, setFormErrors] = useState<Record<string, string>>({});
	const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>('idle');
	const [paymentUrl, setPaymentUrl] = useState<string | null>(null);
	const [paymentId, setPaymentId] = useState<string | null>(null);
	const [paymentError, setPaymentError] = useState<string | null>(null);

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

	// Создание платежа и открытие iframe
	const handleCreatePayment = async (): Promise<boolean> => {
		try {
			setPaymentStatus('pending');
			setPaymentError(null);
			getPaymantStatus(true);

			const response = await fetch(`${BACKEND_URL}/${APIRoute.payment}`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ amount: finalSum })
			});

			if (!response.ok) {
				throw new Error('Payment creation failed');
			}

			const data = (await response.json()) as {
				paymentId: string;
				paymentUrl: string;
			};
			setPaymentId(data.paymentId);
			// Формируем полный URL для iframe (бэкенд отдаёт относительный)
			setPaymentUrl(`${BACKEND_URL}${data.paymentUrl}`);
			setPaymentStatus('processing');

			return true;
		} catch (err) {
			setPaymentStatus('failed');
			setPaymentError('Не удалось создать платёж. Попробуйте позже.');
			getPaymantStatus(false);
			return false;
		}
	};

	// Обработчик сообщений от iframe
	const handleIframeMessage = useCallback(
		(event: MessageEvent) => {
			if (!paymentUrl) return;

			if (event.data?.type === 'payment-cancelled') {
				setPaymentStatus('idle');
				setPaymentUrl(null);
				setPaymentId(null);
				getPaymantStatus(false);
			}
		},
		[paymentUrl, getPaymantStatus]
	);

	useEffect(() => {
		window.addEventListener('message', handleIframeMessage);
		return () => window.removeEventListener('message', handleIframeMessage);
	}, [handleIframeMessage]);

	// Проверка статуса платежа (поллинг)
	const checkPaymentStatus = useCallback(async (): Promise<boolean> => {
		if (!paymentId) return false;

		try {
			const response = await fetch(
				`${BACKEND_URL}/${APIRoute.payment}/status/${paymentId}`
			);

			if (!response.ok) {
				return false;
			}

			const data = (await response.json()) as { status: string };

			if (data.status === 'success') {
				setPaymentStatus('success');
				return true;
			}

			if (data.status === 'failed') {
				setPaymentStatus('failed');
				setPaymentError('Платёж был отклонён');
				return false;
			}

			return false;
		} catch {
			return false;
		}
	}, [paymentId]);

	// Периодическая проверка статуса платежа
	useEffect(() => {
		if (paymentStatus !== 'processing' || !paymentId) {
			return undefined;
		}

		const interval = setInterval(async () => {
			const isSuccess = await checkPaymentStatus();
			if (isSuccess) {
				clearInterval(interval);
			}
		}, 2000);

		return () => {
			clearInterval(interval);
		};
	}, [paymentStatus, paymentId, checkPaymentStatus]);

	// Когда платеж успешен — вызываем onSubmit
	useEffect(() => {
		if (paymentStatus === 'success') {
			onSubmit(formValues);
		}
	}, [paymentStatus]); // eslint-disable-line react-hooks/exhaustive-deps

	const handleFormSubmit = async (e: FormEvent) => {
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

		// Создаём платёж и открываем iframe
		await handleCreatePayment();
	};

	const handleRetryPayment = () => {
		setPaymentStatus('idle');
		setPaymentUrl(null);
		setPaymentId(null);
		setPaymentError(null);
	};

	const maxLength = 300;
	const commentLength = formValues.comment.length;

	const isSubmitting = orderSendingStatus === LoadingStatus.Loading;
	const isPaymentPending =
		paymentStatus === 'pending' || paymentStatus === 'processing';

	let buttonLabel = 'Оформить заказ';
	if (isPaymentPending) {
		buttonLabel = 'Ожидание оплаты...';
	} else if (paymentStatus === 'success') {
		buttonLabel = 'Оформляем...';
	}

	return (
		<form
			onSubmit={handleFormSubmit}
			id="order-registration-form"
			data-testid="order-registration-form"
		>
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
						{paymentStatus === 'success'
							? 'Оплачено'
							: 'Оплата банковской картой'}
					</h2>
				</div>

				{/* Iframe с оплатой */}
				{paymentUrl && paymentStatus === 'processing' && (
					<div className={styles.payment__iframeWrapper}>
						<div className={styles.payment__iframeHeader}>
							<span>
								Оплата {finalSum.toLocaleString('ru-RU')} ₽
							</span>
						</div>
						<iframe
							ref={iframeRef}
							src={paymentUrl}
							className={styles.payment__iframe}
							title="Оплата банковской картой"
							allow="payment"
							sandbox="allow-scripts allow-forms allow-same-origin"
						/>
					</div>
				)}

				{/* Ошибка оплаты */}
				{paymentStatus === 'failed' && (
					<div className={styles.payment__error}>
						<p className={styles.payment__errorText}>
							{paymentError || 'Ошибка оплаты'}
						</p>
						<button
							type="button"
							className={styles.payment__retryButton}
							onClick={handleRetryPayment}
						>
							Попробовать снова
						</button>
					</div>
				)}

				{/* Успешная оплата */}
				{paymentStatus === 'success' && (
					<div className={styles.payment__success}>
						<svg
							viewBox="0 0 18 18"
							className={styles.payment__successIcon}
						>
							<use xlinkHref="#check"></use>
						</svg>
						<span>
							Оплачено {finalSum.toLocaleString('ru-RU')} ₽
						</span>
					</div>
				)}
			</section>
			<div className={styles.description}>
				Стоимость и время доставки согласуем при подтверждении заказа
				<br /> <br />
				Что бы перейти к оплате, заполните поля ниже и нажмите «Оформить
				заказ»
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
					disabled={isPaymentPending}
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
					disabled={isPaymentPending}
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
					disabled={isPaymentPending}
				/>
				{formErrors.address && (
					<span className="error-message">{formErrors.address}</span>
				)}
			</div>
			<button
				className={styles.areaButton}
				type="button"
				onClick={handleAreaButtonClick}
				disabled={isPaymentPending}
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
						aria-label="comment"
						disabled={isPaymentPending}
					></textarea>
					<span className={styles.counter}>
						осталось {maxLength - commentLength} символов
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
				isDisabled={isSubmitting || isPaymentPending}
			>
				<span>{buttonLabel}</span>
			</SubmitButton>
		</form>
	);
};

export default Form;
