const express = require("express");
const router = express.Router();
const mongooose = require("mongoose");
const passport = require("passport");

//require model
const Profile = require("../../models/Profile");
const User = require("../../models/User");

//@route GET api/profile/test
//@desc tests profile route
//@access public
router.get("/test", (req, res) => res.json({ msg: "profile works" }));

//@route GET api/profile/
//@desc get current user profile
//@access private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        if (!profile) {
          errors.noprofile = "There is no profile for this user";
          return res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  }
);

module.exports = router;
