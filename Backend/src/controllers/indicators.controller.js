import Indicator from '../models/Indicator.js';

// @desc    Fetch all indicators
// @route   GET /indicators
// @access  Public
export const getIndicators = async (req, res) => {
  try {
    const indicators = await Indicator.find({}).sort({ name: 1 });
    res.status(200).json(indicators);
  } catch (error) {
    res.status(500).json({
      message: 'Failed to fetch indicators',
      error: error.message
    });
  }
};

// @desc    Create new indicator
// @route   POST /indicators
// @access  Public
export const createIndicator = async (req, res) => {
  const { code, name, description } = req.body;

  // Validation
  if (!code || !name) {
    return res.status(400).json({ message: 'Both indicator code and name are required' });
  }

  try {
    // Check if indicator already exists
    const normalizedCode = code.trim().toUpperCase();
    const existingIndicator = await Indicator.findOne({ code: normalizedCode });
    if (existingIndicator) {
      return res.status(409).json({ message: `Indicator with code '${normalizedCode}' already exists` });
    }

    const newIndicator = new Indicator({
      code: normalizedCode,
      name: name.trim(),
      description: description ? description.trim() : ''
    });

    const savedIndicator = await newIndicator.save();
    res.status(201).json(savedIndicator);
  } catch (error) {
    res.status(500).json({
      message: 'Failed to create indicator record',
      error: error.message
    });
  }
};
