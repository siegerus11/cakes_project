import { z } from 'zod';
import type { OrderItem, FrontendOrder } from '../types/order';

const phoneRegex = /^\+7\d{10}$/;

function normalizePhone(phone: string): string {
	const digits = phone.replace(/\D/g, '');

	if (digits.startsWith('8') && digits.length === 11) {
		return `+7${digits.slice(1)}`;
	}

	if (
		digits.length === 11 &&
		(digits.startsWith('7') || digits.startsWith('8'))
	) {
		return `+7${digits.slice(1)}`;
	}

	if (digits.length === 10) {
		return `+7${digits}`;
	}

	return phone;
}

export const createOrderSchema = z.object({
	shoppingCart: z
		.array(
			z.object({
				orderId: z.string().min(1),
				cakeId: z.string().min(1),
				title: z.string().min(1),
				image: z.string().min(1),
				weight: z.array(
					z.object({
						weightValue: z.number().positive(),
						isChecked: z.boolean(),
						value: z.number().optional()
					})
				),
				filling: z.record(z.string(), z.boolean()),
				optional: z.record(z.string(), z.boolean()),
				price: z.number().positive('Цена должна быть больше 0'),
				quantity: z
					.number()
					.int()
					.positive('Количество должно быть больше 0')
			})
		)
		.min(1, 'Заказ должен содержать хотя бы один товар'),
	userData: z.object({
		name: z.string().min(2, 'Имя слишком короткое'),
		phone: z
			.string()
			.transform(normalizePhone)
			.refine(
				val => phoneRegex.test(val),
				'Телефон должен быть в формате +7XXXXXXXXXX'
			),
		address: z.string().refine(val => val === '' || val.trim().length >= 6, { message: 'Адрес слишком короткий' }).optional(),
		comment: z.string().optional().or(z.literal(''))
	}),
	finalSum: z.number().positive('Итоговая сумма должна быть больше 0')
}) as z.ZodType<FrontendOrder>;

export type ValidatedOrderData = z.infer<typeof createOrderSchema>;
