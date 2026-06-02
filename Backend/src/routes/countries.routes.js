import express from 'express';
import { getCountries, createCountry } from '../controllers/countries.controller.js';

const router = express.Router();

router.get('/', getCountries);
router.post('/', createCountry);

export default router;
