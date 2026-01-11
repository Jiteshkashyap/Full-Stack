import express from "express";
import { isAuthenticated } from "../middleware/isAuthenticated.js";
import { validate } from "../middleware/middlewareValidate.js";

import { createCategory,updateCategory,deleteCategory,getAllCategory } from "../controller/categoryController.js";

import {
  categorySchema,
  updateCategorySchema,
} from "../validation/categoryValidation.js";

const router = express.Router();

router.post("/create", isAuthenticated, validate(categorySchema), createCategory);
router.get('/getAll',isAuthenticated,getAllCategory)
router.put("/:categoryId/update", isAuthenticated, validate(updateCategorySchema), updateCategory);
router.delete("/:categoryId/delete", isAuthenticated, deleteCategory);

export default router;
