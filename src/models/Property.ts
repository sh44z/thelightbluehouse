import mongoose from "mongoose";

const PropertySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  country: { type: String, required: true },
  city: { type: String, required: true },
  location: { type: String, required: true },
  pricePerNight: { type: Number, required: true },
  maxGuests: { type: Number, required: true },
  houseRules: { type: String, required: true },
  images: { type: [String], required: true }, // Array of image paths
  amenities: { type: [String], required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Relational field
}, { timestamps: true }); // Add timestamps for createdAt and updatedAt

export default mongoose.models.Property || mongoose.model("Property", PropertySchema);