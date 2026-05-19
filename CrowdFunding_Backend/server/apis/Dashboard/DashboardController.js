const express=require("express")
const mongoose=require("mongoose")

const router=express.Router()
const UserModel=require("../User/UserModel")
const IdeaPitchModel=require("../IdeaPitch/IdeaPitchModel")
const CategoryModel=require("../Category/CategoryModel")
const IdeaLikesModel=require("../IdeaLikes/IdeaLikesModel")
const IdeaCommentModel=require("../IdeaComment/IdeaCommentModel")
const InvestmentModel=require("../Investment/InvestmentModel")
const InvestorModel=require("../Investor/InvestorModel")




const Dashboard = async (req, res) => {
    var totalCategory = 0
    var totalOwner = 0
    var totalInvestor = 0
    var totalIdea = 0
    var totalInvestment = 0

    var totalIdeaLikes = 0
    var totalIdeaComment = 0

    var totalBooking = 0
    var totalOwnerInvestment = 0
    var totalOwnerIdea = 0
    var totalOwnerIdeaLikes = 0
    var totalOwnerIdeaComment = 0

    await UserModel.countDocuments({role:"owner"})
        .then((tOwner) => {
            totalOwner = tOwner
        })

    await InvestorModel.countDocuments()
        .then((tInvestor) => {
            totalInvestor = tInvestor
        })

    await CategoryModel.countDocuments()
        .then((tCategory) => {
            totalCategory = tCategory
        })

    await InvestmentModel.countDocuments()
        .then((tInvestment) => {
            totalInvestment = tInvestment
        })

    await IdeaPitchModel.countDocuments()
        .then((tIdea) => {
            totalIdea = tIdea
        })

    await IdeaLikesModel.countDocuments()
        .then((tIdeaLikes) => {
            totalIdeaLikes = tIdeaLikes
        })

    await IdeaCommentModel.countDocuments()
        .then((tIdeaComment) => {
            totalIdeaComment = tIdeaComment
        })

    
    // ✅ Owner total investments (direct)
    await InvestmentModel.countDocuments({ ownerId: req.body.ownerId })
        .then((tOwnerInvestment) => {
            totalOwnerInvestment = tOwnerInvestment
        })

    // 🔥 IMPORTANT FIX STARTS HERE

    // 1️⃣ get owner idea ids
    const ownerIdeaIds = await IdeaPitchModel.distinct("_id", {
        ownerId: req.body.ownerId
    })

    // 2️⃣ total ideas of owner
    totalOwnerIdea = ownerIdeaIds.length

    // 3️⃣ investments on owner's ideas
    await InvestmentModel.countDocuments({
        ideaId: { $in: ownerIdeaIds }
    }).then((count) => {
        totalOwnerInvestment = count
    })

    // 4️⃣ likes on owner's ideas
    await IdeaLikesModel.countDocuments({
        ideaId: { $in: ownerIdeaIds }
    }).then((tOwnerIdeaLikes) => {
        totalOwnerIdeaLikes = tOwnerIdeaLikes
    })

    // 5️⃣ comments on owner's ideas
    await IdeaCommentModel.countDocuments({
        ideaId: { $in: ownerIdeaIds }
    }).then((tOwnerIdeaComment) => {
        totalOwnerIdeaComment = tOwnerIdeaComment
    })

    res.send({
        status: 200,
        success: true,
        message: "dashboard loaded!!",
        totalInvestor: totalInvestor,
        totalOwner: totalOwner,
        totalInvestment: totalInvestment,
        totalCategory: totalCategory,
        totalIdea: totalIdea,
        totalBooking: totalBooking,
        totalIdeaLikes: totalIdeaLikes,
        totalIdeaComment: totalIdeaComment,
        totalOwnerInvestment: totalOwnerInvestment,
        totalOwnerIdea: totalOwnerIdea,
        totalOwnerIdeaLikes: totalOwnerIdeaLikes,
        totalOwnerIdeaComment: totalOwnerIdeaComment
    })
}



module.exports= {Dashboard}