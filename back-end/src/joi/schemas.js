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
  role: Joi.string().valid('customer', 'seller', 'administrator'),
});

const registerSaleSchema = Joi.object({
  user: Joi.string().required(),
  seller: Joi.string().required(),
  totalPrice: Joi.number().required(),
  deliveryAddress: Joi.string().required(),
  deliveryNumber: Joi.string().required(),
  status: Joi.string().required(),
  products: Joi.array().items(Joi.object({
    name: Joi.string().required(), quantity: Joi.number().required(),
  })),
});

module.exports = {
  loginSchema,
  registerSchema,
  registerSaleSchema,
};