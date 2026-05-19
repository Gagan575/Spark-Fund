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
const ContactController = require("../apis/Contact/ContactController");






let CategoryStorage= multer.memoryStorage()
const CategoryUpload = multer({ storage: CategoryStorage })

// let AnnounceStorage= multer.memoryStorage()
// const AnnounceUpload = multer({ storage: AnnounceStorage })

router.use(require("../middleware/AdminTokenChecker"))


router.post("/user/softDelete",UserController.softDelete)
router.post("/user/delete",UserController.Delete)



router.post("/investor/delete", InvestorController.Delete);
router.post("/investor/changeStatus", InvestorController.changeStatus);

//ideaPitch

router.post("/idea/changeStatus", IdeaPitchController.changeStatus);


router.post("/category/add",CategoryUpload.single("image"), CategoryController.add);
router.post("/category/update",CategoryUpload.single("image"), CategoryController.update);



router.post("/category/delete",CategoryController.Delete);
router.post("/category/changeStatus", CategoryController.changeStatus);
//


// router.post("/coach/changeStatus",CoachController.changeStatus)
// router.post("/coach/delete",CoachController.Delete)


router.post("/contact/all", ContactController.all);
router.post("/contact/changeStatus", ContactController.changeStatus);

router.post("/investment/delete", InvestmentController.Delete);

module.exports=router