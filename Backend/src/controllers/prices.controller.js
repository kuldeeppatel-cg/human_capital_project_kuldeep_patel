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

// @desc    Fetch single price record using ID
// @route   GET /prices/:priceId
// @access  Public
export const getPriceById = async (req, res) => {
  try {
    const price = await Price.findById(req.params.priceId);
    if (!price) {
      return res.status(404).json({ message: 'Price record not found' });
    }
    res.status(200).json(price);
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid price ID format' });
    }
    res.status(500).json({
      message: 'Failed to fetch price record',
      error: error.message
    });
  }
};

// @desc    Create new price record
// @route   POST /prices
// @access  Public
export const createPrice = async (req, res) => {
  const {
    countryCode,
    country,
    indicator,
    indicatorName,
    year,
    month,
    value,
    freq,
    frequency
  } = req.body;

  // Validation
  if (
    !countryCode ||
    !country ||
    !indicator ||
    !indicatorName ||
    year === undefined ||
    month === undefined ||
    value === undefined ||
    !freq ||
    !frequency
  ) {
    return res.status(400).json({ message: 'All price fields are required' });
  }

  try {
    const newPrice = new Price({
      countryCode,
      country,
      indicator,
      indicatorName,
      year,
      month,
      value,
      freq,
      frequency
    });

    const savedPrice = await newPrice.save();
    res.status(201).json(savedPrice);
  } catch (error) {
    res.status(500).json({
      message: 'Failed to create price record',
      error: error.message
    });
  }
};

// @desc    Replace complete price record (PUT)
// @route   PUT /prices/:priceId
// @access  Public
export const replacePrice = async (req, res) => {
  const {
    countryCode,
    country,
    indicator,
    indicatorName,
    year,
    month,
    value,
    freq,
    frequency
  } = req.body;

  // Validation
  if (
    !countryCode ||
    !country ||
    !indicator ||
    !indicatorName ||
    year === undefined ||
    month === undefined ||
    value === undefined ||
    !freq ||
    !frequency
  ) {
    return res.status(400).json({ message: 'All price fields are required for replacement' });
  }

  try {
    const updatedPrice = await Price.findByIdAndUpdate(
      req.params.priceId,
      {
        countryCode,
        country,
        indicator,
        indicatorName,
        year,
        month,
        value,
        freq,
        frequency
      },
      { new: true, runValidators: true }
    );

    if (!updatedPrice) {
      return res.status(404).json({ message: 'Price record not found' });
    }

    res.status(200).json(updatedPrice);
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid price ID format' });
    }
    res.status(500).json({
      message: 'Failed to replace price record',
      error: error.message
    });
  }
};

// @desc    Update specific price fields (PATCH)
// @route   PATCH /prices/:priceId
// @access  Public
export const updatePrice = async (req, res) => {
  try {
    const updatedPrice = await Price.findByIdAndUpdate(
      req.params.priceId,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!updatedPrice) {
      return res.status(404).json({ message: 'Price record not found' });
    }

    res.status(200).json(updatedPrice);
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid price ID format' });
    }
    res.status(500).json({
      message: 'Failed to update price record',
      error: error.message
    });
  }
};

// @desc    Delete price record
// @route   DELETE /prices/:priceId
// @access  Public
export const deletePrice = async (req, res) => {
  try {
    const deletedPrice = await Price.findByIdAndDelete(req.params.priceId);

    if (!deletedPrice) {
      return res.status(404).json({ message: 'Price record not found' });
    }

    res.status(200).json({
      message: 'Price record deleted successfully',
      id: req.params.priceId,
      deletedRecord: deletedPrice
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid price ID format' });
    }
    res.status(500).json({
      message: 'Failed to delete price record',
      error: error.message
    });
  }
};

// @desc    Fetch prices by country code
// @route   GET /prices/country/:countryCode
// @access  Public
export const getPricesByCountry = async (req, res) => {
  try {
    const countryCode = req.params.countryCode.trim().toUpperCase();
    const prices = await Price.find({ countryCode }).sort({ year: -1, month: -1 });
    res.status(200).json(prices);
  } catch (error) {
    res.status(500).json({
      message: 'Failed to fetch prices by country',
      error: error.message
    });
  }
};

// @desc    Fetch prices by year
// @route   GET /prices/year/:year
// @access  Public
export const getPricesByYear = async (req, res) => {
  try {
    const year = parseInt(req.params.year, 10);
    if (isNaN(year)) {
      return res.status(400).json({ message: 'Invalid year format' });
    }
    const prices = await Price.find({ year }).sort({ month: -1 });
    res.status(200).json(prices);
  } catch (error) {
    res.status(500).json({
      message: 'Failed to fetch prices by year',
      error: error.message
    });
  }
};

// @desc    Fetch prices by month
// @route   GET /prices/month/:month
// @access  Public
export const getPricesByMonth = async (req, res) => {
  try {
    const month = parseInt(req.params.month, 10);
    if (isNaN(month)) {
      return res.status(400).json({ message: 'Invalid month format' });
    }
    const prices = await Price.find({ month }).sort({ year: -1 });
    res.status(200).json(prices);
  } catch (error) {
    res.status(500).json({
      message: 'Failed to fetch prices by month',
      error: error.message
    });
  }
};

// @desc    Fetch prices by indicator
// @route   GET /prices/indicator/:indicator
// @access  Public
export const getPricesByIndicator = async (req, res) => {
  try {
    const indicator = req.params.indicator.trim();
    const prices = await Price.find({
      indicator: { $regex: new RegExp(`^${indicator}$`, 'i') }
    }).sort({ year: -1, month: -1 });
    res.status(200).json(prices);
  } catch (error) {
    res.status(500).json({
      message: 'Failed to fetch prices by indicator',
      error: error.message
    });
  }
};

// @desc    Fetch prices by value
// @route   GET /prices/value/:value
// @access  Public
export const getPricesByValue = async (req, res) => {
  try {
    const value = parseFloat(req.params.value);
    if (isNaN(value)) {
      return res.status(400).json({ message: 'Invalid value format' });
    }
    const prices = await Price.find({ value }).sort({ year: -1, month: -1 });
    res.status(200).json(prices);
  } catch (error) {
    res.status(500).json({
      message: 'Failed to fetch prices by value',
      error: error.message
    });
  }
};




