const Category = require("../Category/CategoryModel")
const Idea = require("../IdeaPitch/IdeaPitchModel")
const Investor = require("..//Investor/InvestorModel")
const Investment = require("../Investment/InvestmentModel")
const Owner = require("../User/UserModel")

const getDashboardStats = async (req, res) => {
  try {
    // =====================
    // SIMPLE COUNTS (CARDS)
    // =====================
    const totalCategory = await Category.countDocuments()
    const totalIdea = await Idea.countDocuments()
    const totalInvestor = await Investor.countDocuments()
    const totalOwner = await Owner.countDocuments()
    const totalInvestment = await Investment.countDocuments()

    // =====================
    // IDEA STATUS (PIE)
    // =====================
    const approvedIdeas = await Idea.countDocuments({ status: "Approved" })
    const fundedIdeas = await Idea.countDocuments({ status: "Funded" })
    const pendingIdeas = await Idea.countDocuments({ status: "Pending" })
    const rejectedIdeas = await Idea.countDocuments({ status: "Rejected" })

    // =====================
    // IDEAS BY CATEGORY (BAR)
    // =====================
   const ideasByCategory = await Category.aggregate([
  {
    $lookup: {
      from: "ideapitchmodels",
      localField: "_id",          // Category _id (ObjectId)
      foreignField: "categoryId", // Idea.categoryId (ObjectId)
      as: "ideas"
    }
  },
  {
    $project: {
      _id: 0,
      name: "$categoryName",
      count: { $size: "$ideas" }
    }
  }
])

    // =====================
    // MONTHLY FUNDING (LINE)
    // =====================
    const monthlyFunding = await Investment.aggregate([
      {
        $group: {
          _id: { $month: "$createdAt" },
          total: { $sum: "$amount" }
        }
      },
      { $sort: { _id: 1 } }
    ])

    return res.status(200).json({
      success: true,

      // cards
      totalCategory,
      totalIdea,
      totalInvestor,
      totalOwner,
      totalInvestment,

      // charts
      approvedIdeas,
      fundedIdeas,
      pendingIdeas,
      rejectedIdeas,

      ideasByCategory,
      monthlyFunding
    })
  } catch (error) {
    console.error("Dashboard Error:", error)
    return res.status(500).json({
      success: false,
      message: "Dashboard data fetch failed"
    })
  }
}

module.exports = {
  getDashboardStats
}