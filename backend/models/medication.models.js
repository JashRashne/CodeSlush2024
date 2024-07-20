const mongoose = require("mongoose");

const medicationSchema = new mongoose.Schema(
  {
    medicine: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Medicine",
    },
    isTaken: {
      type: Boolean,
      required: true,
      default: false,
    },
    isDosageCompleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Medication = mongoose.model("Medication", medicationSchema);
module.exports = Medication;
