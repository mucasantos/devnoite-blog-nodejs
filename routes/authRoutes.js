const express = require("express");
const router = express.Router();

const auth = require("../controllers/authController");
const { validateEmail, validateName, validatePassword } = require("../services/validators");

router.post('/signup',[validateEmail, validateName, validatePassword], auth.signUpUser);
router.post('/signin',[validateEmail, validatePassword], auth.signInUser);




module.exports = router;
