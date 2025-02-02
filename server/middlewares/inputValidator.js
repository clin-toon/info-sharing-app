const { body, validationResult } = require("express-validator");

// Middleware function to validate user input for signing up
const validateSignUpUser = [
  body("username")
    .isLength({ min: 4 })
    .trim()
    .notEmpty()
    .withMessage("Username is required"),
  body("fullName").notEmpty().withMessage("Full name is required"),
  body("email").isEmail().withMessage("Invalid email").normalizeEmail(),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters")
    .trim(),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      let newarr = errors.array().map((error) => error.msg);
      return res.status(400).json({ errors: newarr });
    }
    next(); // Continue if no errors
  },
];

// Middleware function to validate user input for signing up
const validateLoginUser = [
  body("email").isEmail().withMessage("Invalid email").normalizeEmail(),
  body("password")
    .isLength({ min: 4 })
    .withMessage("Password must be at least 4 characters")
    .trim()
    .escape(),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      let newarr = errors.array().map((error) => error.msg);
      return res.status(400).json({ errors: newarr });
    }
    next();
  },
];
// Middleware function to validate user input for posting comments
const validateComment = [
  body("comment").escape(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      let newarr = errors.array().map((error) => error.msg);
      return res.status(400).json({ errors: newarr });
    }
    next();
  },
];

const validatePosts = [
  body("postTitle").escape(),
  body("postDescription").escape(),
  body("postCategory").escape(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      let newarr = errors.array().map((error) => error.msg);
      return res.status(400).json({ errors: newarr });
    }
    next();
  },
];

module.exports = {
  validateSignUpUser,
  validateLoginUser,
  validateComment,
  validatePosts,
};
