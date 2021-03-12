const db = require("../models");

exports.createCar = async function(req, res, next) {
  try {
    let car = await db.Car.create({
      make: req.body.make,
      model: req.body.model,
      year: req.body.year,
      colour: req.body.colour,
      location_id: req.body.location_id,
      location_description: req.body.location_description,
      user: req.params.id //route would be /api/users/:id/cars
    });
    let foundUser = await db.User.findById(req.params.id); //retrive the corresponding user in db
    foundUser.cars.push(car.id); 
    await foundUser.save(); //save the updated user data in the db
    let foundCar = await db.Car.findById(car._id).populate("user", {
      username: true,
      profileImageUrl: true
    }); // Need to also populate the user's other data so we can send it back together with the car when posting it on client side
    return res.status(200).json(foundCar);
  } catch (err) {
    return next(err);
  }
};
// GET - /api/users/:id/cars/:car_id
exports.getCar = async function(req, res, next) {
  try {
    let car = await db.Car.findById(req.params.car_id);
    return res.status(200).json(car);
  } catch (err) {
    return next(err);
  }
};
// DELETE - /api/users/:id/cars/:car_id
exports.deleteCar = async function(req, res, next) {
  try {
    let foundCar = await db.Car.findById(req.params.car_id);
    await db.Car.remove({ _id: req.params.car_id });
    return res.status(200).json(foundCar);
  } catch (err) {
    return next(err);
  }
};

// PUT - /api/users/:id/cars/:car_id
exports.updateCar = async function(req, res, next) {
  try {
    let updatedCar = await db.Car.findOneAndUpdate(
      { _id: req.params.car_id },
      req.body,
      { new: true }
    );
    return res.status(200).json(updatedCar);
  } catch (err) {
    return next(err);
  }
};
