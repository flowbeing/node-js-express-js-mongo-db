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
// const fs = require("fs");
const mongoose = require("mongoose");
const express = require("express");
const morgan = require("morgan"); // http request logger for nodejs
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const util = require("util");
const crypto = require("crypto");
const hpp = require("hpp");
const { AppError } = require("./utils/errors");
const rateLimiter = require("express-rate-limit");
const toursRouter = require("./routes/toursRouter");
const usersRouter = require("./routes/usersRouter");
const reviewsRouter = require("./routes/reviewsRouter");

// port number
// const portNum = 3000;

// creates an express application
const app = express();

const limitIPAccessRate = rateLimiter({
  max: 100,
  windowMs: 1000 * 60 * 60,
});

app.use("/api", limitIPAccessRate);
app.use(hpp());

console.log(limitIPAccessRate);

// CONNECTING TO MONGODB WITH MONGOOSE:
process.env.DATABASE = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD,
);
const mongodbDriverConnectionString = process.env.DATABASE;

// const mongodbDriverConnectionString = process.env.DATABASE_LOCAL;

// MONGODB CONNECTION
mongoose
  .connect(mongodbDriverConnectionString, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then((result) => {
    console.log();
    console.log("MONGODB CONNECTION SUCCESSFUL!");
    console.log();
  })
  .catch((error) => {
    console.log();
    console.log("MONGODB CONNECTION ERROR!");
    console.log();
  });

// running middle based on whether or not the current environment is a development or production environment
if (process.env.NODE_ENV === "development") {
  app.use(morgan("combined"));
}

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

// ADDING ROUTERS TO APP
app.use("/api/v1/tours", toursRouter);
app.use("/api/v1/users", usersRouter);
app.use("/api/v1/reviews", reviewsRouter);

// HANDLING UNHANDLED ROUTES -> should be placed after all implemented routes
// status codes: 200 - 300 ok, 400 - 500 error
app.all("*", (req, res, next) => {
  // res.status(404).json({
  //   status: 'fail',
  //   data: {
  //     message: 'Page not found!',
  //     url: req.originalUrl,
  //   },
  // });

  console.log(`in app.all`);

  let error = new Error("Page not found!");
  error.statusCode = 404;
  app.status = "error!";

  error = new AppError(error);

  next(error);
});

// ERROR MIDDLEWARE
app.use((err, req, res, val) => {
  const appError = new AppError(err);

  console.log();
  console.log(`Error Middleware: ${appError.statusCode}`);
  console.log();

  res.status(appError.statusCode).json({
    status: appError.name,
    message: appError.message,
  });
});

// process.on('uncaughtException')

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
// app.get('/api/v1/tours', getAllTours);
// app.get('/api/v1/tours', (req, res, next) => {}); // CRUD operation function handlers can take 'req', 'res', 'next'

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

// const m = {
//   one: 1,
//   two: 2,
//   three: 3,
// };

// const mm = {
//   0: "one",
//   1: "two",
//   2: "three",
// };

// const entries = Object.entries(m);
// const entriesmm = Object.entries(mm);

// console.log();
// console.log(entriesmm);
// console.log(Object.fromEntries(entriesmm));

// console.log();

// async function aC() {
//   const result = await bcrypt.hash("password", 12);

//   return result;
// }

// const resultTwo = await util.promisify(bcrypt.hash("password", 12));

// bcrypt.hash("password", 12, (err, passwordHash) => {
//   async function comparePassword() {
//     const result = await bcrypt.compare("password", passwordHash);
//     console.log(`passwordHash: ${passwordHash}`);
//     console.log(`isPasswordSame: ${result}`);
//   }
//   comparePassword();
// });

// bcrypt.compare("password", passwordHash);

// JWT - Json Web Token
const tokenOne = jsonwebtoken.sign(
  { _id: "aaewfadsfasdfasfd" },
  "tokenKey;it-should-be-32-strings-long;",
  { algorithm: "HS512", expiresIn: "90d" },
); //  (err, jwt) => console.log(`jwt: ${jwt}`

const tokenEditedInProgress = tokenOne.split("");
tokenEditedInProgress[tokenEditedInProgress.length - 1] = "Q";
// const tokenEdited = tokenEditedInProgress.join("");

console.log(`jsonwebtoken      : ${tokenOne}`);
// console.log(`jsonwebtokenEdited: ${tokenEdited}`);

// const verifyOne = jsonwebtoken.verify(
//   tokenOne,
//   "tokenKey;it-should-be-32-strings-long;",
//   { algorithm: "HS512", expiresIn: "90d" },
// );

// const verifyEdited = jsonwebtoken.verify(
//   tokenEdited,
//   "tokenKey;it-should-be-32-strings-long;",
//   { algorithm: "HS512", expiresIn: "90d" },
// );

// console.log(`verifyOne   : ${Object.entries(verifyOne)}`);
// console.log(`verifyEdited: ${Object.entries(verifyEdited)}`);

// setTimeout(() => {
//   const jwt2 = jsonwebtoken.sign(
//     { _id: "aaewfadsfasdfasfd" },
//     "q23497faosijfdasdjf;",
//   );

//   console.log(`jwt1: ${jwt}`);
//   console.log(`jwt2: ${jwt2}`);
//   console.log(`jwt1==jwt2: ${jwt === jwt2}`);
// }, 460);

// const l = [11, 2, 3, 4, 5];
// const s = ["one", "two", "three", "four"];
// const result = l.reduce((total, currentNum) => {
//   console.log(`total: ${total}`);
//   console.log(`currentNum: ${currentNum}`);
//   return total + currentNum;
// }, 0);
// console.log(`result: ${result}`);

// const key = crypto.randomBytes(12).toString("hex");

// const encryptedKey = crypto.createHash("SHA256").update(key).digest("hex");
// // console.log(key);
// console.log(encryptedKey);

// console.log(`Date: ${Date.now()}`);

// Object.keys(arguments).map((key) => console.log(`${key}: ${arguments[key]}`));

console.log();
// console.log(process.argv);
// console.log(app.settings.env);

module.exports = app;
