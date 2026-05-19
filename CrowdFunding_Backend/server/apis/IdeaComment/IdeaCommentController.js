const IdeaCommentModel = require("./IdeaCommentModel")

// ADD COMMENT
add = (req, res) => {
    let formData = req.body
    let validation = ""

    if (!formData.ideaId) {
        validation += "IdeaId is required "
    }
    
    if (!formData.commentText) {
        validation += "Comment text is required "
    }

    if (!!validation) {
        res.json({
            status: 422,
            success: false,
            message: validation
        })
    }
    else {
        let commentObj = new IdeaCommentModel()
        commentObj.ideaId = formData.ideaId
        commentObj.userId = req.decoded.userId
        commentObj.commentText = formData.commentText

        commentObj.save()
            .then((data) => {
                res.json({
                    status: 200,
                    success: true,
                    message: "Comment Added",
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
}

// ALL COMMENTS
all = (req, res) => {
    IdeaCommentModel.find(req.body)
        .populate("ideaId")
        .populate("userId")
        .then((data) => {
            if (data.length > 0) {
                res.json({
                    status: 200,
                    success: true,
                    message: "Idea Comments Data",
                    data: data
                })
            }
            else {
                res.json({
                    status: 404,
                    success: false,
                    message: "No Comments Found"
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

// UPDATE COMMENT
update = (req, res) => {
    let formData = req.body
    let validation = ""

    if (!formData._id) {
        validation += "_ID is required "
    }
    if (!formData.commentText) {
        validation += "Comment text is required"
    }

    if (!!validation) {
        res.json({
            status: 422,
            success: false,
            message: validation
        })
    }
    else {
        IdeaCommentModel.findOne({ _id: formData._id })
            .then((commentData) => {
                if (!commentData) {
                    res.json({
                        status: 404,
                        success: false,
                        message: "Comment not found"
                    })
                }
                else {
                    commentData.commentText = formData.commentText

                    commentData.save()
                        .then((data) => {
                            res.json({
                                status: 200,
                                success: true,
                                message: "Comment Updated",
                                data: data
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
        IdeaCommentModel.findOne({ _id: formData._id })
            .populate("ideaId")
            .populate("userId")
            .then((commentData) => {
                if (!commentData) {
                    res.json({
                        status: 404,
                        success: false,
                        message: "Comment not found"
                    })
                }
                else {
                    res.json({
                        status: 200,
                        success: true,
                        message: "Comment Data",
                        data: commentData
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

// DELETE COMMENT
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
        IdeaCommentModel.deleteOne({ _id: formData._id })
            .then(() => {
                res.json({
                    status: 200,
                    success: true,
                    message: "Comment Deleted"
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
            sucess:false,
            message:validation
        })
    }
    else{
       IdeaCommentModel.findOne({_id:req.body._id})
        .then((commentData)=>{
           if(!commentData){
            res.json({
                status:404,
                sucess:false,
                message:"There is no Comments found on this id"
            })
           }
           else{
           commentData.status=!commentData.status
           commentData.save()
            .then((commentData)=>{
                res.json({
                    status:200,
                    success:true,
                    message:"Status updated",
                    data:commentData
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

module.exports = { add, all, update, Delete,single,changeStatus }
