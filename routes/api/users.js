const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");

//@route GET api/users/test
//@desc tests users route
//@access public
router.get("/test", (req, res) => res.json({ msg: "users works" }));

//@route POST api/users/register
//@desc Handles registration of user
//@access public
router.post("/register", (req, res) => {
  //Check if the email already exists in mongo database.
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "Email Already Exists" });
    } else {
      const avatar = gravatar.url(req.body.url, {
        s: "200", //SIze
        r: "pg", //Rating
        d: "mm" //default
      });

      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar,
        password: req.body.password
      });

      //being used to encrypt the password.
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          //UnhandledPromiseRejectionWarning: Unhandled promise rejection. This error originated either by throwing inside of an async function without a catch block, or by rejecting a promise which was not handled with .catch(). (rejection id: 1)
          //   if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

module.exports = router;
