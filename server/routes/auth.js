const express = require("express");
const router = express.Router();

const {signup, signin} = require("../handlers/auth");// use destructing syntax to declare vars again

router.post('/signup', signup);
router.post('/signin', signin);

module.exports = router;
