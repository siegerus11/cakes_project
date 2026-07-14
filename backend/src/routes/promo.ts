import { Router, Request, Response } from 'express';
import { z } from 'zod';

import { PROMO_CODE } from '../utils/discount';
import { DISCOUNT_PERCENT } from '../config';
import { calculateDiscountedPrice } from '../utils/discount';

const router = Router();

const promoRequestSchema = z.object({
	code: z.string(),
	shoppingCart: z.array(
		z.object({
			price: z.number().positive(),
			quantity: z.number().int().positive()
		})
	)
});

router.post('/', (req: Request, res: Response) => {
	try {
		const parseResult = promoRequestSchema.safeParse(req.body);

		if (!parseResult.success) {
			return res.status(400).json({
				message: 'Неверный формат запроса',
				valid: false
			});
		}

		const { code, shoppingCart } = parseResult.data;

		if (code !== PROMO_CODE) {
			return res.status(400).json({
				message: 'Неверный промокод',
				valid: false
			});
		}

		const originalSum = shoppingCart.reduce(
			(sum, item) => sum + item.price * item.quantity,
			0
		);

		const discountedSum = calculateDiscountedPrice(originalSum);

		return res.status(200).json({
			valid: true,
			discount: DISCOUNT_PERCENT,
			originalSum,
			discountedSum
		});
	} catch (error) {
		console.error('Ошибка при обработке промокода:', error);
		return res.status(500).json({
			message: 'Не удалось применить промокод',
			valid: false
		});
	}
});

export default router;
