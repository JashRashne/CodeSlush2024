const mongoose = require("mongoose");

const medicineSchema = new mongoose.Schema(
  {
    medName: {
      type: String,
      required: true,
    },
    dosage: {
      type: String,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    days: {
      type: Number,
    },
  },
  { timestamps: true }
);
const Medicine = mongoose.model("Medicine", medicineSchema);
module.exports = Medicine;
