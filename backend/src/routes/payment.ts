import { Router, Request, Response } from 'express';
import crypto from 'crypto';

const router = Router();

// Хранилище платежей (в памяти — для демо)
const payments = new Map<
	string,
	{ amount: number; status: 'pending' | 'success' | 'failed' }
>();

/**
 * POST /api/payment — создаёт платёж, возвращает URL для iframe
 * Тело: { amount: number }
 * Ответ: { paymentId: string, paymentUrl: string }
 */
router.post('/', (req: Request, res: Response) => {
	try {
		const { amount } = req.body;

		if (!amount || typeof amount !== 'number' || amount <= 0) {
			return res.status(400).json({ message: 'Некорректная сумма' });
		}

		const paymentId = crypto.randomUUID();
		payments.set(paymentId, { amount, status: 'pending' });

		// URL страницы оплаты для iframe
		const paymentUrl = `/api/payment/pay/${paymentId}`;

		return res.status(201).json({ paymentId, paymentUrl });
	} catch (error) {
		console.error('Ошибка при создании платежа:', error);
		return res.status(500).json({ message: 'Не удалось создать платёж' });
	}
});

/**
 * GET /api/payment/pay/:paymentId — отдаёт HTML-страницу эмуляции оплаты
 */
router.get('/pay/:paymentId', (req: Request, res: Response) => {
	const { paymentId } = req.params;
	const payment = payments.get(paymentId);

	if (!payment) {
		return res.status(404).send('Платёж не найден');
	}

	if (payment.status !== 'pending') {
		return res.status(400).send('Платёж уже обработан');
	}

	// Разрешаем встраивание в iframe на фронтенде
	res.setHeader('Content-Security-Policy', 'frame-ancestors *');

	const html = `
<!DOCTYPE html>
<html lang="ru">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Оплата заказа</title>
	<style>
		* { margin: 0; padding: 0; box-sizing: border-box; }
		body {
			font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
			background: #f8f5f0;
			display: flex;
			justify-content: center;
			align-items: center;
			min-height: 100vh;
			padding: 20px;
		}
		.card {
			background: #fff;
			border-radius: 16px;
			padding: 32px;
			max-width: 400px;
			width: 100%;
			box-shadow: 0 2px 12px rgba(0,0,0,0.08);
		}
		.card__title {
			font-size: 20px;
			font-weight: 700;
			margin-bottom: 24px;
			text-align: center;
			color: #2d2d2d;
		}
		.card__amount {
			font-size: 28px;
			font-weight: 800;
			text-align: center;
			margin-bottom: 28px;
			color: #2d2d2d;
		}
		.card__amount span {
			font-size: 16px;
			font-weight: 400;
			color: #888;
		}
		.form-group {
			margin-bottom: 16px;
		}
		.form-group label {
			display: block;
			font-size: 13px;
			font-weight: 500;
			color: #666;
			margin-bottom: 6px;
		}
		.form-group input {
			width: 100%;
			padding: 12px 14px;
			border: 1.5px solid #e0ddd7;
			border-radius: 10px;
			font-size: 15px;
			outline: none;
			transition: border-color 0.2s;
		}
		.form-group input:focus {
			border-color: #c9a96e;
		}
		.form-row {
			display: flex;
			gap: 12px;
		}
		.form-row .form-group {
			flex: 1;
		}
		.btn {
			width: 100%;
			padding: 14px;
			border: none;
			border-radius: 12px;
			font-size: 16px;
			font-weight: 600;
			cursor: pointer;
			transition: opacity 0.2s;
			margin-top: 8px;
		}
		.btn:hover { opacity: 0.9; }
		.btn:disabled { opacity: 0.5; cursor: not-allowed; }
		.btn_primary {
			background: #c9a96e;
			color: #fff;
		}
		.btn_secondary {
			background: #f0ede8;
			color: #666;
		}
		.error {
			color: #e74c3c;
			font-size: 13px;
			text-align: center;
			margin-top: 12px;
			display: none;
		}
		.success {
			text-align: center;
			padding: 20px 0;
		}
		.success__icon {
			font-size: 48px;
			margin-bottom: 12px;
		}
		.success__text {
			font-size: 18px;
			font-weight: 600;
			color: #2d2d2d;
		}
		.card__footer {
			margin-top: 20px;
			font-size: 12px;
			color: #aaa;
			text-align: center;
		}
		.spinner {
			display: none;
			text-align: center;
			margin: 10px 0;
		}
		.spinner_active {
			display: block;
		}
		.spinner::after {
			content: '';
			display: inline-block;
			width: 20px;
			height: 20px;
			border: 2px solid #e0ddd7;
			border-top-color: #c9a96e;
			border-radius: 50%;
			animation: spin 0.6s linear infinite;
		}
		@keyframes spin { to { transform: rotate(360deg); } }
	</style>
</head>
<body>
	<div class="card" id="app">
		<div class="card__title">Оплата заказа</div>
		<div class="card__amount">
			${payment.amount.toLocaleString('ru-RU')} <span>₽</span>
		</div>

		<div id="payment-form">
			<div class="form-group">
				<label>Номер карты</label>
				<input type="text" id="card-number" inputmode="numeric" placeholder="0000 0000 0000 0000" maxlength="19" autocomplete="cc-number">
			</div>
			<div class="form-row">
				<div class="form-group">
					<label>Срок действия</label>
					<input type="text" id="card-expiry" placeholder="ММ/ГГ" maxlength="5" autocomplete="cc-exp">
				</div>
				<div class="form-group">
					<label>CVC</label>
					<input type="text" id="card-cvc" inputmode="numeric" placeholder="123" maxlength="4" autocomplete="cc-csc">
				</div>
			</div>
			<div class="form-group">
				<label>Владелец карты</label>
				<input type="text" id="card-name" placeholder="IVAN IVANOV" autocomplete="cc-name">
			</div>

			<div class="spinner" id="spinner"></div>
			<div class="error" id="error">Ошибка оплаты. Проверьте данные карты.</div>

			<button class="btn btn_primary" id="pay-btn" type="button">Оплатить</button>
			<button class="btn btn_secondary" id="cancel-btn" type="button">Отменить</button>
		</div>

		<div id="payment-success" style="display:none;">
			<div class="success">
				<div class="success__icon">✅</div>
				<div class="success__text">Оплата прошла успешно!</div>
			</div>
		</div>

		<div class="card__footer">Защищённое соединение • Данные не сохраняются</div>
	</div>

	<script>
		const paymentId = '${paymentId}';
		const cardNumber = document.getElementById('card-number');
		const cardExpiry = document.getElementById('card-expiry');
		const cardCvc = document.getElementById('card-cvc');
		const cardName = document.getElementById('card-name');
		const payBtn = document.getElementById('pay-btn');
		const cancelBtn = document.getElementById('cancel-btn');
		const errorEl = document.getElementById('error');
		const spinner = document.getElementById('spinner');
		const formEl = document.getElementById('payment-form');
		const successEl = document.getElementById('payment-success');

		// Форматирование номера карты
		cardNumber.addEventListener('input', function() {
			let value = this.value.replace(/\\D/g, '');
			if (value.length > 16) value = value.slice(0, 16);
			this.value = value.replace(/(\\d{4})(?=\\d)/g, '$1 ');
		});

		// Форматирование срока действия
		cardExpiry.addEventListener('input', function() {
			let value = this.value.replace(/\\D/g, '');
			if (value.length > 4) value = value.slice(0, 4);
			if (value.length > 2) {
				this.value = value.slice(0, 2) + '/' + value.slice(2);
			} else {
				this.value = value;
			}
		});

		// Форматирование CVC
		cardCvc.addEventListener('input', function() {
			this.value = this.value.replace(/\\D/g, '').slice(0, 3);
		});

		function setLoading(loading) {
			payBtn.disabled = loading;
			cancelBtn.disabled = loading;
			spinner.classList.toggle('spinner_active', loading);
		}

		// Успешная оплата
		async function confirmPayment() {
			try {
				await fetch('/api/payment/confirm', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ paymentId, status: 'success' })
				});
			} catch {}
		}

		// Обработка оплаты
		payBtn.addEventListener('click', async function() {
			errorEl.style.display = 'none';

			// Простейшая валидация
			const num = cardNumber.value.replace(/\\s/g, '');
			if (num.length < 16) {
				errorEl.textContent = 'Введите корректный номер карты';
				errorEl.style.display = 'block';
				return;
			}
			if (cardExpiry.value.length < 5) {
				errorEl.textContent = 'Введите срок действия карты';
				errorEl.style.display = 'block';
				return;
			}
			if (cardCvc.value.length < 3) {
				errorEl.textContent = 'Введите CVC-код';
				errorEl.style.display = 'block';
				return;
			}

			setLoading(true);

			// Имитация обработки платежа
			await new Promise(resolve => setTimeout(resolve, 1500));

			// Всегда успех для демо (кроме тестового номера 0000)
			if (num === '0000000000000000') {
				errorEl.textContent = 'Ошибка оплаты. Карта отклонена.';
				errorEl.style.display = 'block';
				setLoading(false);
				return;
			}

			await confirmPayment();

			formEl.style.display = 'none';
			successEl.style.display = 'block';
			setLoading(false);
		});

		// Отмена оплаты
		cancelBtn.addEventListener('click', async function() {
			try {
				await fetch('/api/payment/confirm', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ paymentId, status: 'failed' })
				});
			} catch {}

			// Пересылаем сообщение родительскому окну
			window.parent.postMessage({ type: 'payment-cancelled', paymentId }, '*');
		});

		// Слушаем сообщения от родительского окна (например, закрыть iframe)
		window.addEventListener('message', function(event) {
			if (event.data.type === 'payment-complete') {
				// Если родитель подтвердил — ничего не делаем
			}
		});
	</script>
</body>
</html>`;

	return res.send(html);
});

/**
 * POST /api/payment/confirm — подтверждение/отмена платежа
 * Тело: { paymentId: string, status: 'success' | 'failed' }
 */
router.post('/confirm', (req: Request, res: Response) => {
	const { paymentId, status } = req.body;

	if (!paymentId || !status) {
		return res
			.status(400)
			.json({ message: 'Не указан paymentId или status' });
	}

	const payment = payments.get(paymentId);
	if (!payment) {
		return res.status(404).json({ message: 'Платёж не найден' });
	}

	if (payment.status !== 'pending') {
		return res.status(400).json({ message: 'Платёж уже обработан' });
	}

	if (status === 'success' || status === 'failed') {
		payment.status = status;
		return res.json({ paymentId, status: payment.status });
	}

	return res.status(400).json({ message: 'Некорректный статус' });
});

/**
 * GET /api/payment/status/:paymentId — проверка статуса платежа
 */
router.get('/status/:paymentId', (req: Request, res: Response) => {
	const { paymentId } = req.params;
	const payment = payments.get(paymentId);

	if (!payment) {
		return res.status(404).json({ message: 'Платёж не найден' });
	}

	return res.json({
		paymentId,
		status: payment.status,
		amount: payment.amount
	});
});

export default router;
