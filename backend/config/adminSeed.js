import bcrypt from "bcryptjs";
import { admin } from "../model/adminModel.js";

export const adminSeed=async( req,res)=>{
    try {
        const adminEmail="admin@gmail.com"

        const existingAdmin = await admin.findOne({email:adminEmail})

        if(existingAdmin){
            console.log("Admin already seeded!")
            return
        }

        const hashPassword = await bcrypt.hash("admin123",10)

        await admin.create({
            email:adminEmail,
            password:hashPassword,
            
        })
        console.log("Admin seeded succesfully")
        
    } catch (error) {
        console.log(" error while admin seeding ",error)
    }

}