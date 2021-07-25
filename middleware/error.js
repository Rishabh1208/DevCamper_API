const ErrorResponse = require("../utils/errorResponse");

function errorHandler(err, req, res, next) {
  let error = { ...err };
  error.message = err.message;
  // console.log(err);

  //Mongoose Duplicate Key
  if (err.code === 11000) {
    const message = "Duplicate field value entered";
    error = new ErrorResponse(message, 404);
  }

  //Mongoose Validation error
  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map((val) => val.message);
    error = new ErrorResponse(message, 404);
  }

  //   Mongoose bad objectID
  if (err.name === "CastError") {
    const message = `Bootcamp not found with id of ${err.value}`;
    error = new ErrorResponse(message, 404);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || "server error",
  });
}

module.exports = errorHandler;
