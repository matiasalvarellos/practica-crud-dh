const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const validation = require("../validations/usersValidation");

//register
router.get("/register", userController.register);
router.post("/register",  validation.registerValidation, userController.processRegister);
//login
router.get("/login", userController.login);
router.post("/login", validation.loginValidation, userController.processLogin);
router.post("/logout", userController.logout);

module.exports = router;