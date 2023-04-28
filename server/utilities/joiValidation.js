const Joi = require("joi");

const lostPetValidationSchema = Joi.object({
  name: Joi.string().max(15).required(),
  species: Joi.string().alphanum().required(),
  breed: Joi.string(),
  age: Joi.number().greater(0).required(),
  description: Joi.string().max(300).required(),
  dateLost: Joi.string().isoDate().required(),
  houseNumber: Joi.number().min(1).max(9999),
  street: Joi.string().required(),
  city: Joi.string().required(),
  state: Joi.string().required(),
  zipcode: Joi.number().positive().required(),
});

const ownerRegistrationValidationSchema = Joi.object({
  firstName: Joi.string().alphanum().required(),
  lastName: Joi.string().alphanum().required(),
  phoneNumber: Joi.string()
    .pattern(/[+][1]\d{3}[-]\d{3}[-]\d{4}/)
    .required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

module.exports = { lostPetValidationSchema, ownerRegistrationValidationSchema };
