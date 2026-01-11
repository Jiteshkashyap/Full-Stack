import { Category } from "../model/categoryModel.js";
import { SubCategory } from "../model/subCategoryModel.js";

export const createSubCategory = async (req,res)=>{
    try {
        const { name , status}=req.body;
        const {categoryId}=req.params

        const categoryExist= await Category.findById(categoryId);
        if(!categoryExist){
            return res.status(404).json({
                success:false,
                message:"Category not found"
            })
        }

        const duplicateSubcategory= await SubCategory.findOne({categoryId, name})
        if(duplicateSubcategory){
            return res.status(400).json({
                success:false,
                message:"Subcategory already exists"
            })
        }

        const subCategory =  await SubCategory.create({
            category:categoryId,
            name,
            status
        })

        await subCategory.save()

        return res.status(201).json({
            success:true,
            message:"Subcategory created succesfully",
            subCategory
        })


    }catch(error){
      console.error('create subcategory error :',error)
        return res.status(500).json({
            success:false,
            message:"Subcategory creation failed"
        })
    }
}

export const getAllSubCategories = async (req, res) => {
  try {
    const { search, status, category } = req.query;

    const filter = {};

    if (category) filter.category = category;
    if (status !== undefined) filter.status = status;

    if (search) {
      filter.name = { $regex: search, $options: "i" };
    }

    const subCategories = await SubCategory.find(filter)
      .populate("category", "name")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: subCategories.length,
      data: subCategories,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch sub-categories",
    });
  }
};

export const updateSubCategory= async (req,res)=>{
    try {
        const{subCategoryId , categoryId}= req.params
        const {name,status}=req.body

        const updates={}
        if(name)updates.name=name
        if (status !== undefined) updates.status = status;

        const updateSubCategory= await SubCategory.findOneAndUpdate({_id:subCategoryId,category:categoryId},updates , {new:true})
        if(!updateSubCategory){
            return res.status(404).json({
                success:false,
                message:"Sub-category not found"
            })
        }

        return res.status(200).json({
            success:true,
            message:"Sub-category updated succesfully",
            updateSubCategory
        })

        
    } catch (error) {
        return res.status(500).json({
        success:false,
        message: "Failed to update sub-categories"
     });
    }
}


 export const deleteSubCategory =async(req,res)=>{
    try {

        const{subCategoryId , categoryId}= req.params

        const subCategoryDelete = await SubCategory.findOneAndDelete({_id:subCategoryId, category:categoryId})

        if(!subCategoryDelete){
            return res.status(404).json({
                success:false,
                message:"SubCategory not found"
            })
        }
        return res.status(200).json({
            success:true,
            message:"Sub-Category deleted succesfully",
            
        })
        
    } catch (error) {
        return res.status(500).json({
        success:false,
        message: "Failed to delete sub-categories"
     });
    }
 }       



export const getSingleSubCategory = async (req, res) => {
  try {
    const { categoryId, subCategoryId } = req.params;

    const subCategory = await SubCategory.findOne({
      _id: subCategoryId,
      category: categoryId,
    }).populate("category", "name");

    if (!subCategory) {
      return res.status(404).json({
        success: false,
        message: "Sub-category not found",
      });
    }

    return res.status(200).json({
      success: true,
      subCategory,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch sub-category",
    });
  }
};

        

        