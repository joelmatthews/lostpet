const Joi = require('joi');

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

module.exports = lostPetValidationSchema;