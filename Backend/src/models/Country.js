import mongoose from 'mongoose';

const countrySchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      uppercase: true
    },
    name: {
      type: String,
      required: true,
      trim: true
    }
  },
  {
    timestamps: true,
    collection: 'countries' // Explicitly target the existing 'countries' collection
  }
);

const Country = mongoose.model('Country', countrySchema);

export default Country;
