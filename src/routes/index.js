import { Router } from 'express';
import ErrorHandler from '../middleware/error';

const router = Router();

router.get('/', (_, res) => res.status(200).json({ message: 'API is running...' }));

router.all('/*', ErrorHandler.notFound);

export default router;
