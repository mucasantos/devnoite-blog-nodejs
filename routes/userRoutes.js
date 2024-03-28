const express = require("express");
const router = express.Router();
const isAuth = require("../middlewares/is-auth");

const user = require("../controllers/userController");
const { validateEmail, validateName, validatePassword, validateEmailExists } = require("../services/validators");

router.delete('/delete', [validateEmail, validateName, validatePassword, validateEmailExists], isAuth, user.delete);
router.put('/update', [validateEmail, validatePassword], isAuth, user.update);
router.put('/change-passwd', [validateEmail, validatePassword], isAuth, user.changePassword);
router.get('/profile', [validateEmail, validatePassword], isAuth, user.profile)

module.exports = router;