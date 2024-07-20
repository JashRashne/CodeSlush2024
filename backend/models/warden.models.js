const mongoose = require("mongoose");
const User = require("./user.models");
const bcrypt = require("bcryptjs/dist/bcrypt");
const jwt = require("jsonwebtoken");

const wardenSchema = new mongoose.Schema(
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
    ward: {
      type: String,
      required: true,
    },
    role: {
      type: String,

      default: "warden",
    },
  },
  { timestamps: true }
);
wardenSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      id: this._id,

      role: this.role,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
  );
};

wardenSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    { id: this._id, role: this.role },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
  );
};

wardenSchema.methods.isPasswordCorrect = async function (password) {
  console.log(this);
  console.log(password, this.password);
  const isMatch = await bcrypt.compare(password, this.password);
  console.log("Password match:", isMatch);

  return isMatch;
};

wardenSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

const Warden = mongoose.model("Warden", wardenSchema);

module.exports = Warden;
