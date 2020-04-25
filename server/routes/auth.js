const express = require("express");

const { body } = require("express-validator/check");

const router = express.Router();

const User = require("../models/user");

const authController = require("../controllers/auth");

router.put(
  "/doSignup",
  [
    body("firstName")
      .trim()
      .not()
      .isEmpty(),
    body("lastName")
      .trim()
      .not()
      .isEmpty(),
    body("userName")
        .trim()
        .not()
        .isEmpty(),
    body("mobileNumber")
      .trim()
      .not()
      .isEmpty(),
    body("email")
      .trim()
      .isEmail()
      .withMessage("Please enter a valid email.")
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then(userDoc => {
          if (userDoc) {
            return Promise.reject("Email address already exists");
          }
        });
      })
      .normalizeEmail(),
    body("password")
      .trim()
      .isLength({ min: 5 })
  ],
  // action to take
  authController.signup
);

router.post("/doLogin", authController.login);

module.exports = router;