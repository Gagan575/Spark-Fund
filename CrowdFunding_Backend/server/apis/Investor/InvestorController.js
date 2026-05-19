const UserModel = require("../User/UserModel")
const bcryptjs = require("bcryptjs")
const InvestorModel = require("./InvestorModel")
const { uploadImg } = require("../../utilities/helper")
register = (req, res) => {
    let formData = req.body
    let validation = ""
    if (!formData.name) {
        validation += "Name is required"
    }
    if (!formData.email) {
        validation += "Email is required"
    }
    if (!formData.password) {
        validation += "Password is required"
    }
    if (!formData.riskPreference) {
        validation += "riskPreference is required"
    }
    if (!formData.country) {
        validation += "country is required"
    }

    if (!req.files || !req.files.profileImage) {
    validation += "ProfileImage is required"
}
if (!req.files || !req.files.verificationImage) {
    validation += "Verification image is required"
}

    // if(!formData.bio){
    //     validation+="Bio is required"
    // }
    // if(!formData.contact){
    //     validation+="Contact is required"
    // }
    // if(!formData.organisationName){
    //     validation+="OrganisationName is required"
    // }
    if (!!validation) {
        res.json({
            status: 422,
            sucess: false,
            message: validation
        })
    }
    else {

        UserModel.findOne({ email: formData.email })
            .then(async (userData) => {
                if (!userData) {
                    let userObj = new UserModel()

                    userObj.name = formData.name
                    userObj.email = formData.email
                    userObj.password = bcryptjs.hashSync(formData.password, 10)
                    userObj.role = "investor"
                    userObj.contact = formData.contact

                    let profileUrl = await uploadImg(req.files.profileImage[0].buffer)
userObj.profileImage = profileUrl

                    userObj.save()

                        .then(async (userData) => {
                            let investorObj = new InvestorModel()

                            investorObj.userId = userData._id
                            investorObj.country = formData.country
                            investorObj.riskPreference = formData.riskPreference
                            let verificationUrl = await uploadImg(req.files.verificationImage[0].buffer)
investorObj.verificationImage = verificationUrl



                            investorObj.save()
                                .then((investorData) => {
                                    res.json({
                                        status: 200,
                                        success: true,
                                        message: "Investor Registered",
                                        investorData,
                                        userData
                                    })
                                })
                                .catch((err) => {
                                    console.log(err)
                                    res.json({
                                        status: 500,
                                        success: false,
                                        message: "Internal server error"
                                    })
                                })

                        })
                        .catch((err) => {
                            console.log(err)
                            res.json({
                                status: 500,
                                success: false,
                                message: "Internal server error"
                            })
                        })

                }
                else {
                    res.json({
                        status: 200,
                        success: false,
                        message: "User already exist with same email",
                        data: userData
                    })
                }
            })
            .catch((err) => {
                console.log(err)
                res.json({
                    status: 500,
                    sucess: false,
                    message: "Internal server error"
                })
            })
    }
}


all = (req, res) => {
    let formData = req.body
    InvestorModel.find(req.body)
        .populate({
            path: "userId",

        })
       
        .then((investorData) => {
            if (investorData.length > 0) {
                res.json({
                    status: 200,
                    success: true,
                    message: "Investors Data is as:",
                    data: investorData
                })
            }
            else {
                res.json({
                    status: 404,
                    success: false,
                    message: "there are no Investors"
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
    if (!formData.userId) {
        validation += "userId IS REQUIRED"
    }
    if (!!validation) {
        res.json({
            status: 422,
            success: false,
            message: validation
        })
    }
    else {
        InvestorModel.findOne({ userId: req.body.userId })
            // .populate({
            //     path:"InvestorId",
            //     select:"InvestorName keyword"
            // })
            .then((investorData) => {
                if (!investorData) {
                    res.json({
                        status: 404,
                        success: false,
                        message: "There is no Investor "
                    })
                }
                else {
                    res.json({
                        status: 200,
                        success: true,
                        message: "Investor Data is as",
                        data: investorData
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
        InvestorModel.findOne({ _id: req.body._id })
            .then(async (investorData) => {
                if (!investorData) {
                    res.json({
                        status: 404,
                        success: false,
                        message: "There is no data"
                    })
                }
                else {


                    if (!!formData.riskPreference) {
                        investorData.riskPreference = formData.riskPreference
                    }
                    if (!!formData.country) {
                        investorData.country = formData.country
                    }
                    // if (req.file) {
                    //     const imageUrl = await uploadImg(req.file.buffer);
                    //     investorData.image = imageUrl;
                    // }
                    investorData.save()
                        .then((investorData) => {
                            res.json({
                                status: 200,
                                success: true,
                                message: "Investor Updated",
                                data: investorData
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



changeStatus = (req, res) => {
    const formData = req.body;
    const allowedStatus = ["Pending", "Verified", "Rejected"];

    if (!formData._id || !allowedStatus.includes(formData.kycStatus)) {
        return res.json({
            status: 422,
            success: false,
            message: "Invalid data"
        });
    }



    InvestorModel.findOne({ _id: req.body._id })
        .then((investorData) => {
            if (!investorData) {
                return res.json({
                    status: 404,
                    success: false,
                    message: "Idea Pitch Data not found"
                });
            }


            investorData.kycStatus = formData.kycStatus;

            return investorData.save();
        })
        .then((investorData) => {
            if (investorData) {
                res.json({
                    status: 200,
                    success: true,
                    message: `investor status updated to ${investorData.kycStatus}`,
                    data: investorData
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
        InvestorModel.findOne({ _id: req.body._id })
            .then((investorData) => {
                if (!investorData) {
                    res.json({
                        status: 404,
                        success: false,
                        message: "There is no data"
                    })
                }
                else {
                    InvestorModel.deleteOne({ _id: req.body._id })
                        .then(() => {
                            res.json({
                                status: 200,
                                success: true,
                                message: "Investor deleted!!"
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


module.exports = { register, all, single, update, changeStatus, Delete }
