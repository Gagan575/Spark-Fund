const express=require("express")
const router=express.Router()
const multer=require("multer")
const UserController=require("../apis/User/UserController")
const InvestorController=require("../apis/Investor/InvestorController")

const IdeaPitchController = require("../apis/IdeaPitch/IdeaPitchController");
const IdeaMediaController = require("../apis/IdeaMedia/IdeaMediaController");
const IdeaLikesController = require("../apis/IdeaLikes/IdeaLikesController");
const IdeaCommentController = require("../apis/IdeaComment/IdeaCommentController");
const InvestmentController = require("../apis/Investment/InvestmentController");
const PaymentController = require("../apis/Payment/PaymentController");
const CategoryController = require("../apis/Category/CategoryController");






let UserStorage= multer.memoryStorage()
const UserUpload = multer({ storage: UserStorage })

let InvestorStorage= multer.memoryStorage()
const InvestorUpload = multer({ storage: InvestorStorage })

router.post("/user/login",UserController.login)
router.post("/user/register",UserUpload.single("profileImage"),UserController.register)

router.post("/user/update",UserUpload.single("profileImage"),UserController.update)




router.use(require("../middleware/InvestorTokenChecker"))

router.post("/update", InvestorUpload.single("profileImage"), InvestorController.update);



// router.post("/booking/add",BookingController.add)
// router.post("/booking/update",BookingController.update)


router.post("/ideaLikes/add", IdeaLikesController.add);
// router.post("/ideaLikes/update", IdeaLikesController.update);



router.post("/ideaComment/add", IdeaCommentController.add);
router.post("/ideaComment/update", IdeaCommentController.update);


router.post("/payment/add", PaymentController.add);
router.post("/payment/update", PaymentController.update);


router.post("/investment/add", InvestmentController.add);
router.post("/investment/update", InvestmentController.update);

router.post("/investment/changeStatus", InvestmentController.changeStatus);




module.exports=router