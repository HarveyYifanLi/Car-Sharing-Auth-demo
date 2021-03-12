const mongoose = require("mongoose");
const User = require("./user");

const carSchema = new mongoose.Schema(
  {
    make: {
      type: String,
      required: true
    },
    model: {
      type: String,
      required: true
    },
    year:{
      type: Number,
      required: true
    },
    colour: {
      type: String,
      required: true
    },
    location_id: {
      type: Number,
      required: true
    },
    location_description: {
      type: String,
      required: false,
      maxLength: 500
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User" // with reference to the User model!
    },
    createdAt: {
      type: Date,
      required: true,
      default: Date.now
    }
  },
  { timestamp: true }
); // second arg will enable timestamps on created and updated car

carSchema.pre("remove", async function(next) {
  try {
    //find a user
    let user = await User.findById(this.user);
    //remove the id of the car from user's cars list
    user.cars.remove(this.id);
    //save the user
    await user.save();
    // return next action
    return next();
  } catch (err) {
    return next(err);
  }
});

const Car = mongoose.model("Car", carSchema);

module.exports = Car;
