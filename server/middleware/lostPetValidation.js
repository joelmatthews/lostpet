const { AppError } = require("../utilities/appError");
const { lostPetValidationSchema } = require("../utilities/joiValidation");

module.exports.validateLostPet = (req, res, next) => {
  const { error, value } = lostPetValidationSchema.validate(req.body);
  if (error) {
    const errMessage = error.details.map((err) => err.message);
    throw new AppError(errMessage, 400);
  } else {
    next();
  }
};
