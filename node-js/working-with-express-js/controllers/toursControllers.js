const fs = require("fs");
const ToursModel = require("../models/toursModel");
const catchAsyncFunctionError = require("../utils/catchAsyncFunctionError");
const { model } = require("mongoose");

// reading json file & converting json string to an object (a map)
let tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`, "utf-8"),
);

const getAllTours = catchAsyncFunctionError(async (req, res, next) => {
  const allToursData = ToursModel.find();
  const allToursDataWithoutUnderscoreV = await allToursData.select("-__v");
  const allToursCount = await allToursData.countDocuments();
  console.log(`allToursData: ${allToursData}`);
  res.status(200).json({
    status: "success",
    data: {
      result: allToursCount,
      allToursData: allToursDataWithoutUnderscoreV,
    },
  });

  // GETTING ALL TOURS FROM FILE
  // tours = [];
  // const toursLength = tours.length;

  // if (toursLength > 0) {
  //   res.status(200).json({
  //     status: 'success',
  //     requestTime: String(req.requestTime),
  //     result: tours.length, // result specifies the result's length
  //     data: {
  //       tours, // similar to stating "tours": tours
  //     },
  //   });
  // }
  // } else if (toursLength === 0) {
  //   res.status(404).json({
  //     status: 'fail',
  //     message: 'No Tours Data Found',
  //   });
  // }
});

const getSpecificTour = catchAsyncFunctionError(async (req, res, next) => {
  const { id } = req.params; // string
  // console.log(`id: ${id}`);
  const tour = await ToursModel.findById({ _id: id });
  // console.log(`typeof(tour): ${typeof tour}`);

  res.status(200).json({
    status: "success",
    data: {
      tour,
    },
  });

  // GETTING SPECIFIC TOUR FROM FILE
  // // NOTE: Each request parameter (each key-value pair within request.params) has a "string" type
  // const specifiedId = Number(request.params.id);
  // // console.log(`specifiedId: ${specifiedId}, type: ${typeof specifiedId}`);
  // // let toursLength = tours.length;
  // const tourWithSpecifiedId = tours.find((tour) => specifiedId === tour.id);
  // console.log(`tourWithSpecifiedId: ${tourWithSpecifiedId}`);

  // response.status(200).json({
  //   status: "success",
  //   result: 1,
  //   data: {
  //     tour: tourWithSpecifiedId,
  //   },
  // });
});

const createNewTour = catchAsyncFunctionError(async (...data) => {
  console.log(`data: ${Object.keys(data[1])}`);
  const newTourData = data.req.body;
  // const newTourData = req.body;
  console.log(
    `newTourData: ${
      newTourData.name
    }, ${typeof newTourData.price}, ${typeof newTourData.rating}`,
  );

  // ToursModel.create() doesn't seem to work well with "runValidators";
  const options = {
    runValidators: false,
  };

  const newTour = await ToursModel.create({
    name: newTourData.name,
    price: newTourData.price,
    rating: newTourData.rating,
  });

  data.res.status(200).json({
    status: "success",
    data: {
      message: "A new tour was created!",
      tour: newTour,
    },
  });

  // CREATE NEW TOUR AND SAVING TO FILE
  // console.log(request.body);

  // let newTourData = request.body;
  // const toursLength = tours.length;

  // let lastTourId;
  // let newTourId;

  // if (toursLength > 0) {
  //   const lastTourIndex = tours.length - 1;

  //   const lastTour = tours[lastTourIndex];

  //   lastTourId = lastTour.id;
  //   newTourId = lastTourId + 1;
  // } else if (toursLength === 0) {
  //   newTourId = 0;
  // }

  // newTourData = Object.assign({ id: newTourId }, newTourData); // basically updates the value of "id" & places and displays it as the topmost key-value pair in the map
  // // newTourData['id'] = newTourId;

  // console.log(`newTourData: ${newTourData}`);

  // tours.push(newTourData);

  // const toursJSON = JSON.stringify(tours);

  // // fs.writeFile to write data to file avoid blocking the event loop
  // fs.writeFile(
  //   `${__dirname}/dev-data/data/tours-simple.json`,
  //   toursJSON,
  //   'utf-8',
  //   () =>
  //     response.status(200).json({
  //       status: 'success',
  //       message: `Done! New Tour (${newTourId}) has been created.`,
  //     }),
  // );
});

const updateSpecificTour = (request, response) => {
  console.log(`response.body: ${request.body.name}`);

  const specifiedId = Number(request.params.id);
  const tourDataUpdate = request.body;
  const tourDataToUpdate = tours.find((tour) => tour.id === specifiedId);

  // let updatedTourData = Object.assign(tourDataUpdate, tourDataToUpdate);

  // index of data to be updated with list of tours
  const indexOfTourDataToUpdate = tours.indexOf(tourDataToUpdate);

  // updating the specified tour data
  Object.keys(tourDataUpdate).forEach(
    (key) => (tourDataToUpdate[key] = tourDataUpdate[key]),
  );

  const updatedTourData = tourDataToUpdate;

  // console.log(`updatedTourData: ${updatedTourData.name}`);
  tours[indexOfTourDataToUpdate] = updatedTourData;
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    () =>
      response.status(201).json({
        status: "success",
        message: `Tour ${specifiedId} has been updated`,
      }),
  );
};

const deleteSpecificTour = (request, response) => {
  const specifiedId = Number(request.params.id);
  const toursLength = tours.length;
  console.log(`toursLength pre-deletion: ${toursLength}`);

  // tour data that has it's id set to the specified id
  const specifiedData = tours.find((tour) => tour.id === specifiedId);

  console.log(`specifiedData: ${specifiedData.id}`);
  const indexOfSpecifiedData = tours.indexOf(specifiedData);
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
      }),
  );
};

// check body function -> used in router.param("id", checkIDController)
// const checkID = (request, response, next, val) => {
//   // const numberOfTours = tours.length;
//   const id = val;

//   const tourWithSpecifiedId = tours.find((tour) => tour.id === id);

//   if (!tourWithSpecifiedId) {
//     // console.log("responded");

//     return response.status(404).json({
//       status: "fail",
//       message: "Invalid ID",
//     });
//   }

//   //   console.log("post responded");

//   next();
// };

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
  // checkID,
};
