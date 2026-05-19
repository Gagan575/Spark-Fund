const express=require("express")
const router=express.Router()
const multer=require("multer")
const DashboardController=require("../apis/Dashboard/DashboardController")
const UserController=require("../apis/User/UserController")
const InvestorController=require("../apis/Investor/InvestorController")
const IdeaPitchController = require("../apis/IdeaPitch/IdeaPitchController");
const IdeaMediaController = require("../apis/IdeaMedia/IdeaMediaController");
const IdeaLikesController = require("../apis/IdeaLikes/IdeaLikesController");
const IdeaCommentController = require("../apis/IdeaComment/IdeaCommentController");
const InvestmentController = require("../apis/Investment/InvestmentController");
const PaymentController = require("../apis/Payment/PaymentController");
const CategoryController = require("../apis/Category/CategoryController");
const AdminDashboard=require("../apis/Dashboard/AdminDashboard")
const ContactController = require("../apis/Contact/ContactController");










router.post("/user/login",UserController.login)

let UserStorage= multer.memoryStorage()
const UserUpload = multer({ storage: UserStorage })

router.post("/user/register",UserUpload.single("profileImage"),UserController.register)
router.post("/user/update",UserUpload.single("profileImage"),UserController.update)



router.post("/user/all",UserController.all)
router.post("/user/single",UserController.single)

router.post("/dashboard",DashboardController.Dashboard)


let InvestorStorage= multer.memoryStorage()
const InvestorUpload = multer({ storage: InvestorStorage })
router.post("/investor/register",InvestorUpload.fields([
    { name: "profileImage", maxCount: 1 },
    { name: "verificationImage", maxCount: 1 }
  ]),InvestorController.register)

router.post("/investor/all", InvestorController.all);
router.post("/investor/single", InvestorController.single);


router.post("/contact/add", ContactController.add);

//ideaPitch

router.post("/idea/all",IdeaPitchController.all);
router.post("/idea/single", IdeaPitchController.single);

//Idealikes
router.post("/ideaLikes/all", IdeaLikesController.all);
router.post("/ideaLikes/single", IdeaLikesController.single);


router.post("/ideaComment/all", IdeaCommentController.all);
router.post("/ideaComment/single", IdeaCommentController.single);


//ideaMedia
router.post("/ideaMedia/all", IdeaMediaController.all);
router.post("/ideaMedia/single", IdeaMediaController.single);


router.post("/payment/all", PaymentController.all);
router.post("/payment/single", PaymentController.single);

router.post("/investment/all", InvestmentController.all);
router.post("/investment/single", InvestmentController.single);

router.post("/category/all", CategoryController.all);
router.post("/category/single", CategoryController.single);


router.post("/admindashboard", AdminDashboard.getDashboardStats)




module.exports=router
