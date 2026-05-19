const IdeaLikesModel = require("./IdeaLikesModel")

// ADD LIKE
add = (req, res) => {
    let formData = req.body
    let validation = ""

    if (!formData.ideaId) {
        validation += "IdeaId is required "
    }
    // if (!formData.userId) {
    //     validation += "UserId is required "
    // }

    if (!!validation) {
        res.json({
            status: 422,
            success: false,
            message: validation
        })
    }
    else {
        // prevent duplicate like
        IdeaLikesModel.findOne({ ideaId: formData.ideaId, userId: formData.userId })
            .then((likeData) => {
                if (likeData) {
                    res.json({
                        status: 200,
                        success: false,
                        message: "Idea already liked"
                    })
                }
                else {
                    let likeObj = new IdeaLikesModel()
                    likeObj.ideaId = formData.ideaId
                    likeObj.userId = req.decoded.userId

                    likeObj.save()
                        .then((data) => {
                            res.json({
                                status: 200,
                                success: true,
                                message: "Idea Liked",
                                data: data
                            })
                        })
                        .catch((err) => {
                            res.json({
                                status: 500,
                                success: false,
                                message: "Internal server error",
                                error: err.message
                            })
                        })
                }
            })
            .catch((err) => {
                res.json({
                    status: 500,
                    success: false,
                    message: "Internal server error",
                    error: err.message
                })
            })
    }
}

// ALL LIKES
all = (req, res) => {
    IdeaLikesModel.find(req.body)
        .populate("ideaId")
        .populate("userId")
        .then((data) => {
            if (data.length > 0) {
                res.json({
                    status: 200,
                    success: true,
                    message: "Idea Likes Data",
                    data: data
                })
            }
            else {
                res.json({
                    status: 404,
                    success: false,
                    message: "No Likes Found"
                })
            }
        })
        .catch((err) => {
            res.json({
                status: 500,
                success: false,
                message: "Internal server error",
                error: err.message
            })
        })
}
single = (req, res) => {
    let formData = req.body
    let validation = ""

    if (!formData._id) {
        validation += "_ID is required"
    }

    if (!!validation) {
        res.json({
            status: 422,
            success: false,
            message: validation
        })
    }
    else {
        IdeaLikesModel.findOne({ _id: formData._id })
            .populate("ideaId")
            .populate("userId")
            .then((likeData) => {
                if (!likeData) {
                    res.json({
                        status: 404,
                        success: false,
                        message: "Like not found"
                    })
                }
                else {
                    res.json({
                        status: 200,
                        success: true,
                        message: "Like Data",
                        data: likeData
                    })
                }
            })
            .catch((err) => {
                res.json({
                    status: 500,
                    success: false,
                    message: "Internal server error",
                    error: err.message
                })
            })
    }
}


// DELETE LIKE (UNLIKE)
Delete = (req, res) => {
    let formData = req.body
    let validation = ""

    if (!formData._id) {
        validation += "_ID is required"
    }

    if (!!validation) {
        res.json({
            status: 422,
            success: false,
            message: validation
        })
    }
    else {
        IdeaLikesModel.deleteOne({ _id: formData._id })
            .then(() => {
                res.json({
                    status: 200,
                    success: true,
                    message: "Like removed"
                })
            })
            .catch((err) => {
                res.json({
                    status: 500,
                    success: false,
                    message: "Internal server error",
                    error: err.message
                })
            })
    }
}
changeStatus=(req,res)=>{
    let formData=req.body
    let validation=""
    if(!formData._id){
        validation+="_id IS REQUIRED"
    }
    if(!!validation){
        res.json({
            status:422,
            success:false,
            message:validation
        })
    }
    else{
       IdeaLikesModel.findOne({_id:req.body._id})
        .then((ideaLikesData)=>{
           if(!ideaLikesData){
            res.json({
                status:404,
                success:false,
                message:"There is no Likes found on this id"
            })
           }
           else{
           ideaLikesData.status=!ideaLikesData.status
           ideaLikesData.save()
            .then((ideaLikesData)=>{
                res.json({
                    status:200,
                    success:true,
                    message:"Status updated",
                    data:ideaLikesData
                })
            })
            .catch((err)=>{
                console.log(1);
                
                res.json({
                    status:500,
                    success:false,
                    message:"Internal server error"
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

module.exports = { add, all, Delete,single,changeStatus }
