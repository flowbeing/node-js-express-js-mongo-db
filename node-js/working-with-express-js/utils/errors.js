// QUITE USEFUL TO FIX "INVALID STATUS CODE" ERROR THAT OCCURS WITH SOME ERROR MESSAGES
class AppError extends Error {
  constructor(error) {
    super(error.message);

    this.name = error.name;
    this.statusCode = error.statusCode || 500;
    this.status = `${error.statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperationalError = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

exports.AppError = AppError;
