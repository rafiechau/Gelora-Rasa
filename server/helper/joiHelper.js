const Joi = require("joi");
const { handleResponse } = require("./handleResponseHelper");

// Function to return error status and handle response
exports.validateJoi = (res, data, schema) => {
  const { error } = schema.validate(data, { abortEarly: false });
  if (error) {
    return {
      error: true,
      handleRes: handleResponse(res, 400, {
        status: "Validation Failed",
        message: error.details[0].message,
      }),
    };
  }
  return { error: false, handleRes: null };
};


// Schema User
exports.schemaUser = Joi.object({
  firstName: Joi.string().min(3).required().messages({
    'string.base': 'firstName must be a string',
    'string.min': 'firstName must be at least three characters long',
    'any.required': 'firstName is required',
  }),
  lastName: Joi.string().allow('', null).messages({
    'string.base': 'lastName should be a string or null'
  }),
  email: Joi.string().email().required().messages({
    'string.base': 'email must be a string.',
    'string.empty': 'email cannot be empty.',
    'string.email': 'email must be a valid email address.',
    'any.required': 'email is required.',
  }),
  password: Joi.string().min(8).required(),
  role: Joi.number().valid(1, 2).required()
});

exports.schemaLogin = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
})

exports.schemaCategories = Joi.object({
  categoryName: Joi.string().required().min(2).max(50).message({
    'string.empty': `"name" cannot be an empty field`,
    'string.min': `"name" should have a minimum length of {#limit}`,
    'string.max': `"name" should have a maximum length of {#limit}`,
    'any.required': `"name" is a required field`
  })
})

exports.schemaEvent = Joi.object({
  eventName: Joi.string().required().messages({
    'string.base': `"eventName" must be a string`,
    'string.empty': `"eventName" cannot be empty`,
    'any.required': `"eventName" is a required field`
  }),
  date: Joi.date().required().messages({
    'date.base': `"date" must be a valid date`,
    'any.required': `"date" is a required field`
  }),
  time: Joi.string().pattern(new RegExp('^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$')).required().messages({
    'string.pattern.base': `"time" must be in HH:mm format`,
    'string.empty': `"time" cannot be empty`,
    'any.required': `"time" is a required field`
  }),
  registrationDealine: Joi.string().required().messages({
    'string.base': `"registrationDealine" must be a string`,
    'string.empty': `"registrationDealine" cannot be empty`,
    'any.required': `"registrationDealine" is a required field`
  }),
  type: Joi.string().required().messages({
    'string.base': `"type" must be a string`,
    'string.empty': `"type" cannot be empty`,
    'any.required': `"type" is a required field`
  }),
  address: Joi.string().required().messages({
    'string.base': `"address" must be a string`,
    'string.empty': `"address" cannot be empty`,
    'any.required': `"address" is a required field`
  }),
  venueName: Joi.string().required().messages({
    'string.base': `"venueName" must be a string`,
    'string.empty': `"venueName" cannot be empty`,
    'any.required': `"venueName" is a required field`
  }),
  status: Joi.string().required().messages({
    'string.base': `"status" must be a string`,
    'string.empty': `"status" cannot be empty`,
    'any.required': `"status" is a required field`
  }),
  image: Joi.string().allow(null, '').messages({
    'string.base': `"image" must be a string`,
    'string.empty': `"image" cannot be empty`,
  }),
  price: Joi.string().required().messages({
    'string.base': `"price" must be a string`,
    'string.empty': `"price" cannot be empty`,
    'any.required': `"price" is a required field`
  }),
  stok: Joi.number().integer().required().messages({
    'number.base': `"stok" must be a number`,
    'number.integer': `"stok" must be an integer`,
    'any.required': `"stok" is a required field`
  }),
  description: Joi.string().allow(null, '').messages({
    'string.base': `"description" must be a string`,
    'string.empty': `"description" can be empty`
  }),
  locationId: Joi.number().integer().required().messages({
    'number.base': `"locationId" must be a number`,
    'number.integer': `"locationId" must be an integer`,
    'any.required': `"locationId" is a required field`
  }),
  categoryId: Joi.number().integer().required().messages({
    'number.base': `"categoryId" must be a number`,
    'number.integer': `"categoryId" must be an integer`,
    'any.required': `"categoryId" is a required field`
  }),
  userId: Joi.number().integer().required().messages({
    'number.base': `"userId" must be a number`,
    'number.integer': `"userId" must be an integer`,
    'any.required': `"userId" is a required field`
  }),
})

exports.schemaOrder = Joi.object({
    totalTickets: Joi.number().integer().min(1).required(),
    ticketsTypes: Joi.string().required()
})
