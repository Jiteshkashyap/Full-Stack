import mongoose, { Mongoose } from "mongoose";

const adminSchema= new mongoose.Schema({

    email:{type:String , required:true , unique:true},
    password:{type:String , required:true}
    
},{timestamps:true})


export const admin =mongoose.model('Admin',adminSchema)