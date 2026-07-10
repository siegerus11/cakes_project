async function sendOrderEmail(
	_to: string,
	_data: Record<string, unknown>
): Promise<void> {
	console.log('EMAIL: отправка уведомления о заказе отключена в заглушке');
}

export default sendOrderEmail;
