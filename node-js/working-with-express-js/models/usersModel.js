const mongoose = require("mongoose");
const validator = require("validator");

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
      validator: [validator.isEmail],
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
  },
});

userSchema.pre("save", function (next) {
  if (this.isModified("password")) return next();

  const passwordHash = bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
});

const userModel = mongoose.model("userModel", userSchema);

module.exports = userModel;
