const express = require("express");
const authController = require("../controllers/AuthController");
const { SignUpController, LoginController } = authController;
const { authLimiter } = require("../middlewares/rateLimit");
const {
  validateSignUpUser,
  validateLoginUser,
} = require("../middlewares/inputValidator");
const router = express.Router();

// sign up route
router.post("/register", validateSignUpUser, authLimiter, SignUpController);

// log in route
router.post("/login", validateLoginUser, authLimiter, LoginController);

module.exports = router;
