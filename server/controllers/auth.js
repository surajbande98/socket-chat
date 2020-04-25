// auth controller

const { validationResult } = require("express-validator/check");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const User = require("../models/user");

const utilityService = require("../utility/utility.service");

//signup action
exports.signup = (req, res, next) => {
  const errors = validationResult(req);

  // if validation fails
  if (!errors.isEmpty()) {
    utilityService.throwError(errors);
  }

  const password = req.body.password;

  //Hash the password before storing in database using standard method
  bcrypt
    .hash(password, 12)
    .then(hashPwd => {
      const user = new User({...req.body, password: hashPwd});
      return user.save();
    })
    .then(result => {
      res.status(201).json({ message: "User created!!", userId: result._id });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

//login action
exports.login = (req, res, next) => {
    const errors = validationResult(req);
    
    // if validation fails
    if(!errors.isEmpty()) {
      utilityService.throwError(errors);
    }

    const email = req.body.email;
    const password = req.body.password;

    let loadedUser;

    User.findOne({email: email})
    .then(user => {
      if(!user) {
        const error = new Error("Email does not exists. Please try again.");
        error.statusCode = 401; //unauthorized
        throw error;
      }

      loadedUser = user;
      
      return bcrypt.compare(password, user.password);
    })
    .then(isEqual => {
      if(!isEqual) {
        const error = new Error("Wrong password entered!!");
        error.statusCode = 401;
        throw error;
      }

      // genereate token
      // token = some user specific JSON data + private key + expiry time
      const token = jwt.sign(
        {
          email: loadedUser.email,
          userId: loadedUser._id.toString()
        },
        "somesupersecretkey",
        { expiresIn: "1h" } 
      );

      res.status(200).json({token: token, userId: loadedUser._id.toString()});
    })
    .catch(err => {
      if(!err) {
        err.statusCode = 500;
      }
      //catch in error handler middleware
      next(err);
    })
};
