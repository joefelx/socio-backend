require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const path = require("path");
const multer = require("multer");
const postRouter = require("./routers/post");
const userRouter = require("./routers/user");
const authRouter = require("./routers/auth");

// Middlewares
const app = express();
app.use(express.json());
app.use(morgan("tiny"));

// Database Connections
mongoose.connect(
  process.env.MONGOURI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Connected to MongoDB");
  }
);

app.use("/images", express.static(path.join(__dirname, "public/images")));

// upload files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    console.log(req.body.name);
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });
app.post("/api/upload/", upload.single("file"), (req, res) => {
  try {
    return res.status(200).json("file uploaded successfully");
  } catch (err) {
    console.log(err);
  }
});

// Routers
app.use("/api/auth", authRouter);
app.use("/api/post", postRouter);
app.use("/api/user", userRouter);

app.listen(process.env.PORT || 5000, () => {
  console.log("Server is started in port 5000");
});
