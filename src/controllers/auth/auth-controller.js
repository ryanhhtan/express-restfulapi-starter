import User from '../../models/user';
import bcrypt from 'bcrypt';

import { check, validationResult } from 'express-validator/check';
import { matchedData, sanitize } from 'express-validator/filter';

import {Strategy, ExtractJwt } from 'passport-jwt';
import jwt from 'jsonwebtoken';

import passport from 'passport';

/* Param to generate password hash */
const saltRounds = 10;

/* Rules to validate and sanitize the user input. */
exports.checkUserRules = [
  // Velify email
  check('email').isEmail().withMessage('must be an email')
  .trim().normalizeEmail(),

  // Verify password
  check('password', 'password must be at least 6 characters and contains one number')
  .isLength({min: 6})
  .matches(/\d/),

  // Sanitize firsname and lastname 
  check('first_name').trim(),
  check('last_name').trim(),
];

/* Setup passport */
let jwtOptions = {}; 
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = "secret";
jwtOptions.jsonWebTokenOptions = {maxAge: "2h"}; // expires in 2h in server side.

// Use JWT strategy.
passport.use('jwt', new Strategy(jwtOptions, (jwt_payload, done) =>{
  User.findOne({id: jwt_payload.sub}, (err, user, info) => {
    if (err) {
      console.log(err);
      return done(err, false); 
    }
    if (user) {
      return done(null, user);
    }
    return done(null, false);
  });
}));

// export authGuard so that it can easily be applied by routes when needed.
exports.authGuard = passport.authenticate('jwt', {session: false}); 

/* Handle user register */
exports.register = (req, res, next) => {
  // Check fileds validation result
  const errors =  validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.mapped() });
  }

  const userParams = matchedData(req);

  // Create a new user with required field.
  let newUser = new User({
    email: userParams.email,
  });

  // Set the optional fields
  newUser.name.first = userParams.first_name || "";
  newUser.name.last = userParams.last_name || "";

  // Hash the password, save the new user and send response.
  bcrypt.hash(userParams.password, saltRounds).then(hash => {
    newUser.password = hash;
    return newUser.save();
  }).then(() =>{
    return res.json(newUser);
  }).catch(err => {
    return res.status(500).json({error: "Failed to register user."});
  });
};

/* Handle user login */
exports.login = (req, res, next) => {
  let userFound = {};
  User.findOne({email: req.body.email, activated: true}).select('password').exec().then(user => {
    userFound = user;
    return bcrypt.compare(req.body.password, user.password);
  }).then(pass => {
    if (pass) {
      let payload = {id: userFound._id};
      let token = jwt.sign(payload, jwtOptions.secretOrKey);
      return res.json({
        success: "true", 
        token: token, expiresIn: Date.now() + 60 * 60 * 2
      });
    }
    return res.json({
      success: "false", 
      error: "Invalid user name or password"
    });
  }).catch(err => {
    console.log(err);
    return res.status(401).json("Invalid username or password");
  });
};

/* logout */
// NOTE: req.logout() is available for session-based authentication, but not suitable for JWT-based one. 
// Set JWT option "maxAge" properly to mitigate the security risks.
