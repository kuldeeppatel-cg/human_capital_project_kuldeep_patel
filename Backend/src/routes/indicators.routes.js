import express from 'express';
import { getIndicators, createIndicator } from '../controllers/indicators.controller.js';

const router = express.Router();

router.get('/', getIndicators);
router.post('/', createIndicator);

export default router;
