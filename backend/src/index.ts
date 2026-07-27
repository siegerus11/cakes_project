import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import 'dotenv/config';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { validateConfig, CORS_ORIGIN } from './config';
import { connectDB } from './db';
import ordersRouter from './routes/orders';
import offersRouter from './routes/offers';
import promoRouter from './routes/promo';
import paymentRouter from './routes/payment';

validateConfig();

const app = express();
const PORT = process.env.PORT || 4000;

// CSRF protection middleware - проверка заголовка для API запросов
function csrfProtection(req: Request, res: Response, next: NextFunction): void {
	const contentType = req.get('Content-Type');
	if (contentType && contentType.includes('application/json')) {
		const origin = req.get('Origin');
		const allowedOrigins = CORS_ORIGIN.split(',').map(o => o.trim());

		if (origin && !allowedOrigins.includes(origin)) {
			res.status(403).json({ message: 'CSRF check failed' });
			return;
		}
	}
	next();
}

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000,
	max: 100,
	message: { message: 'Слишком много запросов, попробуйте позже' }
});

app.use('/api/', limiter);

app.use(
	cors({
		origin: CORS_ORIGIN.split(',').map(o => o.trim())
	})
);
app.use(express.json({ limit: '1mb' }));
app.use(helmet());

app.get('/health', (_req, res) => {
	res.json({ status: 'ok' });
});

app.use('/api/offers', offersRouter);
app.use('/api/promo', csrfProtection, promoRouter);
app.use('/api/orders', csrfProtection, ordersRouter);
app.use('/api/payment', paymentRouter);

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});

connectDB().catch(error => {
	console.error('Failed to connect to database:', error);
	process.exit(1);
});
