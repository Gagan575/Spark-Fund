const { uploadImg } = require("../../utilities/helper");
const CategoryModel = require("./CategoryModel");

// ADD CATEGORY
add = (req, res) => {
    let formData = req.body;
    let validation = "";

    if (!formData.categoryName) validation += "Category Name is required ";

    if (!!validation) {
        res.json({
            status: 422,
            success: false,
            message: validation
        });
    } else {
        // 🔍 Check for duplicacy
        CategoryModel.findOne({ categoryName: formData.categoryName })
            .then(async(existingCategory) => {
                if (existingCategory) {
                    res.json({
                        status: 409,
                        success: false,
                        message: "Category already exists"
                    });
                } else {
                    let categoryObj = new CategoryModel();
                    categoryObj.categoryName = formData.categoryName;
                    categoryObj.description = formData.description || "";

                    let url = await uploadImg(req.file.buffer);
                    categoryObj.image = url;

                    // categoryObj.status = formData.status !== undefined ? formData.status : true;

                    categoryObj.save()
                        .then((data) => {
                            res.json({
                                status: 200,
                                success: true,
                                message: "Category Added",
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


// GET ALL CATEGORIES
all = (req, res) => {
    CategoryModel.find(req.body)
        .then((data) => {
            if (data.length > 0) {
                res.json({
                    status: 200,
                    success: true,
                    message: "Categories Data",
                    data: data
                });
            } else {
                res.json({
                    status: 404,
                    success: false,
                    message: "No Categories Found"
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

// UPDATE CATEGORY
update = (req, res) => {
    let formData = req.body;
    let validation = "";

    if (!formData._id) { validation += "_ID is required " }
    if (!!validation) {
        res.json({
            status: 422,
            success: false,
            message: validation
        });
    } else {
        CategoryModel.findOne({ _id: formData._id })
            .then(async(categoryData) => {
                if (!categoryData) {
                    res.json({
                        status: 404,
                        success: false,
                        message: "Category not found"
                    });
                } else {
                    if (req.file) {
                    const imageUrl = await uploadImg(req.file.buffer);
                    categoryData.image = imageUrl;
                }
                    if (formData.categoryName) categoryData.categoryName = formData.categoryName;
                    if (formData.description) categoryData.description = formData.description;

                    categoryData.save()
                        .then((data) => {
                            res.json({
                                status: 200,
                                success: true,
                                message: "Category Updated",
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

// SINGLE CATEGORY
single = (req, res) => {
    let formData = req.body;
    let validation = "";

    if (!formData._id) validation += "_ID is required";

    if (!!validation) {
        res.json({
            status: 422,
            success: false,
            message: validation
        });
    } else {
        CategoryModel.findOne({ _id: formData._id })
            .then((categoryData) => {
                if (!categoryData) {
                    res.json({
                        status: 404,
                        success: false,
                        message: "Category not found"
                    });
                } else {
                    res.json({
                        status: 200,
                        success: true,
                        message: "Category Data",
                        data: categoryData
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

// DELETE CATEGORY
Delete = (req, res) => {
    let formData = req.body;
    let validation = "";

    if (!formData._id) validation += "_ID is required";

    if (!!validation) {
        res.json({
            status: 422,
            success: false,
            message: validation
        });
    } else {
        CategoryModel.deleteOne({ _id: formData._id })
            .then(() => {
                res.json({
                    status: 200,
                    success: true,
                    message: "Category Deleted"
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
changeStatus = (req, res) => {
    let formData = req.body;
    let validation = "";

    if (!formData._id) validation += "_ID is required";

    if (!!validation) {
        res.json({
            status: 422,
            success: false,
            message: validation
        });
    } else {
        CategoryModel.findOne({ _id: formData._id })
            .then((categoryData) => {
                if (!categoryData) {
                    res.json({
                        status: 404,
                        success: false,
                        message: "Category not found"
                    });
                } else {
                    categoryData.status = !categoryData.status;

                    categoryData.save()
                        .then((data) => {
                            res.json({
                                status: 200,
                                success: true,
                                message: "Category status updated",
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

module.exports = { add, all, update, Delete, single, changeStatus }
