const PaymentModel = require("./PaymentModel");

// ADD PAYMENT
add = (req, res) => {
    let formData = req.body;
    let validation = "";

    if (!formData.investmentId){ validation += "investmentId is required ";}
    if (!formData.amount){ validation += "Amount is required ";}
    if (!formData.paymentMethod){ validation += "Payment method is required ";}
    if (!formData.transactionId){ validation += "TransactionId is required ";}

    if (!!validation) {
        res.json({
            status: 422,
            success: false,
            message: validation
        });
    } else {
        let paymentObj = new PaymentModel();
        paymentObj.investmentId = formData.investmentId;
        paymentObj.amount = formData.amount;
        paymentObj.paymentMethod = formData.paymentMethod;
        paymentObj.transactionId = formData.transactionId;
        paymentObj.paymentStatus = formData.paymentStatus || "Pending";

        paymentObj.save()
            .then((data) => {
                res.json({
                    status: 200,
                    success: true,
                    message: "Payment Added",
                    data: data
                });
            })
            .catch((err) => {
                res.json({
                    status: 500,
                    success: false,
                    message: "Internal server error",
                    error: err.message
                });
            });
    }
}

// GET ALL PAYMENTS
all = (req, res) => {
    PaymentModel.find(req.body)
        .populate("investmentId")
        .then((data) => {
            if (data.length > 0) {
                res.json({
                    status: 200,
                    success: true,
                    message: "Payments Data",
                    data: data
                });
            } else {
                res.json({
                    status: 404,
                    success: false,
                    message: "No Payments Found"
                });
            }
        })
        .catch((err) => {
            res.json({
                status: 500,
                success: false,
                message: "Internal server error",
                error: err.message
            });
        });
}

// UPDATE PAYMENT
update = (req, res) => {
    let formData = req.body;
    let validation = "";

    if (!formData._id){ validation += "_ID is required ";}

    if (!!validation) {
        res.json({
            status: 422,
            success: false,
            message: validation
        });
    } else {
        PaymentModel.findOne({ _id: formData._id })
            .then((paymentData) => {
                if (!paymentData) {
                    res.json({
                        status: 404,
                        success: false,
                        message: "Payment not found"
                    });
                } else {
                    if (formData.amount) paymentData.amount = formData.amount;
                    if (formData.paymentMethod) paymentData.paymentMethod = formData.paymentMethod;
                    if (formData.transactionId) paymentData.transactionId = formData.transactionId;
                    if (formData.paymentStatus) paymentData.paymentStatus = formData.paymentStatus;

                    paymentData.save()
                        .then((data) => {
                            res.json({
                                status: 200,
                                success: true,
                                message: "Payment Updated",
                                data: data
                            });
                        })
                        .catch((err) => {
                            res.json({
                                status: 500,
                                success: false,
                                message: "Internal server error",
                                error: err.message
                            });
                        });
                }
            })
            .catch((err) => {
                res.json({
                    status: 500,
                    success: false,
                    message: "Internal server error",
                    error: err.message
                });
            });
    }
}

// SINGLE PAYMENT
single = (req, res) => {
    let formData = req.body;
    let validation = "";

    if (!formData._id){ validation += "_ID is required";}

    if (!!validation) {
        res.json({
            status: 422,
            success: false,
            message: validation
        });
    } else {
        PaymentModel.findOne({ _id: formData._id })
            .populate("investmentId")
            .then((paymentData) => {
                if (!paymentData) {
                    res.json({
                        status: 404,
                        success: false,
                        message: "Payment not found"
                    });
                } else {
                    res.json({
                        status: 200,
                        success: true,
                        message: "Payment Data",
                        data: paymentData
                    });
                }
            })
            .catch((err) => {
                res.json({
                    status: 500,
                    success: false,
                    message: "Internal server error",
                    error: err.message
                });
            });
    }
}

// DELETE PAYMENT
Delete = (req, res) => {
    let formData = req.body;
    let validation = "";

    if (!formData._id){ validation += "_ID is required";}

    if (!!validation) {
        res.json({
            status: 422,
            success: false,
            message: validation
        });
    } else {
        PaymentModel.deleteOne({ _id: formData._id })
            .then(() => {
                res.json({
                    status: 200,
                    success: true,
                    message: "Payment Deleted"
                });
            })
            .catch((err) => {
                res.json({
                    status: 500,
                    success: false,
                    message: "Internal server error",
                    error: err.message
                });
            });
    }
}

// CHANGE STATUS
changeStatus= (req, res) => {
    const formData = req.body;
    const allowedStatus = ["Active", "Refunded", "Frozen"];

    if (!formData._id || !allowedStatus.includes(formData.status)) {
        return res.json({
            status: 422,
            success: false,
            message: "Invalid data"
        });
    }

    

    PaymentModel.findOne({_id:req.body._id})
        .then((paymentData) => {
            if (!paymentData) {
                return res.json({
                    status: 404,
                    success: false,
                    message: "Payment Data not found"
                });
            }

            
            paymentData.status = formData.status;

            return paymentData.save();
        })
        .then((paymentData) => {
            if (paymentData) {
                res.json({
                    status: 200,
                    success: true,
                    message: `Payment status updated to ${paymentData.status}`,
                    data: paymentData
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

module.exports = { add, all, update, Delete, single, changeStatus }
