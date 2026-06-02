import mongoose from 'mongoose';

const priceSchema = new mongoose.Schema(
  {
    countryCode: {
      type: String,
      required: true,
      trim: true
    },
    country: {
      type: String,
      required: true,
      trim: true
    },
    indicator: {
      type: String,
      required: true,
      trim: true
    },
    indicatorName: {
      type: String,
      required: true,
      trim: true
    },
    year: {
      type: Number,
      required: true
    },
    month: {
      type: Number,
      required: true
    },
    value: {
      type: Number,
      required: true
    },
    freq: {
      type: String,
      required: true,
      trim: true
    },
    frequency: {
      type: String,
      required: true,
      trim: true
    }
  },
  {
    timestamps: true,
    collection: 'prices' // Explicitly map to the existing 'prices' collection
  }
);

const Price = mongoose.model('Price', priceSchema);

export default Price;
