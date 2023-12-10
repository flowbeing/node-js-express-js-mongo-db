// TO DO
// 1. Separate routes & routers
// 2. Separate request handler functions & middleware functions
// 3. Separate Server functions

// console.log(Object.keys(arguments));

// NATOURS API WITH EXPRESS.JS
// MAJOR CHALLENGES FACED:
// a. reconciling tour data id with tour data index to
//    i. create new tour data at the right index and with the right id
//    ii. update existing tour data at the right index and with the right id
//    iii. delete tour data at the right index and with the right id
const fs = require("fs");
const express = require("express");

const morgan = require("morgan"); // http request logger for nodejs

const toursRouter = require("./routes/toursRouter");
const usersRouter = require("./routes/usersRouter");

// port number
// const portNum = 3000;

// creates an express application
let app = express();

// MIDDLEWARES
// asks (express) app to make use of a middleware
// A MIDDLEWARE IS BASICALLY A FUNCTION THAT CAN MODIFY AN INCOMING REQUEST DATA. ITS CALLED A MIDDLEWARE BECAUSE IT STANDS BETWEEN AND REQUEST AND A RESPONSE.
app.use(express.json()); // express.json returns a middleware that parses the request data (json) to a javascript object and makes it accessible via "request.body"
// app.use(morgan("combined")); // logs http requests to the console

app.use((request, response, next) => {
  console.log("This is a middleware");
  request.requestTime = new Date().toISOString();
  // console.log(next);
  // console.log(Object.keys(response));
  next();
});

app.use("/api/v1/tours", toursRouter);
app.use("/api/v1/users", usersRouter);

// console.log(typeof(tours));
// console.log(typeof ("a" + 1));
// console.log("a" * 1);

// HANDLER FUNCTIONS - TOURS
// const homepage = (request, response) => {
//   // a simplified send operation that would have required:
//   // 1. obtaining and specifying the request path "/" manually with request.url and a conditional if statement (if (request.url == "/"){...}) in NodeJS
//   // 2. writing status code to head with response.writeHead(200, Content-type: "text")
//   // 3. manually sending a message to the browser with response.end("some message")
//   response.status(200).send("Hello from the server side!");
//   // response.status(200).json({message: "some message", app: "App Name"});
// };

// HOMEPAGE
// app.get("/", homepage);

// GET ALL TOURS DATA
// app.get("/api/v1/tours", getAllTours);

// GET SPECIFIC TOUR'S DATA
// app.get("/api/v1/tours/:id", getSpecificTour);

// CREATE NEW TOUR
// app.post("/api/v1/tours", createNewTour);

// EDIT SPECIFIC TOUR DATA
// app.patch("/api/v1/tours/:id", updateSpecificTour);

// DELETE SPECIFIC TOUR DATA
// app.delete("/api/v1/tours/:id", deleteSpecificTour);

// returns a http server. The default host address is "127.0.0.1"

// app.route("/").get(homepage);

console.log(`__dirname: ${__dirname}`);

module.exports = app;
