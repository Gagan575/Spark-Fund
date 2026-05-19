const jwt=require("jsonwebtoken")
const SECRET="SparkFund"
module.exports=(req,res, next)=>{
    let token=req.headers.authorization 
    if(!token){
        res.json({
            status:403, 
            success:false,
            message:"Please login!"
        })
    }else{
        
        jwt.verify(token, SECRET, function(err, decoded){
            if(!!err){
                res.json({
                    status:403,
                    success:false,
                    message:"Invalid Access"
                })
            }else{
                req.decoded=decoded
                if(decoded.role=="investor"){
                   next()
                    
                }else{
                   res.json({
                    status:403,
                    success:false,
                    message:"Unauthorized access!!"
                   })
                    
                }
            }
        })
    }

}