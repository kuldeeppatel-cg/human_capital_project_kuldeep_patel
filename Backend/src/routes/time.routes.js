import express from 'express';
import { getMonths, getYears } from '../controllers/time.controller.js';

const router = express.Router();

router.get('/months', getMonths);
router.get('/years', getYears);

export default router;
