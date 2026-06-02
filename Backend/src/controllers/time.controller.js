import mongoose from 'mongoose';
import Price from '../models/Price.js';

// @desc    Fetch all unique month records present in dataset and prices
// @route   GET /months
// @access  Public
export const getMonths = async (req, res) => {
  try {
    // 1. Get distinct months from prices collection (numbers)
    const priceMonths = await Price.distinct('month');

    // 2. Get distinct months from dataset collection (strings)
    const db = mongoose.connection.db;
    const datasetMonthsStr = await db.collection('dataset').distinct('Month');
    const datasetMonths = datasetMonthsStr.map(m => parseInt(m, 10)).filter(m => !isNaN(m));

    // Combine, deduplicate, and sort numerically
    const allMonthsSet = new Set([...priceMonths, ...datasetMonths]);
    // Fallback to standard 1-12 if empty
    if (allMonthsSet.size === 0) {
      for (let i = 1; i <= 12; i++) allMonthsSet.add(i);
    }
    const sortedMonths = Array.from(allMonthsSet).sort((a, b) => a - b);

    res.status(200).json(sortedMonths);
  } catch (error) {
    res.status(500).json({
      message: 'Failed to fetch month records',
      error: error.message
    });
  }
};

// @desc    Fetch all unique year records present in dataset and prices
// @route   GET /years
// @access  Public
export const getYears = async (req, res) => {
  try {
    // 1. Get distinct years from prices collection (numbers)
    const priceYears = await Price.distinct('year');

    // 2. Get distinct years from dataset collection (strings)
    const db = mongoose.connection.db;
    const datasetYearsStr = await db.collection('dataset').distinct('Year');
    const datasetYears = datasetYearsStr.map(y => parseInt(y, 10)).filter(y => !isNaN(y));

    // Combine, deduplicate, and sort numerically ascending
    const allYearsSet = new Set([...priceYears, ...datasetYears]);
    // Fallback to a standard range if empty
    if (allYearsSet.size === 0) {
      const currentYear = new Date().getFullYear();
      for (let y = 2000; y <= currentYear; y++) allYearsSet.add(y);
    }
    const sortedYears = Array.from(allYearsSet).sort((a, b) => a - b);

    res.status(200).json(sortedYears);
  } catch (error) {
    res.status(500).json({
      message: 'Failed to fetch year records',
      error: error.message
    });
  }
};
