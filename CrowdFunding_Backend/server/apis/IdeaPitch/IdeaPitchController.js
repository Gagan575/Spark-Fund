const mongoose = require("mongoose")
const { uploadImg, uploadVideo } = require("../../utilities/helper")
const IdeaPitchModel = require("./IdeaPitchModel")

add = (req, res) => {
    let formData = req.body
    let validation = ""
    if (!formData.title) {
        validation += "Idea Pitch name is required"
    }
    if (!formData.description) {
        validation += "Description is required"
    }
    if (!formData.categoryId) {
        validation += "CategoryId is required"
    }

    if (!formData.totalSales) {
        validation += "totalSales is required"
    }
    if (!formData.currentYearSales) {
        validation += "currentYearSales is required"
    }
    if (!req.file) {
        validation += "pitchVideo is required"
    }
    if (!!validation) {
        res.json({
            status: 422,
            success: false,
            message: validation
        })
    }
    else {
        //duplicacy     
        IdeaPitchModel.findOne({ title: formData.title,categoryId: formData.categoryId })
            .then(async (ideaPitchData) => {
                if (!ideaPitchData) {
                    let ideaPitchObj = new IdeaPitchModel()
                    ideaPitchObj.ownerId = req.decoded.userId
                    ideaPitchObj.title = formData.title
                    ideaPitchObj.categoryId = formData.categoryId

                    ideaPitchObj.description = formData.description
                    ideaPitchObj.totalSales = formData.totalSales
                    ideaPitchObj.currentYearSales = formData.currentYearSales
                    ideaPitchObj.aiScore = formData.aiScore




                    let url = await uploadVideo(req.file.buffer)
                    ideaPitchObj.pitchVideoUrl = url


                    ideaPitchObj.save()
                        .then((ideaPitchData) => {
                            res.json({
                                status: 200,
                                success: true,
                                message: "Idea Pitch Added!!",
                                data: ideaPitchData
                            })
                        })
                        .catch((err) => {
                            res.json({
                                status: 500,
                                success: false,
                                message: "Internal server error"
                            })
                        })
                } else {
                    res.json({
                        status: 200,
                        success: false,
                        message: "Idea Pitch already exist on given name"
                    })
                }
            })
            .catch((err) => {
                res.json({
                    status: 500,
                    success: false,
                    message: "Internal server error!!",
                    error:err.message
                })
            })

    }
}

