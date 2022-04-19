const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const DataSchema = new mongoose.Schema(
  {
    user_name: String,
    user_email: String,
    user_phone_number: { type: Number },
    user_password: String,
    user_address: String,
  },
  {
    timestamps: true,
  }
);

DataSchema.pre("save", function (next) {
  if (!this.isModified("user_password")) {
    return next();
  }
  this.user_password = bcrypt.hashSync(this.user_password, 11);
  next();
});

const user = mongoose.model("User", DataSchema);
module.exports = user;
