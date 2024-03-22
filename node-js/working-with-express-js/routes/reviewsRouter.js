const express = require("express");
const {
  createNewReview,
  getAllReviews,
  getSpecificReview,
} = require("../controllers/reviewsController");

const reviewsRouter = express.Router();

reviewsRouter.route("/").post(createNewReview).get(getAllReviews);
reviewsRouter.route("/:id").get(getSpecificReview);

module.exports = reviewsRouter;
