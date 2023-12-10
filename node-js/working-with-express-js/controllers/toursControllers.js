const fs = require("fs");

// reading json file & converting json string to an object (a map)
let tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`, "utf-8")
);

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

  response.status(200).json({
    status: "success",
    result: 1,
    data: {
      tour: tourWithSpecifiedId,
    },
  });
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
};

const deleteSpecificTour = (request, response) => {
  let specifiedId = Number(request.params.id);
  let toursLength = tours.length;
  console.log(`toursLength pre-deletion: ${toursLength}`);

  // tour data that has it's id set to the specified id
  let specifiedData = tours.find((tour) => tour.id == specifiedId);

  console.log(`specifiedData: ${specifiedData.id}`);
  let indexOfSpecifiedData = tours.indexOf(specifiedData);
  console.log(`indexOfSpecifiedData: ${indexOfSpecifiedData}`);

  tours.splice(indexOfSpecifiedData, 1);

  console.log(`toursLength post-deletion: ${toursLength}`);

  fs.writeFile(
    `${__dirname}../dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    () =>
      response.status(204).json({
        status: "success",
        data: null,
      })
  );
};

// check body function -> used in router.param("id", checkIDController)
const checkID = (request, response, next, val) => {
  const numberOfTours = tours.length;
  const id = val;

  const tourWithSpecifiedId = tours.find((tour) => tour.id == id);

  if (!tourWithSpecifiedId) {
    // console.log("responded");

    return response.status(404).json({
      status: "fail",
      message: "Invalid ID",
    });
  }

  //   console.log("post responded");

  next();
};

// exports.getAllTours = getAllTours;
// exports.getSpecificTour = getSpecificTour;
// exports.createNewTour = createNewTour;
// exports.updateSpecificTour = updateSpecificTour;
// exports.deleteSpecificTour = deleteSpecificTour;

module.exports = {
  getAllTours,
  getSpecificTour,
  createNewTour,
  updateSpecificTour,
  deleteSpecificTour,
  checkID,
};
