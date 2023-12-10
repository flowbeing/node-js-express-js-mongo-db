const fs = require("fs");
// TOURS & USERS DATA

let users = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/users.json`, "utf-8")
);

// HANDLER FUNCTIONS - USERS
const getAllUsers = (request, response) => {
  response.status(500).json({
    status: "error",
    message: "route not yet defined",
  });
};

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
