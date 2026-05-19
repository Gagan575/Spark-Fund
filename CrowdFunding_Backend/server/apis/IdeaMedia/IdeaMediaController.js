const mongoose = require("mongoose")


const { uploadImg } = require("../../utilities/helper")

const IdeaMediaModel = require("./IdeaMediaModel")

add = (req, res) => {
    let formData = req.body;
    let validation = "";

    if (!formData.ideaId) {
        validation += "Idea is required";
    }

    if (!!validation) {
        return res.json({
            status: 422,
            success: false,
            message: validation
        });
    }

    // 🔹 MULTIPLE FILE CHECK
    if (!req.files || req.files.length === 0) {
        return res.json({
            status: 422,
            success: false,
            message: "File is required"
        });
    }

    (async () => {
        try {
            let savedMedia = [];

            for (let file of req.files) {
                let mediaUrl = "";
                let mediaType = "";

                // 🎥 VIDEO
                if (file.mimetype.startsWith("video")) {
                    mediaUrl = await uploadVideo(file.buffer);
                    mediaType = "video";
                }
                // 🖼️ IMAGE
                else if (file.mimetype.startsWith("image")) {
                    mediaUrl = await uploadImg(file.buffer);
                    mediaType = "image";
                }
                // 📄 DOCUMENT
                else {
                    mediaUrl = await uploadDocument(file.buffer);
                    mediaType = "document";
                }

                let ideaObj = new IdeaMediaModel();
                ideaObj.ideaId = formData.ideaId;
                ideaObj.mediaUrl = mediaUrl;
                ideaObj.mediaType = mediaType;

                await ideaObj.save();
                savedMedia.push(ideaObj);
            }

            res.json({
                status: 200,
                success: true,
                message: "Idea Media Added!!",
                data: savedMedia
            });

        } catch (err) {
            res.json({
                status: 500,
                success: false,
                message: "Internal server error",
                error: err.message
            });
        }
    })();
};



all = (req, res) => {
    let formData = req.body
    let filter = {}
         if (req.body.ideaId) {
            filter.ideaId = new mongoose.Types.ObjectId(req.body.ideaId);
        }
        
    
        // if (req.body.ownerId) {
        //     filter.ownerId = new mongoose.Types.ObjectId(req.body.ownerId)
        // }
    
        // if (req.body.categoryId) {
        //     filter.categoryId = new mongoose.Types.ObjectId(req.body.categoryId)
        // }
    
   
    IdeaMediaModel.find(filter)
     .populate("ideaId")
        
        

        .then((ideaData) => {
            if (ideaData.length > 0) {
                res.json({
                    status: 200,
                    success: true,
                    message: "Idea Medias Data is as:",
                    data: ideaData
                })
            }
            else {


                res.json({
                    status: 404,
                    success: false,
                    message: "There are no Idea Medias"
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
       IdeaMediaModel.findOne({ _id: req.body._id })
            // .populate({
            //     path:"Idea MediaId",
            //     select:"Idea MediaName keyword"
            // })
            .then((ideaData) => {
                if (!ideaData) {
                    res.json({
                        status: 404,
                        success: false,
                        message: "There is no Idea Media "
                    })
                }
                else {
                    res.json({
                        status: 200,
                        success: true,
                        message: "Idea Media Data is as",
                        data: ideaData
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
update = async (req, res) => {
    try {
        const mediaId = req.body._id; // media doc id
        const file = req.files[0]; // single file for update

        if (!mediaId) {
            return res.status(422).json({ success: false, message: "_id is required" });
        }

        const mediaDoc = await IdeaMediaModel.findById(mediaId);
        if (!mediaDoc) {
            return res.status(404).json({ success: false, message: "Media not found" });
        }

        // Upload new file
        let mediaUrl = "";
        let mediaType = "";
        if (file.mimetype.startsWith("video")) {
            mediaUrl = await uploadVideo(file.buffer);
            mediaType = "video";
        } else if (file.mimetype.startsWith("image")) {
            mediaUrl = await uploadImg(file.buffer);
            mediaType = "image";
        } else {
            mediaUrl = await uploadDocument(file.buffer);
            mediaType = "document";
        }

        mediaDoc.mediaUrl = mediaUrl;
        mediaDoc.mediaType = mediaType;

        await mediaDoc.save();

        res.json({ success: true, message: "Media updated", data: mediaDoc });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
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
       IdeaMediaModel.findOne({ _id: req.body._id })
            .then((ideaData) => {
                if (!ideaData) {
                    res.json({
                        status: 404,
                        success: false,
                        message: "there is no data"
                    })
                }
                else {
                   IdeaMediaModel.deleteOne({ _id: req.body._id })
                        .then(() => {
                            res.json({
                                status: 200,
                                success: true,
                                message: "Idea Media deleted!!"
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