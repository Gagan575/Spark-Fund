const InvestmentModel = require("./InvestmentModel")

// ADD INVESTMENT
add = (req, res) => {
    let formData = req.body
    let validation = ""

    if (!formData.ideaId) {
        validation += "IdeaId is required "
    }
   
    if (!formData.amount) {
        validation += "Amount is required "
    }
    if (!formData.equityPercent) {
        validation += "Equity percent is required "
    }

    if (!!validation) {
        res.json({
            status: 422,
            success: false,
            message: validation
        })
    }
   
    else {
        let investmentObj = new InvestmentModel()
        investmentObj.ideaId = formData.ideaId
        investmentObj.investorId =req.decoded.userId
        investmentObj.amount = formData.amount
        investmentObj.equityPercent = formData.equityPercent
        // investmentObj.status = formData.status || "Active"

        investmentObj.save()
            .then((data) => {
                res.json({
                    status: 200,
                    success: true,
                    message: "Investment Added",
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

// GET ALL INVESTMENTS
all = (req, res) => {
    InvestmentModel.find(req.body)
        .populate({
      path: "ideaId",
      populate: {
          path: "ownerId",
          select: "name"
      }
  })
        .populate("investorId")
        .then((data) => {
            if (data.length > 0) {
                res.json({
                    status: 200,
                    success: true,
                    message: "Investments Data",
                    data: data
                })
            }
            else {
                res.json({
                    status: 404,
                    success: false,
                    message: "No Investments Found"
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

// UPDATE INVESTMENT
update = (req, res) => {
    let formData = req.body
    let validation = ""

    if (!formData._id) {
        validation += "_ID is required "
    }

    if (!!validation) {
        res.json({
            status: 422,
            success: false,
            message: validation
        })
    }
    else {
        InvestmentModel.findOne({ _id: formData._id })
            .then((investmentData) => {
                if (!investmentData) {
                    res.json({
                        status: 404,
                        success: false,
                        message: "Investment not found"
                    })
                }
                else {
                    if (formData.amount) investmentData.amount = formData.amount
                    if (formData.equityPercent) investmentData.equityPercent = formData.equityPercent
                    if (formData.status) investmentData.status = formData.status

                    investmentData.save()
                        .then((data) => {
                            res.json({
                                status: 200,
                                success: true,
                                message: "Investment Updated",
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

// SINGLE INVESTMENT
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
        InvestmentModel.findOne({ _id: formData._id })
            .populate("ideaId")
            .populate("investorId")
            .then((investmentData) => {
                if (!investmentData) {
                    res.json({
                        status: 404,
                        success: false,
                        message: "Investment not found"
                    })
                }
                else {
                    res.json({
                        status: 200,
                        success: true,
                        message: "Investment Data",
                        data: investmentData
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

changeStatus= (req, res) => {
    const formData = req.body;
    const allowedStatus = ["Active", "Refunded", "Frozen","Pending"];

    if (!formData._id || !allowedStatus.includes(formData.status)) {
        return res.json({
            status: 422,
            success: false,
            message: "Invalid data"
        });
    }

    

    InvestmentModel.findOne({_id:req.body._id})
        .then((investmentData) => {
            if (!investmentData) {
                return res.json({
                    status: 404,
                    success: false,
                    message: "Investment Data not found"
                });
            }

            
            investmentData.status = formData.status;

            return investmentData.save();
        })
        .then((investmentData) => {
            if (investmentData) {
                res.json({
                    status: 200,
                    success: true,
                    message: `Investment status updated to ${investmentData.status}`,
                    data: investmentData
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

// DELETE INVESTMENT
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
        InvestmentModel.deleteOne({ _id: formData._id })
            .then(() => {
                res.json({
                    status: 200,
                    success: true,
                    message: "Investment Deleted"
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

// CHANGE STATUS


module.exports = { add, all, update, Delete, single, changeStatus }
