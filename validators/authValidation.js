const Joi = require("joi");

//RegisterValidator for registering new users
const registerValidator = body => {
  const schema = Joi.object({
    firstName: Joi.string()
      .min(3)
      .required(),
    lastName: Joi.string()
      .min(3)
      .required(),
    email: Joi.string()
      .email()
      .required(),
    password: Joi.string()
      .min(3)
      .required(),
    nic: Joi.string()
    .required(),
    confirmpassword: Joi.string()
      .min(3)
      .required()
  });

  return Joi.validate(body, schema);
};

//LoginValidator for login
const loginValidator = body => {
  const schema = Joi.object({
    email: Joi.string()
      .email()
      .required(),
    password: Joi.string()
      .min(3)
      .required()
  });

  return Joi.validate(body, schema);
};

const registerValidatorDonator = body => {
  const schema = Joi.object({
    firstName: Joi.string()
      .min(3)
      .required(),
    lastName: Joi.string()
      .min(3)
      .required(),
    email: Joi.string()
      .email()
      .required(),
    password: Joi.string()
      .min(3)
      .required(),
    confirmpassword: Joi.string()
      .min(3)
      .required()
  });

  return Joi.validate(body, schema);
};

module.exports.registerValidatorDonator = registerValidatorDonator;
module.exports.registerValidator = registerValidator;
module.exports.loginValidator = loginValidator;
