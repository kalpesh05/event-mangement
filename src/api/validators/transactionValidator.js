const Joi = require("joi");

const errorMessages = require("../constants/errorMessages");

exports.create = Joi.object().keys({
  from: Joi.string()
    .min(3)
    .max(100)
    .error(new Error(errorMessages.INVALID_EMAIL))
    .required(),
  to: Joi.string()
    .min(3)
    .max(100)
    .error(new Error(errorMessages.INVALID_EMAIL))
    .required(),
  points: Joi.number()
    .error(new Error(errorMessages.TRANSACTION_POINT))
    .required()
});
