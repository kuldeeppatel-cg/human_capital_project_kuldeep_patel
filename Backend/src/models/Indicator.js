import mongoose from 'mongoose';

const indicatorSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    name: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      trim: true
    }
  },
  {
    timestamps: true,
    collection: 'indicators' // Explicitly target the existing 'indicators' collection
  }
);

const Indicator = mongoose.model('Indicator', indicatorSchema);

export default Indicator;
