require("dotenv").config();
require("./passport/passport");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const url = process.env.DB_URI;
const PORT = process.env.PORT || 8000;
const AuthRoute = require("./routes/Auth");
const PostRoute = require("./routes/Posts");
const ProflieRoute = require("./routes/Profile");
const CommentRoute = require("./routes/Comments");
const errorHandler = require("./middlewares/erroHandler");
const { multerErrorHandler } = require("./middlewares/multer");
const helmet = require("helmet");
const xss = require("xss-clean");
const mongoSanitize = require("express-mongo-sanitize");

// middlewares
app.use(mongoSanitize()); // Apply globally
app.use(cors());
app.use(xss());
app.use(helmet());
app.use(express.json());
app.use("/api/auth", AuthRoute);
app.use("/api/posts", PostRoute);
app.use("/api/profile", ProflieRoute);
app.use("/api/comments", CommentRoute);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(errorHandler);
app.use(multerErrorHandler);

// database connection
mongoose
  .connect(url)
  .then((e) => console.log("Connected to db"))
  .catch((e) => console.log(e));

app.listen(PORT, () => {
  console.log(`Server started at ${PORT}`);
});
