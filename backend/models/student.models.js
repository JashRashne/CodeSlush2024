const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const student = require("./student.models");
const bcrypt = require("bcryptjs/dist/bcrypt");
const studentSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    refreshToken: {
      type: String,
    },
    wardNo: {
      type: String,
      required: true,
    },
    roomNo: {
      type: String,
      required: true,
    },
    mobNo: {
      type: Number,
      required: true,
    },
    medHist: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Patient",
      },
    ],
    medication: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Medication",
      },
    ],
    leaves: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Leave",
      },
    ],
    role: {
      type: String,

      default: "student",
    },
  },
  { timestamps: true }
);
// studentSchema.add({ role: { type: String, default: "student" } });
studentSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    { id: this._id, role: this.role },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
  );
};

studentSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    { id: this._id, role: this.role },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
  );
};

studentSchema.methods.isPasswordCorrect = async function (password) {
  console.log(this);
  console.log(password, this.password);
  const isMatch = await bcrypt.compare(password, this.password);
  console.log("Password match:", isMatch);

  return isMatch;
};

studentSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
