const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema({
  review: {
    type: String,
    require: true,
    minLength: [5, "Review must be at least 5 characters long"],
    maxLength: [50, "Review must be at least 50 characters long"],
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  userId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "users",
    require: true,
  },
  tourId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "tours",
    require: true,
  },
});

reviewSchema.index({ userId: 1, tourId: 1 }, { unique: true });

reviewSchema.pre("save", function (next) {
  Object.keys(this).forEach((key) => console.log(`${key}: ${this[key]}`));
  next();
});

reviewSchema.pre(/^find/, function (next) {
  Object.keys(this).forEach((key) => console.log(`${key}: ${this[key]}`));
  this.populate("userId").populate("tourId");
  next();
});

const reviewModel = mongoose.model("reviews", reviewSchema);

module.exports = reviewModel;
