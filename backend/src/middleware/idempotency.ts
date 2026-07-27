import { Request, Response, NextFunction } from 'express';
import crypto from 'crypto';
import { getDB } from '../db';

// Middleware идемпотентности для POST /api/orders.
// Вычисляет SHA256-хеш от тела запроса и проверяет,
// не обрабатывался ли уже такой запрос. Если обрабатывался —
// возвращает сохранённый ответ, не создавая дубликат.
// Это защищает от дублей заказов при повторной отправке формы
// (таймауты, повторный клик, проблемы с сетью).

export default function idempotencyMiddleware(
	req: Request,
	res: Response,
	next: NextFunction
): void {
	// Работаем только с POST-запросами
	if (req.method !== 'POST') {
		next();
		return;
	}

	try {
		const bodyHash = crypto
			.createHash('sha256')
			.update(JSON.stringify(req.body))
			.digest('hex');

		const db = getDB();
		const existing = db.exec(
			'SELECT response_body, status_code FROM idempotency_keys WHERE key_hash = ?',
			[bodyHash]
		);

		if (existing.length > 0 && existing[0].values.length > 0) {
			const row = existing[0].values[0];
			const responseBody = row[0] as string;
			const statusCode = row[1] as number;

			console.log(
				`[Idempotency] Найден существующий заказ с хешем ${bodyHash.slice(
					0,
					12
				)}..., возвращаю сохранённый ответ`
			);

			res.status(statusCode).json(JSON.parse(responseBody));
			return;
		}

		// Сохраняем оригинальный res.json, чтобы перехватить ответ
		const originalJson = res.json.bind(res);

		res.json = function (body: unknown): Response {
			// Сохраняем ответ в таблицу идемпотентности
			try {
				db.run(
					'INSERT OR IGNORE INTO idempotency_keys (key_hash, response_body, status_code) VALUES (?, ?, ?)',
					[bodyHash, JSON.stringify(body), res.statusCode]
				);
			} catch (err) {
				console.error('[Idempotency] Ошибка сохранения ключа:', err);
			}

			return originalJson(body);
		};

		next();
	} catch (error) {
		console.error('[Idempotency] Ошибка:', error);
		next();
	}
}
