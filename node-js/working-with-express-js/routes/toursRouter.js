// ROUTER & ROUTES - TOURS
// MAKING USE OF "ROUTER" & ROUTES IN EXPRESS JS.
// CREATING AND MAKING USE OF A ROUTER ENSURES THAT INSTEAD OF ROUTING ALL REQUESTS DIRECTLY WITH "app", CREATE A ROUTER FOR EACH RESOURCE (e.g tour)
// AND USE THAT ROUTER TO PROCESS REQUESTS THAT ARE MADE TO THAT RESOURCE..

const express = require("express");
const morgan = require("morgan");
const {
  getAllTours,
  getSpecificTour,
  createNewTour,
  updateSpecificTour,
  deleteSpecificTour,
  checkID,
} = require("../controllers/toursControllers");

// console.log(`getAllTours: ${getAllTours}, type: ${typeof getAllTours}`);

// console.log("toursRouter 1");

const toursRouter = express.Router({ mergeParams: true });

//
// toursRouter.param("id", (request, response, next, val) => {
//   // console.log(`request: ${Object.keys(request)}`);
//   // console.log(`request: ${Object.values(request)}`);
//   console.log(`param val: ${val}, type: ${typeof val}`);

//   next();
// });

// toursRouter.param("id", checkID);

// toursRouter.use(morgan("combined"));

// console.log("toursRouter 2");

// chaining middleware to specific CRUD events
// making middleware CRUD operation specific. Here "Morgan" a HTTP Logger Middleware is chained to the GET method
toursRouter.route("/").get(getAllTours).post(createNewTour);

// console.log("toursRouter 3");

toursRouter
  .route("/:id")
  .get(getSpecificTour)
  .patch(updateSpecificTour)
  .delete(deleteSpecificTour);

// console.log("toursRouter 4");

// exporting tours router
module.exports = toursRouter;
// exports.toursRouter = toursRouter;
