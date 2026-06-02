import Country from '../models/Country.js';

// @desc    Fetch all countries
// @route   GET /countries
// @access  Public
export const getCountries = async (req, res) => {
  try {
    const countries = await Country.find({}).sort({ name: 1 });
    res.status(200).json(countries);
  } catch (error) {
    res.status(500).json({
      message: 'Failed to fetch countries',
      error: error.message
    });
  }
};

// @desc    Create new country
// @route   POST /countries
// @access  Public
export const createCountry = async (req, res) => {
  const { code, name } = req.body;

  // Validation
  if (!code || !name) {
    return res.status(400).json({ message: 'Both country code and name are required' });
  }

  try {
    // Check if country already exists
    const normalizedCode = code.trim().toUpperCase();
    const existingCountry = await Country.findOne({ code: normalizedCode });
    if (existingCountry) {
      return res.status(409).json({ message: `Country with code '${normalizedCode}' already exists` });
    }

    const newCountry = new Country({
      code: normalizedCode,
      name: name.trim()
    });

    const savedCountry = await newCountry.save();
    res.status(201).json(savedCountry);
  } catch (error) {
    res.status(500).json({
      message: 'Failed to create country record',
      error: error.message
    });
  }
};
