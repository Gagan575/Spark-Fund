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





router.use(require("../middleware/OwnerTokenChecker"))


let IdeaStorage= multer.memoryStorage()
const IdeaUpload = multer({ storage: IdeaStorage })

let IdeaMediaStorage= multer.memoryStorage()
const IdeaMediaUpload = multer({ storage: IdeaMediaStorage })

router.post("/idea/add",IdeaUpload.single("pitchVideoUrl"), IdeaPitchController.add);
router.post("/idea/update",IdeaUpload.single("pitchVideoUrl"), IdeaPitchController.update);
router.post("/idea/delete", IdeaPitchController.Delete);




//media
router.post("/ideaMedia/add", IdeaMediaUpload.array("file",3), IdeaMediaController.add);
router.post("/ideaMedia/update", IdeaMediaUpload.array("file",3), IdeaMediaController.update);
router.post("/ideaMedia/delete", IdeaMediaController.Delete);
// router.post("/ideaMedia/changeStatus", IdeaMediaController.changeStatus);


router.post("/ideaLikes/delete", IdeaLikesController.Delete);
router.post("/ideaLikes/changeStatus", IdeaLikesController.changeStatus);


router.post("/ideaComment/delete", IdeaCommentController.Delete);
router.post("/ideaComment/changeStatus", IdeaCommentController.changeStatus);



module.exports=router