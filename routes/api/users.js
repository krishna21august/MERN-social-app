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

//@route POST api/users/login
//@desc Handles login of user
//@access public
router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  //Find user by email
  //Note: findOne({email : email}) is similar to findOne({email})
  User.findOne({ email }).then(user => {
    if (!user) {
      return res.status(404).json({ email: "User Not found" });
    }

    //Check Password using bcrypt as we are getting plain password
    bcrypt
      .compare(password, user.password)
      //compare return true/false.
      .then(isMatch => {
        if (isMatch) {
          res.json({ msg: "success" });
        } else {
          res.status(404).json({ password: "password incorrect" });
        }
      });
  });
});

module.exports = router;
