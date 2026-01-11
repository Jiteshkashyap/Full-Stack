import cloudinary from "../utils/cloudinary.js";
import { Category } from "../model/categoryModel.js";
import { SubCategory } from "../model/subCategoryModel.js";
import { Product } from "../model/productModel.js";
import getDataUri from "../utils/dataUri.js";

export const createProduct = async (req,res)=>{
    try {
        const {categoryId , subCategoryId}=req.params
        const {productName ,sku ,brand, description,unit}=req.body

        const categoryExists = await Category.findById(categoryId)
        if(!categoryExists){
            return res.status(400).json({
                success:false,
                message:"Category not found"
            })
        }
        const subCategoryExists= await SubCategory.findOne({_id:subCategoryId , category:categoryId})
        if(!subCategoryExists){
            return res.status(400).json({
                success:false,
                message:"Sub-Category not found"
            })
        }
        //check duplicate SKU
        const skuExists = await Product.findOne({sku})
        if(skuExists){
            return res.status(400).json({
                message:'sku already exists'
            })
        }

        let images = [];
        if (req.files && req.files.length > 0) {
        for (const file of req.files) {
        const fileUri = getDataUri(file);
        const uploaded = await cloudinary.uploader.upload(fileUri.content, { folder: "products" });
        images.push({ url: uploaded.secure_url, public_id: uploaded.public_id });
      }
    }

        const product = await Product.create({
      productName,
      category:categoryId,
      subCategory:subCategoryId,
      sku,
      unit,
      brand,
      description,
      images,
        })

        return res.status(201).json({
            success:true,
            message:"Product created succesfully",
            product
        })
        
    } catch (error) {
      console.log(error)
              return res.status(500).json({
            success:false,
            message:"Unable to create product"
        })
    }
}

export const deleteProduct = async (req, res) => {
  try {

    const{productId ,subCategoryId,categoryId} =req.params

    const product = await Product.findOneAndDelete({
          _id:productId,
         category:categoryId,
         subCategory:subCategoryId
        })
    if (!product){
         return res.status(404).json({
             success: false,
              message: "Product not found"
             });
            }
    // Delete all images from Cloudinary

    if (product.images?.length) {
      for (const img of product.images) {
        await cloudinary.uploader.destroy(img.public_id);
      }
    }

     return res.status(200).json({
     success: true,
     message: "Product deleted successfully"
     });

  } catch (error) {
    console.error(error);
    res.status(500).json({
    success: false,
    message: "Unable to delete product" });
  }
};



export const updateProduct = async (req, res) => {
  try {
    const { categoryId, subCategoryId, productId } = req.params;
    const { productName, brand, unit, description, status } = req.body;

    const updates = {};
    if (productName) updates.productName = productName;
    if (brand) updates.brand = brand;
    if (unit) updates.unit = unit;
    if (description) updates.description = description;
    if (status !== undefined) updates.status = status;

    
    if (req.files && req.files.length > 0) {
      const images = [];

      for (const file of req.files) {
        const upload = await cloudinary.uploader.upload(
          `data:${file.mimetype};base64,${file.buffer.toString("base64")}`,
          { folder: "products" }
        );

        images.push({
          url: upload.secure_url,
          public_id: upload.public_id,
        });
      }

      // append new images to existing images array
      updates.$push = { images: { $each: images } };
    }

    const updatedProduct = await Product.findOneAndUpdate(
      {_id: productId,
        category: categoryId,
        subCategory: subCategoryId,
      },
      updates,{ new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found for this category & sub-category",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product: updatedProduct,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to update product",
    });
  }
};



export const getProducts = async (req, res) => {
  try {
    const { categoryId, subCategoryId } = req.params;

    const {
      search,
      status,
      page = 1,
      limit = 10,
    } = req.query;

    
    const filter = {
      category: categoryId,
      subCategory: subCategoryId,
    };

    
    if (search) {
      filter.$or = [
        { productName: { $regex: search, $options: "i" } },
        { brand: { $regex: search, $options: "i" } },
      ];
    }

   
    if (status !== undefined) {
      filter.status = status === "true";
    }

    const skip = (page - 1) * limit;

    
    const products = await Product.find(filter)
      .populate("category", "name")
      .populate("subCategory", "name")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    
    const total = await Product.countDocuments(filter);

    return res.status(200).json({
      success: true,
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
      products,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch products",
    });
  }
};


export const getSingleProduct = async (req, res) => {
  try {
    const { categoryId, subCategoryId, productId } = req.params;

    const product = await Product.findOne({
      _id: productId,
      category: categoryId,
      subCategory: subCategoryId,
    }).populate("category", "name")
      .populate("subCategory", "name");

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      success: true,
      product,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch product",
    });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .populate("category", "_id name status")
      .populate("subCategory", "_id name status");

    res.status(200).json({
      success:true,
      data:products
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch products",
      error: error.message,
    });
  }
};