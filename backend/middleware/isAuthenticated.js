import jwt from "jsonwebtoken"

export const isAuthenticated = async(req, res, next)=>{
    try{
        let token= req.headers.authorization

    if(!token){
        return res.status(401).json({
            success:false,
            message:"Token Missing"
        })
    }

    const decode= jwt.verify(token , process.env.JWT_SECRET)
    req.id = decode.userId
    next()
    }catch(err){
        console.log(err);
        return res.status(401).json({
            success:false,
            message:"Token is invalid"
        });
        
    }
    
}