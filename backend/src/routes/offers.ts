import { Router, Request, Response } from 'express';
import fs from 'fs';
import path from 'path';

const router = Router();
const OFFERS_PATH = path.join(__dirname, '../../data/offers.json');

router.get('/', (_req: Request, res: Response) => {
  try {
    const data = fs.readFileSync(OFFERS_PATH, 'utf-8');
    res.json(JSON.parse(data));
  } catch (error) {
    console.error('Ошибка чтения offers.json:', error);
    res.status(500).json({ message: 'Не удалось загрузить предложения' });
  }
});

export default router;
