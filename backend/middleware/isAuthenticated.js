import jwt from 'jsonwebtoken';

export const isAuthenticated = async(req,res,next) =>{
    try {
        const token = req.cookies.token;
        if(!token){
            return res.status(400).json({message: "No Token Found!"})
        }
        const decode = await jwt.verify(token, process.env.JWT_SECRET_KEY);
        if(!decode){
            return res.status(400).json({message:"Invalid Token"})
        }
        req.id = decode.userId
        // console.log("Decoded user ,", decode);
        
        next()
    } catch (error) {
        console.log("error in isAuthenticated Middleware", error);
        
    }

}



