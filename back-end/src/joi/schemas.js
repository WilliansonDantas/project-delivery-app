const Joi = require('joi');

const StringEmpty = 'Some required fields are missing';
const InvalidFields = 'Invalid fields';

const loginSchema = Joi.object({
  email: Joi.string().required().email().messages({
    'string.empty': StringEmpty,
    'any.required': InvalidFields,
  }),
  password: Joi.string().required().min(6).messages({
    'string.empty': StringEmpty,
    'any.required': InvalidFields,
  }),
});

const registerSchema = Joi.object({
  name: Joi.string().required().min(12).messages({
    'string.empty': StringEmpty,
    'any.required': InvalidFields,
  }),
  email: Joi.string().required().email().messages({
    'string.empty': StringEmpty,
    'any.required': InvalidFields,
  }),
  password: Joi.string().required().min(6).messages({
    'string.empty': StringEmpty,
    'any.required': InvalidFields,
  }),
});

module.exports = {
  loginSchema,
  registerSchema,
};