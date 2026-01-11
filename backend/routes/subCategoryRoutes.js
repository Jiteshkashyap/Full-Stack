import express from "express";
import {
  createSubCategory,
  updateSubCategory,
  deleteSubCategory,
  getAllSubCategories,
  getSingleSubCategory,
} from "../controller/subCategoryController.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js";
import { validate } from "../middleware/middlewareValidate.js";
import { createSubCategorySchema,updateSubCategorySchema } from "../validation/subCategoryValidation.js";

const router = express.Router();


router.post("/categories/:categoryId/subcategories/create",isAuthenticated,validate(createSubCategorySchema), createSubCategory);


router.put("/categories/:categoryId/subcategories/:subCategoryId/update",isAuthenticated,validate(updateSubCategorySchema), updateSubCategory);


router.delete("/categories/:categoryId/subcategories/:subCategoryId/delete",isAuthenticated, deleteSubCategory);


router.get("/categories/:categoryId/subcategories/list",isAuthenticated, getAllSubCategories);


router.get("/categories/:categoryId/subcategories/:subCategoryId/single",isAuthenticated, getSingleSubCategory);

export default router;
