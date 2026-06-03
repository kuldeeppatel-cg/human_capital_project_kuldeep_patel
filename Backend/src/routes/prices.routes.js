import express from 'express';
import {
  getPrices,
  getPriceById,
  createPrice,
  replacePrice,
  updatePrice,
  deletePrice,
  getPricesByCountry,
  getPricesByYear,
  getPricesByMonth,
  getPricesByIndicator,
  getPricesByValue
} from '../controllers/prices.controller.js';

const router = express.Router();

router.get('/', getPrices);
router.get('/country/:countryCode', getPricesByCountry);
router.get('/year/:year', getPricesByYear);
router.get('/month/:month', getPricesByMonth);
router.get('/indicator/:indicator', getPricesByIndicator);
router.get('/value/:value', getPricesByValue);
router.get('/:priceId', getPriceById);
router.post('/', createPrice);
router.put('/:priceId', replacePrice);
router.patch('/:priceId', updatePrice);
router.delete('/:priceId', deletePrice);

export default router;




