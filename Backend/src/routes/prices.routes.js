import express from 'express';
import { getPrices } from '../controllers/prices.controller.js';

const router = express.Router();

router.get('/', getPrices);

export default router;
