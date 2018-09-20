const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

//Post model
const Post = require("../../models/Post");

//Validate Post
const validatePostInput = require("../../validation/post");

//@route GET api/posts/test
//@desc tests posts route
//@access public
router.get("/test", (req, res) => res.json({ msg: "posts works" }));

//@route POST api/posts
//@desc Create Posts
//@access private
//then acting as promise here parameter passed is parameter to function.
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);

    if (!isValid) {
      res.status(400).json(errors);
    }

    const newPost = new Post({
      text: req.body.text,
      name: req.body.name,
      avatar: req.body.avatar,
      user: req.user.id
    });
    newPost.save().then(post => res.json(post));
  }
);

module.exports = router;
