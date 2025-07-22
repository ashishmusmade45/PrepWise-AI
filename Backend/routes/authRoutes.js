const express = require("express");
const {registerUser,loginUser,getUserProfile} = require("../controllers/authController");
const {protect}  = require("../middlewares/authMiddlewares");

const router = express.Router();

//Auth Routes
router.post("/register",registerUser);
router.post("/login",loginUser);
router.get("/profile",protect,getUserProfile);

module.exports = router;