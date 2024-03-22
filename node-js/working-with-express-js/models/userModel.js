const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "'name is required. Please enter a name"],
  },
  email: {
    type: String,
    required: [true, "Please enter an email"],
    unique: true,
    validate: {
      validator: (val) => validator.isEmail(val),
      message: "Passwords are not the same",
    },
  },
  photo: {
    type: String,
    required: false,
    default: "",
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minLength: 8,
  },
  passwordConfirm: {
    type: String,
    required: [true, "Re-enter your password"],
    validate: {
      validator: function (val) {
        console.log(`password===passwordConfirm: ${val === this.password}`);
        return val === this.password;
      },
      message: "Passwords do not match",
    },
  },
});

userSchema.pre("save", function (next) {
  if (this.isModified("password")) return next();

  const passwordHash = bcrypt.hash(this.password, 12);
  this.password = passwordHash;
  this.passwordConfirm = undefined;

  // this.save({ validateBeforeSave })
});

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;
