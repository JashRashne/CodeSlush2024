const mongoose = require("mongoose");

const entrySchema = new mongoose.Schema(
  {
    checkInTime: {
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

const Entry = mongoose.model("Entry", entrySchema);

module.exports = Entry;
