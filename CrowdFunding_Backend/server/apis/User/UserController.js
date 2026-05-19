const UserModel=require("./UserModel")
const bcryptjs=require("bcryptjs")
const jwt=require("jsonwebtoken")
const { uploadImg } = require("../../utilities/helper")
const SECRET="SparkFund"
login=(req,res)=>{
    let formData=req.body
    let validation=""
    if(!formData.email){
        validation+="email is required"
    }
    if(!formData.password){
        validation+="password is required"
    }
    if(!!validation){
         res.json({
            status:422,
            sucess:false,
            message:validation
        })
    }
    else{
    UserModel.findOne({email:formData.email})
    .then((userData)=>{
        if (!userData) {
            res.json({
                status: 200,
                success: false,
                message: "User doesn't exist on given email"
            })
        }
        

      else{
               let result=bcryptjs.compareSync(formData.password, userData.password) 
                if(result){
                    let payload={
                        name:userData.name,
                        email:userData.email,
                        userId:userData._id,
                        role:userData.role
                    }
                    
                    let token=jwt.sign(payload, SECRET, {expiresIn:"24h"})
                    res.json({
                        status:200,
                        success:true,
                        message:"Login successfully",
                        data:userData,
                        token:token
                    })
                }else{
                    res.json({
                        status:200,
                        success:false,
                        message:"Invalid credentials"
                    })
                }
               
            }
    })


    .catch((err) => {
        res.json({
            status: 500,
            success: false,
            message: "Internal server error!!"
        })
    })  
    
    
   }
}

register=(req,res)=>{
    let formData=req.body
    let validation=""
    if(!formData.email){
        validation+="email is required"
    }
    
    if(!formData.password){
        validation+="password is required"
    }
    
    if(!formData.name){
        validation+="name is required"
    }
    if(!formData.contact){
        validation+="contact is required"
    }
    if(!req.file){
        validation+="profile is required"
    }
    if(!!validation){
        res.json({
            status:422,
            sucess:false,
            message:validation
        })
    }
    else{
        UserModel.findOne({email:formData.email})
        .then(async(userData)=>{
            if(!userData){
              let userObj=new UserModel()
              userObj.name=formData.name
              userObj.email=formData.email
               userObj.contact=formData.contact
                userObj.role="owner"
              
              userObj.password=bcryptjs.hashSync(formData.password, 10)
            
            
                let url = await uploadImg(req.file.buffer);
                userObj.profileImage = url;
              userObj.save()
              .then((userData)=>{
                        res.json({
                            status:200,
                            success:true,
                            message:"user Registered",
                            data:userData
                        })
                    })
                .catch((err)=>{
                        console.log(err)
                        res.json({
                            status:500,
                            success:false,
                            message:"internal server error"
                        }) 
                    })
            }
            else{
                res.json({
                    status:200,
                    success:false,
                    message:"User already exist with same email",
                    
                })
            }
        })
        .catch((err) => {
            console.log(err)
            res.json({
                status: 500,
                success: false,
                message: "internal server error"
            })
        })
    }


}

all=(req,res)=>{
    let formData=req.body
    UserModel.find({ role:"owner"})
    .then((userData)=>{
        if(userData.length>0){
           res.json({
                status:200,
                success:true,
                message:"Users Data is as:",
                data:userData
            })
        }
        else{
            res.json({
                status:404,
                success:false,
                message:"there are no users"
            })
            
        }
    })
    .catch((err)=>{
        res.json({
            status:500,
            success:false,
            message:"internal server error",
            error:err.message
        })
    })
}

single=(req,res)=>{
    let formData=req.body
    let validation=""
    if(!formData._id){
        validation+="_ID IS REQUIRED"
    }
    if(!!validation){
        res.json({
            status:422,
            success:false,
            message:validation
        })
    }
    else{
        UserModel.findOne({_id:req.body._id})
        .populate({
            path:"email",
            select:"name keyword"
        })
        .then((userData)=>{
            if(!userData){
                res.json({
                    status:404,
                    success:false,
                    message:"there is no user "
                })
            }
            else{
                res.json({
                    status:200,
                    success:true,
                    message:"user Data is as",
                    data:userData
                })
            }
        })
        .catch((err)=>{
            res.json({
                status:500,
                success:false,
                message:"internal server error"
            })
        })
    }
}
update=(req,res)=>{
    let formData=req.body
    let validation=""
    if(!formData._id){
        validation+="_ID IS REQUIRED"
    }
    if(!!validation){
        res.json({
            status:422,
            success:false,
            message:validation
        })
    }
    else{
        UserModel.findOne({_id:req.body._id})
        .then(async(userData)=>{
            if(!userData){
                res.json({
                    status:404,
                    success:false,
                    message:"there is no data"
                })
            }
            else{
                if (req.file) {
                    const imageUrl = await uploadImg(req.file.buffer);
                    userData.profileImage = imageUrl;
                }
                
                if(!!formData.name){
                   userData.name=formData.name 
                }
               
                userData.save()
                .then((userData)=>{
                    res.json({
                        status:200,
                        success:true,
                        message:"user Updated",
                        data: userData
                    })
                })
                .catch((err)=>{
                    res.json({
                        status:500,
                        success:false,
                        message:"internal server error"
                       
                    })
                })
            }
        })
        .catch((err) => {
            res.json({
                status: 500,
                success: false,
                message: "internal server error"
                
            })
        })

    }
}
softDelete=(req,res)=>{
    let formData=req.body
    let validation=""
    if(!formData._id){
        validation+="_id is req"
    }
    if(!!validation){
        res.json({
            status:422,
            sucess:false,
            message:validation
        })
    }
    else{
        UserModel.findOne({_id:req.body._id})
        .then((userData)=>{
           if(!userData){
            res.json({
                status:404,
                sucess:false,
                message:"there is no User found on this id"
            })
           }
           else{
            userData.status = userData.status === "Active" ? "Blocked" : "Active";
            userData.save()
            .then((userData)=>{
                res.json({
                    status:200,
                    success:true,
                    message:"User Status updated",
                    data:userData
                })
            })
            .catch((err)=>{
                console.log(1);
                
                res.json({
                    status:500,
                    success:false,
                    message:"internal server error"
                })
            })
           }

        })
        .catch((err)=>{
            console.log(err);
            
            res.json({
                status:500,
                success:false,
                message:"Internal server error!!"
            })
        })
    }

}
Delete=(req,res)=>{
    let formData=req.body
    let validation=""
    if(!formData._id){
        validation+="_ID IS REQUIRED"
    }
    if(!!validation){
        res.json({
            status:422,
            success:false,
            message:validation
        })
    }
    else{
        UserModel.findOne({_id:req.body._id})
        .then((userData)=>{
            if(!userData){
                res.json({
                    status:404,
                    success:false,
                    message:"there is no data"
                })
            }
            else{
                UserModel.deleteOne({_id:req.body._id})
                    .then(() => {
                        res.json({
                            status: 200,
                            success: true,
                            message: "user deleted!!"
                        })
                    })
                    .catch((err) => {
                        res.json({
                            status: 500,
                            success: false,
                            message: "Internal server error"
                        })
                    })
            }

        })
        .catch((err)=>{
            res.json({
                status:500,
                success:false,
                message:"Internal server error"
            })
        })    

    }


}

module.exports = { login,register,all,single,update,softDelete,Delete}