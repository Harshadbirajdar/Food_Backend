const express = require("express");
require("dotenv").config();
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { errorHandler, notFound } = require("./middleware/errorMiddleware");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
  secure: process.env.NODE_ENV === "production" ? true : false,
});

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("tiny"));

const user = require("./route/user");
const menu = require("./route/menu");
const category = require("./route/category");
const table = require("./route/table");

app.use("/api/v1", user);
app.use("/api/v1", menu);
app.use("/api/v1", category);
app.use("/api/v1", table);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
