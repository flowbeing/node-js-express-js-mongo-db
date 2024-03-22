const mongoose = require("mongoose");
const validator = require("validator");

const toursSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please specify a name"],
    unique: true,
    validate: [validator.isAlpha, "Please provide a name with aphabets"],
  },
  // rating: {
  //   type: Number,
  //   default: 4.5,
  // },
  price: {
    type: Number,
    required: [true, "Please enter a price"],
  },
});

// toursSchema.pre('save', function (next) {
//   console.log();
//   console.log(`this pre-save: ${this}`);
//   console.log();
//   next();
// });

// make a model out of the specified schema
const toursModel = mongoose.model("tours", toursSchema);

module.exports = toursModel;

// Creating a Mongodb document and saving it
// ?similar to creating a Model Prototype
// const newTourDocument = toursModel({
//   name: "ten",
//   rating: 5,
//   price: 300,
// });

// newTourDocument.save();

// toursModel.find()

// same as newTourDocument + newTourDocument.save() above
// toursModel.create({
//   name: "ten",
//   rating: 5,
//   price: 300,
// });
