import bcryptjs from"bcryptjs"
import { admin } from "../model/adminModel.js"
import { generateToken } from "../utils/generateToken.js";


export const login =async(req,res)=>{
    try {
        const {email,password}=req.body;

        let existingAdmin=await admin.findOne({email})
        if(!existingAdmin){
            return res.status(404).json({
                success:false,
                message:"Admin not found"
            })
        }
        const isMatch = await bcryptjs.compare(password , existingAdmin.password)
        if(!isMatch){
            return res.status(400).json({
                success:false,
                message:"Invalid Credentials"
            })
        }

        const token =generateToken({userId: existingAdmin._id , email: existingAdmin.email})
        return res.status(200).cookie("token",token,{
            httpOnly:true,
            maxAge:24*60*60*1000,
            sameSite: "strict"
        }).json({
            success:true,
            message:'Login Succesfull',
            user:existingAdmin,
            token
        })
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"Login failed"
        })
        
    }
}