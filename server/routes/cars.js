const express = require('express');

const router = express.Router({mergeParams: true});

const {
    createCar,
    getCar,
    deleteCar,
    updateCar
} = require('../handlers/cars');

//route has been prefixed with /api/users/:id/cars
router.route('/').post(createCar);

router.route('/:car_id')
                            .get(getCar)
                            .delete(deleteCar)
                            .put(updateCar);

module.exports = router;