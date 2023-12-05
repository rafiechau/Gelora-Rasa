const Joi = require("joi");
const { handleResponse } = require("./handleResponseHelper");

// Function to return error status and handle response
exports.validateJoi = (res, data, schema, field = null) => {
  const { error } = handleValidateJoi(data, schema, field);
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

const handleValidateJoi = (data, schema, field) => {
  if (!field) {
    return schema.validate(data, { abortEarly: false });
  } else {
    const dynamicSchema = Joi.object(
      Object.keys(schema.describe().keys)
        .filter((key) => field.includes(key))
        .reduce((obj, key) => {
          obj[key] = schema[key];
          return obj;
        }, {})
    );
    return dynamicSchema.validate(data, { abortEarly: false });
  }
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
