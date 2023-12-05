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
const express = require("express");
const fs = require("fs");
const morgan = require("morgan"); // http request logger for nodejs
const portNum = 3000;

// creates an express application
let app = express();

// MIDDLEWARES
// asks (express) app to make use of a middleware
// A MIDDLEWARE IS BASICALLY A FUNCTION THAT CAN MODIFY AN INCOMING REQUEST DATA. ITS CALLED A MIDDLEWARE BECAUSE IT STANDS BETWEEN AND REQUEST AND A RESPONSE.
app.use(express.json()); // express.json returns a middleware that parses the request data (json) to a javascript object and makes it accessible via "request.body"
app.use(morgan("combined")); // logs http requests to the console

app.use((request, response, next) => {
  console.log("This is a middleware");
  request.requestTime = new Date().toISOString();
  // console.log(next);
  // console.log(Object.keys(response));
  next();
});

// TOURS & USERS DATA
// reading json file & converting json string to an object (a map)
let tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`, "utf-8")
);
let users = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/users.json`, "utf-8")
);

// console.log(typeof(tours));
// console.log(typeof ("a" + 1));
// console.log("a" * 1);

// HANDLER FUNCTIONS - TOURS
const homepage = (request, response) => {
  // a simplified send operation that would have required:
  // 1. obtaining and specifying the request path "/" manually with request.url and a conditional if statement (if (request.url == "/"){...}) in NodeJS
  // 2. writing status code to head with response.writeHead(200, Content-type: "text")
  // 3. manually sending a message to the browser with response.end("some message")
  response.status(200).send("Hello from the server side!");
  // response.status(200).json({message: "some message", app: "App Name"});
};

const getAllTours = (request, response) => {
  let toursLength = tours.length;

  if (toursLength > 0) {
    response.status(200).json({
      status: "success",
      requestTime: String(request.requestTime),
      result: tours.length, // result specifies the result's length
      data: {
        tours, // similar to stating "tours": tours
      },
    });
  } else if (toursLength == 0) {
    response.status(404).json({
      status: "fail",
      message: "No Tours Data Found",
    });
  }
};

const getSpecificTour = (request, response) => {
  // NOTE: Each request parameter (each key-value pair within request.params) has a "string" type
  let specifiedId = Number(request.params.id);
  // console.log(`specifiedId: ${specifiedId}, type: ${typeof specifiedId}`);
  // let toursLength = tours.length;
  let tourWithSpecifiedId = tours.find((tour) => specifiedId == tour.id);
  console.log(`tourWithSpecifiedId: ${tourWithSpecifiedId}`);

  if (tourWithSpecifiedId) {
    response.status(200).json({
      status: "success",
      result: 1,
      data: {
        tour: tourWithSpecifiedId,
      },
    });
  } else if (!tourWithSpecifiedId) {
    response.status(404).json({
      status: "fail",
      message: "No Tours Data Found",
    });
  }
};

const createNewTour = (request, response) => {
  // console.log(request.body);

  let newTourData = request.body;
  let toursLength = tours.length;

  let lastTourId;
  let newTourId;

  if (toursLength > 0) {
    let lastTourIndex;
    lastTourIndex = tours.length - 1;

    let lastTour = tours[lastTourIndex];

    lastTourId = lastTour.id;
    newTourId = lastTourId + 1;
  } else if (toursLength == 0) {
    newTourId = 0;
  }

  newTourData = Object.assign({ id: newTourId }, newTourData); // basically sets the "id" (key and value) for a new tour & displays it as the topmost key-value pair
  // newTourData['id'] = newTourId;

  console.log(`newTourData: ${newTourData}`);

  tours.push(newTourData);

  let toursJSON = JSON.stringify(tours);

  // fs.writeFile to write data to file avoid blocking the event loop
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    toursJSON,
    "utf-8",
    () =>
      response.status(200).json({
        status: "success",
        message: `Done! New Tour (${newTourId}) has been created.`,
      })
  );
};

const updateSpecificTour = (request, response) => {
  console.log(`response.body: ${request.body.name}`);

  let specifiedId = Number(request.params.id);
  let tourDataUpdate = request.body;
  let tourDataToUpdate = tours.find((tour) => tour.id == specifiedId);

  if (tourDataToUpdate) {
    // let updatedTourData = Object.assign(tourDataUpdate, tourDataToUpdate);

    // index of data to be updated with list of tours
    let indexOfTourDataToUpdate = tours.indexOf(tourDataToUpdate);

    // updating the specified tour data
    Object.keys(tourDataUpdate).forEach(
      (key) => (tourDataToUpdate[key] = tourDataUpdate[key])
    );

    let updatedTourData = tourDataToUpdate;

    // console.log(`updatedTourData: ${updatedTourData.name}`);
    tours[indexOfTourDataToUpdate] = updatedTourData;
    fs.writeFile(
      `${__dirname}/dev-data/data/tours-simple.json`,
      JSON.stringify(tours),
      () =>
        response.status(201).json({
          status: "success",
          message: `Tour ${specifiedId} has been updated`,
        })
    );
  } else if (!tourDataToUpdate) {
    response.status(404).json({
      status: "fail",
      message: `Could not update tour! The specified tour does not exist.`,
    });
  }
};

const deleteSpecificTour = (request, response) => {
  let specifiedId = Number(request.params.id);
  let toursLength = tours.length;
  console.log(`toursLength pre-deletion: ${toursLength}`);

  // tour data that has it's id set to the specified id
  let specifiedData = tours.find((tour) => tour.id == specifiedId);

  if (specifiedData) {
    console.log(`specifiedData: ${specifiedData.id}`);
    let indexOfSpecifiedData = tours.indexOf(specifiedData);
    console.log(`indexOfSpecifiedData: ${indexOfSpecifiedData}`);

    tours.splice(indexOfSpecifiedData, 1);

    console.log(`toursLength post-deletion: ${toursLength}`);

    fs.writeFile(
      `${__dirname}/dev-data/data/tours-simple.json`,
      JSON.stringify(tours),
      () =>
        response.status(204).json({
          status: "success",
          data: null,
        })
    );
  } else if (!specifiedData) {
    response.status(404).json({
      status: "fail",
      message: "Invalid ID",
    });
  }
};

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

// ROUTER & ROUTES - TOURS
// MAKING USE OF "ROUTER" & ROUTES IN EXPRESS JS.
// CREATING AND MAKING USE OF A ROUTER ENSURES THAT INSTEAD OF ROUTING ALL REQUESTS DIRECTLY WITH "app", CREATE A ROUTER FOR EACH RESOURCE (e.g tour)
// AND USE THAT ROUTER TO PROCESS REQUESTS THAT ARE MADE TO THAT RESOURCE..
// app.route("/").get(homepage);

const toursRouter = express.Router();
app.use("/api/v1/tours", toursRouter);

toursRouter.route("/").get(getAllTours).post(createNewTour);
toursRouter
  .route("/:id")
  .get(getSpecificTour)
  .patch(updateSpecificTour)
  .delete(deleteSpecificTour);

// ROUTER & ROUTES - USERS
const usersRouter = express.Router();
app.use("/api/v1/users", usersRouter);

usersRouter.route("/").get(getAllUsers).post(createNewUser);
usersRouter
  .route("/:id")
  .get(getSpecificUser)
  .patch(updateSpecificUser)
  .delete(deleteSpecificUser);

// returns a http server. The default host address is "127.0.0.1"
app.listen(portNum, () => {
  console.log(`listening on port: ${portNum}`);
});

console.log(`__dirname: ${__dirname}`);
