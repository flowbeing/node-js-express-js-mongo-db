// ROUTER & ROUTES - USERS
// MAKING USE OF "ROUTER" & ROUTES IN EXPRESS JS.
// CREATING AND MAKING USE OF A ROUTER ENSURES THAT INSTEAD OF ROUTING ALL REQUESTS DIRECTLY WITH "app", CREATE A ROUTER FOR EACH RESOURCE (e.g tour)
// AND USE THAT ROUTER TO PROCESS REQUESTS THAT ARE MADE TO THAT RESOURCE..

const express = require("express");
const usersRouter = express.Router();
const {
  getAllUsers,
  getSpecificUser,
  createNewUser,
  updateSpecificUser,
  deleteSpecificUser,
} = require(`../controllers/userController`);

usersRouter.route("/").get(getAllUsers).post(createNewUser);
usersRouter
  .route("/:id")
  .get(getSpecificUser)
  .patch(updateSpecificUser)
  .delete(deleteSpecificUser);

// exporting users router
module.exports = usersRouter;
