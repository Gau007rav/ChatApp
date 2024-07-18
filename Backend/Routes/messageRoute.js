let express = require("express")
let {protect} = require("../middlewares/authMiddleware.js")
let router = express.Router();
let {sendMessage,allMessages}=require("../controllers/messageControllers.js")
router.route("/:chatId").get(protect, allMessages);
router.route("/").post(protect, sendMessage);

module.exports = router;