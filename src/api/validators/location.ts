import { Joi } from "celebrate";

export const locationValidator = Joi.object({
  user: Joi.string(),
  coordinate: Joi.object({
    lng: Joi.string(),
    lat: Joi.string(),
  }),
  temp: Joi.number(),
})
  
