import { Router, Request, Response } from 'express';
import type { FrontendOrder } from '../types/order';
import { connectDB, getDB, saveDB } from '../db';
import sendOrderEmail from '../services/email';
import {
	sendTelegramMessage,
	formatOrderMessage,
	initTelegram
} from '../services/telegram';
import { createOrderSchema } from '../utils/validation';
import { mapFrontendOrderToDTO, validateFinalSum } from '../utils/orderMapper';
import { TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID } from '../config';
import idempotencyMiddleware from '../middleware/idempotency';

const router = Router();

router.post('/', idempotencyMiddleware, async (req: Request, res: Response) => {
	try {
		const parseResult = createOrderSchema.safeParse(req.body);

		if (!parseResult.success) {
			console.log(
				'VALIDATION ERROR',
				parseResult.error.flatten().fieldErrors
			);
			return res.status(400).json({
				message: 'Ошибка валидации',
				errors: parseResult.error.flatten().fieldErrors
			});
		}

		const frontendOrder: FrontendOrder = parseResult.data;

		// Проверяем соответствие итоговой суммы
		const priceValidation = validateFinalSum(frontendOrder);
		if (!priceValidation.valid) {
			return res.status(400).json({
				message: 'Ошибка валидации цены',
				error: priceValidation.error
			});
		}

		const orderData = mapFrontendOrderToDTO(frontendOrder);

		await connectDB();
		const db = getDB();

		db.run(
			`INSERT INTO orders (
        customer_name, customer_phone, customer_email,
        delivery_method, delivery_address, delivery_date, delivery_time,
        comment, total_price, items
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
			[
				orderData.customerName,
				orderData.customerPhone,
				orderData.customerEmail || null,
				orderData.deliveryMethod,
				orderData.deliveryAddress || null,
				orderData.deliveryDate,
				orderData.deliveryTime,
				orderData.comment || null,
				orderData.totalPrice,
				JSON.stringify(orderData.items)
			]
		);

		saveDB();

		const idResult = db.exec('SELECT MAX(id) as id FROM orders');
		const orderId = Number(idResult[0]?.values[0]?.[0]);

		initTelegram(TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID);
		const telegramText = formatOrderMessage({
			...orderData,
			id: orderId
		});

		const sendTelegramPromise = sendTelegramMessage(telegramText);
		const sendEmailPromise = sendOrderEmail(orderData.customerEmail || '', {
			...orderData,
			id: orderId
		});

		await Promise.allSettled([sendTelegramPromise, sendEmailPromise]);

		return res.status(201).json({ id: orderId });
	} catch (error) {
		console.error('Ошибка при создании заказа:', error);
		return res.status(500).json({ message: 'Не удалось создать заказ' });
	}
});

export default router;
