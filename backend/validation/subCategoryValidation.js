import Joi from "joi";

export const createSubCategorySchema = Joi.object({
  
  name: Joi.string().min(2).required(),
  status: Joi.boolean().optional(),
});

export const updateSubCategorySchema = Joi.object({
 
  name: Joi.string().min(2).optional(),
  status: Joi.boolean().optional(),
});