const mongoose = require("mongoose");
const express = require("express");
const req = require("express/lib/request");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoSanitize = require("express-mongo-sanitize");
const multer = require("multer");
const dotenv = require('dotenv');
dotenv.config();
console.log(process.env.NODE_ENV)




//Custom Errors
const { AppError } = require("./utilities/appError");

//routes
const lostPetRoutes = require("./routes/lostPetRoutes");
const authRoutes = require("./routes/authRoutes");

const dbUrl = process.env.NODE_ENV === 'production' ? process.env.DB_URL_PROD : process.env.DB_URL_DEV;

// Connect to MongoDB
mongoose
  .connect(dbUrl, { connectTimeoutMS: 5000 })
  .catch((e) => console.log(e));

// Check if the connection was succesful   
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error"));
db.once("open", () => {
  console.log("MongoDB Connected");
});

// Express application-level middleware
app.use(cors());
app.use(bodyParser.json());
app.use(mongoSanitize());

//Express Router Routes
app.use("/lostpets", lostPetRoutes);
app.use("/", authRoutes);

app.all("*", (req, res, next) => {
  next(new AppError("Not Found!", 404));
});

app.use((err, req, res, next) => {
  console.log(err);

  if (err instanceof multer.MulterError) {
    let status = 400;

    if (err.code === "LIMIT_UNEXPECTED_FILE") {
      return res
        .status(status)
        .json({
          error: { message: "You cannot have more than 3 image uploads!" },
        });
    }
  }

  let { status } = err;

  res.status(status).json({ error: err });
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
