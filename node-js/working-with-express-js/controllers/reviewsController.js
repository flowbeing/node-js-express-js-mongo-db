const reviewsModel = require("../models/reviewsModel");
const catchAsyncFunctionError = require("../utils/catchAsyncFunctionError");

const createNewReview = catchAsyncFunctionError(async (req, res, next) => {
  const aNewReview = await reviewsModel.create({
    review: req.body.review,
    rating: req.body.rating,
    userId: req.body.userId,
    tourId: req.body.tourId,
  });

  res.status(201).json({
    status: "success",
    data: {
      aNewReview,
    },
  });
});

const getSpecificReview = catchAsyncFunctionError(async (req, res, next) => {
  const review = await reviewsModel.findById(req.body.id);

  res.status(200).json({
    status: "success",
    data: {
      review,
    },
  });
});

const getAllReviews = catchAsyncFunctionError(async (req, res, next) => {
  const allReviews = await reviewsModel.find({});
  //   console.log(`allReviews: ${allReviews}`);

  //   if (!allReviews)
  // throw new Error("An error occured while fetching all reviews");

  res.status(200).json({
    status: "success",
    data: {
      allReviews,
    },
  });
});

exports.createNewReview = createNewReview;
exports.getAllReviews = getAllReviews;
exports.getSpecificReview = getSpecificReview;
