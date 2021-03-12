require("dotenv").config(); // load all the env variables to the process.env by using dotenv package
const db = require("./models");

const express = require("express");
const app = express();
const cors = require("cors"); // as requests from a different port number is considered a violation of CORS policy thus need to use this package to get around this
const bodyParser = require("body-parser");

const errorHandler = require("./handlers/error"); // the GEM is here :) !!

const authRoutes = require("./routes/auth");
const carsRoutes = require("./routes/cars");

const { loginRequired, ensureCorrectUser } = require("./middleware/auth");

//const PORT = 8081;
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());

// routes come here, note on path prefixes!
app.use("/api/auth", authRoutes);
//before adding middleware:
app.use(
  "/api/users/:id/cars",
  loginRequired,
  ensureCorrectUser,
  carsRoutes
);

app.get("/api/cars", loginRequired, async function(req, res, next) {
  try {
    let cars = await db.Car.find()
      .sort({ createdAt: "desc" }) // sort the cars by creation date
      .populate("user", {
        username: true,
        profileImageUrl: true
      }); // also populate corresponding user data for each car
    return res.status(200).json(cars);
  } catch (err) {
    return next(err);
  }
});

// firstly register an error middleware when NO route was hit/found
app.use(function(req, res, next) {
  let err = new Error("The content you are looking for is not found");
  err.status = 404;
  next(err); // called the next middleware (i.e. errorHandler) with an err argument
});
// then register the defined generic error-handler middleware for all the routes!
app.use(errorHandler);

app.listen(PORT, function() {
  console.log(`Server is now running on PORT ${PORT}`);
});
