import Joi from 'joi';

export const loginValidationSchema = Joi.object({
  email: Joi.string().required().email(),
  password: Joi.string().required(),
});
