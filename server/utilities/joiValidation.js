const baseJoi = require("joi");
const sanitizeHtml = require('sanitize-html');

const extension = (joi) => ({
  type: 'string',
  base: joi.string(),
  messages: {
      'string.escapeHTML': '{{#label}} must not include HTML'
  },
  rules: {
      escapeHTML: {
          validate(value, helpers) {
              const clean = sanitizeHtml(value, {
                  allowedTags: [],
                  allowedAtributes: {},
              });
              if (clean !== value) return helpers.error('string.escapeHTML', { value })
              return clean;
          }
      }
  }
});

const Joi = baseJoi.extend(extension);

const lostPetValidationSchema = Joi.object({
  name: Joi.string().max(15).required().escapeHTML(),
  species: Joi.string().alphanum().required().escapeHTML(),
  breed: Joi.string().escapeHTML(),
  age: Joi.number().greater(0).required(),
  description: Joi.string().max(300).required().escapeHTML(),
  dateLost: Joi.string().isoDate().required().escapeHTML(),
  houseNumber: Joi.number().min(1).max(9999),
  street: Joi.string().required().escapeHTML(),
  city: Joi.string().required().escapeHTML(),
  state: Joi.string().required().escapeHTML(),
  zipcode: Joi.number().positive().required(),
  deleteImages: Joi.array().items(Joi.string().escapeHTML())
});

const ownerRegistrationValidationSchema = Joi.object({
  firstName: Joi.string().alphanum().required().escapeHTML(),
  lastName: Joi.string().alphanum().required().escapeHTML(),
  phoneNumber: Joi.string()
    .pattern(/[+][1]\d{3}[-]\d{3}[-]\d{4}/)
    .required().escapeHTML(),
  email: Joi.string().email().required().escapeHTML(),
  password: Joi.string().required().escapeHTML(),
});

module.exports = { lostPetValidationSchema, ownerRegistrationValidationSchema };
