const { AppError } = require("../utilities/appError");
const { ownerRegistrationValidationSchema } = require("../utilities/joiValidation");

module.exports.validateOwner = (req, res, next) => {
  const { error, value } = ownerRegistrationValidationSchema.validate(req.body);
  if (error) {
    const errMessage = error.details.map((err) => err.message);
    throw new AppError(errMessage, 400);
  } else {
    next();
  }
};
