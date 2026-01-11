import { Category } from "../model/categoryModel.js";

export const createCategory= async(req,res)=>{
    try {
        const {name , status}=req.body;

        const existingCategory = await Category.findOne({name})
        if(existingCategory){
            return res.status(400).json({
                success:false,
                message:"Category already exists"
            })
        }
        const newCategory = await Category.create({
            name,
            status
        })

        return res.status(201).json({
            success:true,
            message:"Category created successfully",
            newCategory
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Category creation failed"
        })
    }
}

export const getAllCategory=async(req,res)=>{
    try {
        const categories = await Category.find({}).sort({createdAt:-1})
            return res.status(200).json({
                success:true,
                message:"list fetched succesfully",
                count:categories.length,
                data:categories
            })
        
        
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Unable to fetch list of categories"
        })
    }
}



export const updateCategory=async(req,res)=>{
    try {
        const {categoryId}=req.params
        const {name,status}=req.body

        const updates={}
        if(name)updates.name=name
        if (status !== undefined) updates.status = status;


        const categoryUpdate= await Category.findOneAndUpdate({_id:categoryId},updates,{new:true})
        if(!categoryUpdate){
            return res.status(404).json({
                success:false,
                message:"Category not found"
            })
        }
        
        return res.status(200).json({
            success:true,
            message:"Category updated successfully",
            categoryUpdate
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Category updation failed"
        })
    }
}


export const deleteCategory= async(req,res)=>{
    try {

        const {categoryId}= req.params

        const categoryDelete  = await Category.findOneAndDelete({_id:categoryId})
        if(!categoryDelete){
            return res.status(404).json({
                success:false,
                message:"Category not found"
            })
        }
        return res.status(200).json({
            success:true,
            message:"Category deleted succesfully",
            
        })
        
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Category deletion failed"
        })
    }
}

export const getSingleCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;

    const category = await Category.findOne({ _id: categoryId });

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    return res.status(200).json({
      success: true,
      category,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch category",
    });
  }
};
