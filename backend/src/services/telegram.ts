import type { OrderItem } from '../types/order';

let botToken: string;
let chatId: string;
let sendMessageUrl: string;

function escapeHtml(text: string): string {
	return text.replace(/[&<>"']/g, (c) => ({
		'&': '&amp;',
		'<': '&lt;',
		'"': '&quot;',
		"'": '&#39;'
	}[c] as string));
}

export function initTelegram(token: string, chatIdValue: string): void {
	if (!botToken) {
		botToken = token;
		chatId = chatIdValue;
		sendMessageUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;
	}
}

export async function sendTelegramMessage(text: string): Promise<void> {
	if (!botToken || !chatId) {
		console.warn('Telegram не настроен. Проверьте переменные окружения.');
		return;
	}

	const payload = {
		chat_id: chatId,
		text,
		parse_mode: 'HTML'
	};

	const response = await fetch(sendMessageUrl, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(payload)
	});

	const result = (await response.json()) as {
		ok: boolean;
		description?: string;
	};

	if (!result.ok) {
		console.error('Ошибка отправки в Telegram:', result.description);
	}
}

export function formatOrderMessage(orderData: {
	id: number;
	customerName: string;
	customerPhone: string;
	customerEmail?: string;
	deliveryMethod: string;
	deliveryAddress?: string;
	deliveryDate: string;
	deliveryTime: string;
	comment?: string;
	totalPrice: number;
	originalPrice?: number;
	items: OrderItem[];
}): string {
	const deliveryIcon = orderData.deliveryMethod === 'delivery' ? '🚚' : '🏪';
	const deliveryText =
		orderData.deliveryMethod === 'pickup'
			? 'Самовывоз'
			: `Доставка по адресу: ${escapeHtml(orderData.deliveryAddress || '')}`;

	const items = orderData.items
		.map(item => {
			let text = `• ${escapeHtml(item.name)} (${item.weight}кг)`;
			if (item.fillings && item.fillings.length > 0) {
				const fillingNames = item.fillings
					.map(f => escapeHtml(f.name))
					.join(', ');
				text += `, начинка: ${fillingNames}`;
			}
			if (item.optional && item.optional.length > 0) {
				const optionalNames = item.optional
					.map(o => escapeHtml(o.name))
					.join(', ');
				text += `, дополнения: ${optionalNames}`;
			}
			return text;
		})
		.join('\n');

	const priceBlock =
		orderData.originalPrice !== undefined
			? `💰 <b>Итого:</b> ${orderData.totalPrice}₽ (<s>${orderData.originalPrice}₽</s>)`
			: `💰 <b>Итого:</b> ${orderData.totalPrice}₽`;

	return `
<b>🛒 Новый заказ #${orderData.id}</b>

👤 <b>Клиент:</b> ${escapeHtml(orderData.customerName)}
📱 <b>Телефон:</b> ${escapeHtml(orderData.customerPhone)}
${orderData.customerEmail ? `📧 <b>Email:</b> ${escapeHtml(orderData.customerEmail)}` : ''}

${deliveryIcon} <b>${deliveryText}</b>
📅 <b>Дата:</b> ${escapeHtml(orderData.deliveryDate)}
⏰ <b>Время:</b> ${escapeHtml(orderData.deliveryTime)}
${orderData.comment ? `💬 <b>Комментарий:</b> ${escapeHtml(orderData.comment)}` : ''}

<b>Товары:</b>
${items}

${priceBlock}
	 `.trim();
}
