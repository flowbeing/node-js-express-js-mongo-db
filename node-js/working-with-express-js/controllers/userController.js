const fs = require("fs");
const userModel = require("../models/userModel");
// TOURS & USERS DATA

// const users = JSON.parse(
//   fs.readFileSync(`${__dirname}/../dev-data/data/users.json`, "utf-8"),
// );
const catchAsyncFunctionError = require("../utils/catchAsyncFunctionError");

// HANDLER FUNCTIONS - USERS
const getAllUsers = catchAsyncFunctionError(async (req, res, next) => {
  const allUsers = await userModel.find({});

  res.status(200).json({
    status: "success",
    data: {
      allUsers,
    },
  });
});

const createNewUser = catchAsyncFunctionError(async (req, res, next) => {
  const newUser = await userModel.create({
    name: req.body.name,
    email: req.body.email,
    photo: req.body.photo,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  res.status(201).json({
    status: "success",
    data: {
      newUser,
    },
  });
});

const getSpecificUser = catchAsyncFunctionError(async (req, res, next) => {
  const allUsers = await userModel.findById(req.body.id);

  res.status(200).json({
    status: "success",
    data: {
      allUsers,
    },
  });
});

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
