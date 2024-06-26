import Joi from 'joi';

const movieValidationSchema = Joi.object({
  title: Joi.string().required(),
  publishingYear: Joi.number().integer().required(),
  poster: Joi.any(),
});

export default function validateMovieInput(data) {
  return movieValidationSchema.validate(data);
}
