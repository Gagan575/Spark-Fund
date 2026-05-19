const UserModel=require ("../apis/User/UserModel")
const bcryptjs=require("bcryptjs")
UserModel.findOne({email:"admin@gmail.com"})
.then((userData)=>{
    if(!userData){
        let userObj=new UserModel()
        userObj.name="admin1"
        userObj.email="admin@gmail.com"
        userObj.password=bcryptjs.hashSync("1234",10)
        userObj.role="admin"
        userObj.save()
        .then((userData)=>{
            console.log("Admin seeded succesfully")
        })
        .catch((err)=>{
            console.log("error",err);
            
        })
    }
    else{
        console.log("Admin already seeded")
    }
})
.catch((err)=>{
    console.log("error during seeding", err);
    
})

