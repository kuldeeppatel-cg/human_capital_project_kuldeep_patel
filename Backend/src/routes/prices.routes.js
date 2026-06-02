import express from 'express';
import {
  getPrices,
  getPriceById,
  createPrice,
  replacePrice,
  updatePrice,
  deletePrice
} from '../controllers/prices.controller.js';

const router = express.Router();

router.get('/', getPrices);
router.get('/:priceId', getPriceById);
router.post('/', createPrice);
router.put('/:priceId', replacePrice);
router.patch('/:priceId', updatePrice);
router.delete('/:priceId', deletePrice);

export default router;



