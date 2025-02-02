const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, //
  message: "Too many requests, please try again later.",
  headers: true,
});

const authLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 5, // Limit each IP to 5 login attempts per 5 minutes
  message: "Too many attempts. Try again later.",
});

const createPostLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 5, // Limit each IP to 5 login attempts per 5 minutes
  message: "Too many post creation attempts. Try again later.",
});

module.exports = { limiter, authLimiter, createPostLimiter };
