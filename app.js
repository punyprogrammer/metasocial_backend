const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
const searchRoute = require("./routes/search");
const conversationsRouter = require("./routes/conversations");
const messagesRoute = require("./routes/messages");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const PORT = process.env.PORT || 5000;
//to allow using env files
dotenv.config();
//initialise app
const app = express();
app.use(cors());
//connect to the databse
mongoose.connect(
  process.env.MONGO_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log(`Connected to database`);
  }
);

app.use("/images", express.static(path.join(__dirname, "public/images")));
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.any(), (req, res) => {
  try {
    return res.status(200).json("File uploded successfully");
  } catch (error) {
    console.error(error);
  }
});
//mount the routes
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);
app.use("/api/search", searchRoute);
app.use("/api/messages", messagesRoute);
app.use("/api/conversations", conversationsRouter);
app.listen(PORT, () => {
  console.log("The server is running on port ", PORT);
});
