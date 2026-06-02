import Price from '../models/Price.js';

// @desc    Fetch all price records
// @route   GET /prices
// @access  Public
export const getPrices = async (req, res) => {
  try {
    const prices = await Price.find({}).sort({ year: -1, month: -1 });
    res.status(200).json(prices);
  } catch (error) {
    res.status(500).json({
      message: 'Failed to fetch price records',
      error: error.message
    });
  }
};
