const fs = require("fs");
// TOURS & USERS DATA

let users = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/users.json`, "utf-8"),
);
let CatchAsyncFunctionError = require("../utils/catchAsyncFunctionError");

// HANDLER FUNCTIONS - USERS
const getAllUsers = CatchAsyncFunctionError((request, response) => {

  

  response.status(200).json({
    status: "success",
    message: "route not yet defined",
  });

});

const createNewUser = (request, response) => {
  response.status(500).json({
    status: "error",
    message: "route not yet defined",
  });
};

const getSpecificUser = (request, response) => {
  response.status(500).json({
    status: "error",
    message: "route not yet defined",
  });
};

const updateSpecificUser = (request, response) => {
  response.status(500).json({
    status: "error",
    message: "route not yet defined",
  });
};

const deleteSpecificUser = (request, response) => {
  response.status(500).json({
    status: "error",
    message: "route not yet defined",
  });
};

module.exports = {
  getAllUsers,
  getSpecificUser,
  createNewUser,
  updateSpecificUser,
  deleteSpecificUser,
};
