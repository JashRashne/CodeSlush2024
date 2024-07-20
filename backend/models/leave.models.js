const mongoose = require("mongoose");

const leaveSchema = new mongoose.Schema(
  {
    isApproved: {
      type: Boolean,
      required: true,
      default: false,
    },
    letterURL: {
      type: String,
      required: true,
    },
    reason: {
      type: String,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
  },
  { timestamps: true }
);

const Leave = mongoose.model("Leave", leaveSchema);
module.exports = Leave;
