import path from 'path';

export const SERVER_PORT = Number(process.env.PORT) || 4000;
export const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || '';
export const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID || '';
export const EMAIL_SERVICE = process.env.EMAIL_SERVICE || 'gmail';
export const EMAIL_USER = process.env.EMAIL_USER || '';
export const EMAIL_APP_PASSWORD = process.env.EMAIL_APP_PASSWORD || '';
export const EMAIL_TO = process.env.EMAIL_TO || EMAIL_USER;
export const DB_PATH =
	process.env.DB_PATH || path.join(__dirname, '../cakes.db');
export const CORS_ORIGIN = process.env.CORS_ORIGIN || 'http://localhost:3000';
export const DISCOUNT_PERCENT = Number(process.env.DISCOUNT_PERCENT) || 15;

export function validateConfig(): void {
	const missing: string[] = [];

	if (!TELEGRAM_BOT_TOKEN) missing.push('TELEGRAM_BOT_TOKEN');
	if (!TELEGRAM_CHAT_ID) missing.push('TELEGRAM_CHAT_ID');

	if (missing.length > 0) {
		throw new Error(
			`В .env отсутствуют обязательные переменные: ${missing.join(', ')}`
		);
	}
}