all = (req, res) => {
     let filter = {}
     if (req.body._id) {
        filter._id = new mongoose.Types.ObjectId(req.body._id);
    }

    if (req.body.ownerId) {
        filter.ownerId = new mongoose.Types.ObjectId(req.body.ownerId)
    }

    if (req.body.categoryId) {
        filter.categoryId = new mongoose.Types.ObjectId(req.body.categoryId)
    }
    if (req.body.status) {
        filter.status = "Approved"
    }
    let formData = req.body
    IdeaPitchModel.find(filter)
        .populate({
            path:"categoryId",
            select:"categoryName keyword"
        })
         .populate({
            path:"ownerId",
            
        })
        .then((ideaPitchData) => {
            if (ideaPitchData.length > 0) {
                res.json({
                    status: 200,
                    success: true,
                    message: "Idea Pitchs Data is as:",
                    data: ideaPitchData
                })
            }
            else {
                res.json({
                    status: 404,
                    success: false,
                    message: "There are no Idea Pitchs"
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
        validation += "_ID IS REQUIRED"
    }
    if (!!validation) {
        res.json({
            status: 422,
            success: false,
            message: validation
        })
    }
    else {
        IdeaPitchModel.findOne({ _id: req.body._id })
            // .populate({
            //     path:"Idea PitchId",
            //     select:"Idea PitchName keyword"
            // })
            .then((ideaPitchData) => {
                if (!ideaPitchData) {
                    res.json({
                        status: 404,
                        success: false,
                        message: "There is no Idea Pitch "
                    })
                }
                else {
                    res.json({
                        status: 200,
                        success: true,
                        message: "Idea Pitch Data is as",
                        data: ideaPitchData
                    })
                }
            })
            .catch((err) => {
                res.json({
                    status: 500,
                    success: false,
                    message: "Internal server error"
                })
            })
    }
}
update = (req, res) => {
    let formData = req.body
    let validation = ""

    if (!formData._id) {
        validation += "_Id is required"
    }

    if (!!validation) {
        return res.json({
            status: 422,
            success: false,
            message: validation
        })
    }

    IdeaPitchModel.findOne({ _id: formData._id })
        .then(async (ideaPitchData) => {
            if (!ideaPitchData) {
                return res.json({
                    status: 404,
                    success: false,
                    message: "There is no data"
                })
            }

            // ✅ STATUS CHECK (core rule)
            const status = ideaPitchData.status.toLowerCase();
            if (status !== "pending" && status !== "rejected") {
                return res.json({
                    status: 403,
                    success: false,
                    message: "Idea cannot be updated once approved or funded"
                })
            }

            // ✅ Allowed updates
            if (formData.title) {
                ideaPitchData.title = formData.title
            }
            if (formData.aiScore) {
                ideaPitchData.aiScore = formData.aiScore
            }

            if (formData.description) {
                ideaPitchData.description = formData.description
            }

            if (formData.totalSales !== undefined) {
                ideaPitchData.totalSales = formData.totalSales
            }
            if (formData.currentYearSales !== undefined) {
                ideaPitchData.currentYearSales = formData.currentYearSales
            }

            // ❌ Do NOT update currentYearSales here

            if (req.file) {
                const pitchVideoUrl = await uploadVideo(req.file.buffer);
                ideaPitchData.pitchVideoUrl = pitchVideoUrl;
            }

            ideaPitchData.save()
                .then((data) => {
                    res.json({
                        status: 200,
                        success: true,
                        message: "Idea Pitch Updated",
                        data: data
                    })
                })
                .catch(() => {
                    res.json({
                        status: 500,
                        success: false,
                        message: "Internal server error"
                    })
                })
        })
        .catch(() => {
            res.json({
                status: 500,
                success: false,
                message: "Internal server error"
            })
        })
}



changeStatus = (req, res) => {
    const formData = req.body;
    const allowedStatus = ["Pending", "Approved", "Rejected","Funded"];

    if (!formData._id || !allowedStatus.includes(formData.status)) {
        return res.json({
            status: 422,
            success: false,
            message: "Invalid data"
        });
    }



    IdeaPitchModel.findOne({ _id: req.body._id })
        .then((ideaPitchData) => {
            if (!ideaPitchData) {
                return res.json({
                    status: 404,
                    success: false,
                    message: "Idea Pitch Data not found"
                });
            }


            ideaPitchData.status = formData.status;

            return ideaPitchData.save();
        })
        .then((ideaPitchData) => {
            if (ideaPitchData) {
                res.json({
                    status: 200,
                    success: true,
                    message: `IdeaPitch status updated to ${ideaPitchData.status}`,
                    data: ideaPitchData
                });
            }
        })
        .catch((err) => {
            console.error(err);
            res.json({
                status: 500,
                success: false,
                message: "Internal server error"
            });
        });
};



Delete = (req, res) => {
    let formData = req.body
    let validation = ""
    if (!formData._id) {
        validation += "_ID IS REQUIRED"
    }
    if (!!validation) {
        res.json({
            status: 422,
            success: false,
            message: validation
        })
    }
    else {
        IdeaPitchModel.findOne({ _id: req.body._id })
            .then((ideaPitchData) => {
                if (!ideaPitchData) {
                    res.json({
                        status: 404,
                        success: false,
                        message: "There is no data"
                    })
                }
                else {
                    IdeaPitchModel.deleteOne({ _id: req.body._id })
                        .then(() => {
                            res.json({
                                status: 200,
                                success: true,
                                message: "Idea Pitch deleted!!"
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
            .catch((err) => {
                res.json({
                    status: 500,
                    success: false,
                    message: "Internal server error"
                })
            })

    }


}


module.exports = { add, all, single, update, changeStatus, Delete }