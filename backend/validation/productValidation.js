import Joi from "joi";

export const createProductSchema = Joi.object({
  productName: Joi.string().min(2).required(),
  brand: Joi.string().optional(),
  sku: Joi.string().required(),
  unit: Joi.string().valid("kg", "gm", "liter", "pcs").required(),
  images: Joi.array().items(Joi.string()).optional(),
  description: Joi.string().optional(),
  status: Joi.boolean().optional(),
});

export const updateProductSchema = Joi.object({
  productName: Joi.string().min(2).optional(),
  brand: Joi.string().optional(),
  sku: Joi.string().optional(),
  unit: Joi.string().valid("kg", "gm", "liter", "pcs").optional(),
  images: Joi.array().items(Joi.string()).optional(),
  description: Joi.string().optional(),
  status: Joi.boolean().optional(),
});
