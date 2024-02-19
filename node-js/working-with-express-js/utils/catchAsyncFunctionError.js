// CATCHING ERRORS IN ASYNC HANDLER FUNCTIONS
function catchAsyncFunctionError(anAsyncHandlerFunction) {
  return (req, res, next) => {
    anAsyncHandlerFunction(req, res, next).catch((error) => {
      console.log();
      console.log(`controller error statusCode: ${error.name}`);
      console.log(`controller error statusCode: ${error.statusCode}`);
      console.log(`controller error status: ${error.status}`);
      console.log(`controller error message: ${error.message}`);
      console.log(`controller error stack: ${error.stack}`);

      console.log();
      next(error);
    });
  };
}

module.exports = catchAsyncFunctionError;
