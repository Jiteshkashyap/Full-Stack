import express from "express";
import {
  createProduct,
  updateProduct,
  deleteProduct,
  getProducts,
  getSingleProduct,
  getAllProducts
} from "../controller/productController.js";

import upload from "../middleware/multer.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js";
import { validate } from "../middleware/middlewareValidate.js";
import { createProductSchema,updateProductSchema } from "../validation/productValidation.js";

const router = express.Router();


router.post("/categories/:categoryId/subcategories/:subCategoryId/products",isAuthenticated,validate(createProductSchema),upload.array("images", 5),createProduct);


router.put("/categories/:categoryId/subcategories/:subCategoryId/Products/:productId/update",isAuthenticated,validate(updateProductSchema),upload.array("images", 5),updateProduct);


router.delete("/categories/:categoryId/subcategories/:subCategoryId/Products/:productId/delete",isAuthenticated,deleteProduct);


router.get("/categories/:categoryId/subcategories/:subCategoryId/allProducts",isAuthenticated,getProducts);


router.get("/categories/:categoryId/subcategories/:subCategoryId/Products/:productId",isAuthenticated,getSingleProduct);

router.get("/all",isAuthenticated, getAllProducts);

export default router;
