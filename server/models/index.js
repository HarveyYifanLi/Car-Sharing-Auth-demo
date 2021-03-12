const mongoose = require("mongoose");
mongoose.set("debug", true);
mongoose.Promise = Promise;
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/modo-cars-db"
);

module.exports.User = require("./user");
module.exports.Car = require("./car");
