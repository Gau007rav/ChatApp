let express = require("express")
let {registerUser,authUser,allUsers}=require("../controllers/userControllers.js")
let {protect} = require("../middlewares/authMiddleware.js")
let router = express.Router();

router.route("/").post(registerUser)
router.route("/login").post(authUser)
router.route("/").get(protect, allUsers);

module.exports=router