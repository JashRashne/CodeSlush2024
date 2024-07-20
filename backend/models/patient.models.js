const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,

      trim: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    dateOfAdmission: {
      type: Date,
      required: true,
    },
    dateOfDischarge: {
      type: Date,
      default: null,
    },
    reason: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Patient = mongoose.model("Patient", patientSchema);
module.exports = Patient;
