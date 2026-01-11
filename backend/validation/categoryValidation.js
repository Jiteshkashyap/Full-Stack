import Joi from "joi";

export const categorySchema = Joi.object({
  name: Joi.string().min(2).required(),
  status: Joi.boolean().optional(),
});

export const updateCategorySchema = Joi.object({
  name: Joi.string().min(2).optional(),
  status: Joi.boolean().optional(),
});