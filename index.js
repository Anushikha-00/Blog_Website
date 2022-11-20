const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const fileUpload = require("express-fileupload");
const port =process.env.PORT || 4000;

const path = require("path");
const cors = require("cors");
const app = express();

// Routes
const authRouter = require("./api/routes/auth");
const userRouter = require("./api/routes/user");
const postRouter = require("./api/routes/post");
const categoryRouter = require("./api/routes/category");

//dotenv.config({ path: __dirname + "/.env" });
require('dotenv').config({path: './config/config.env'});
const connectDB = require('./config/db');
connectDB();
// mongoose
//   .connect(process.env.MONGO_URL)
//   .then(console.log(`Connected to DB`))
//   .catch((err) => console.log(`Error connecting to DB`));

// Middleware
app.use(express.json());
app.use(fileUpload());
app.use(cors());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/post", postRouter);
app.use("/api/v1/category", categoryRouter);

app.use("/images", express.static(path.join(__dirname, "/uploads/")));

app.post("/api/v1/upload", (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("No files were uploaded.");
  }
  console.log(req.files);

  let filename = req.files.uploadFile.name;
  console.log("filename", filename);
  let file = req.files.uploadFile;
  console.log("file", file);
  let uploadPath = __dirname + "/uploads/" + filename;
  console.log("Upload Path " + uploadPath);
  file.mv(uploadPath, (err) => {
    if (err) {
      console.log(err);
      res.status(500).json({
        message : err.message});
    }
  });
  res.status(200).json({
    result : file,
    msg: "File Uploaded",
  });
});

app.use(function (req, res) {
  res.send("<h1>Backend API</h1>");
});

// app.get("/", function (req, res) {
//   res.send("Hello World");
// });

app.listen(port, function () {
  console.log(`Server is running on port -- ${port}`);
});
