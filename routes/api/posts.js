const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

//Post model
const Post = require("../../models/Post");

//Profile model
const Profile = require("../../models/Profile");

//Validate Post
const validatePostInput = require("../../validation/post");

//@route GET api/posts/test
//@desc tests posts route
//@access public
router.get("/test", (req, res) => res.json({ msg: "posts works" }));

//@route GET api/posts
//@desc Get Posts
//@access public
router.get("/", (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then(posts => res.json(posts))
    .catch(err => res.status(404).json({ noPostsFound: "No posts found." }));
});

//@route GET api/posts/:id
//@desc Get Posts by id
//@access public
router.get("/:id", (req, res) => {
  Post.findById(req.params.id)
    .sort({ date: -1 })
    .then(post => res.json(post))
    .catch(err =>
      res.status(404).json({ noPostFound: "No Post Found With That Id " })
    );
});

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

//@route DELETE api/posts/:id
//@desc Delete Posts
//@access private
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          if (post.user.toString() !== req.user.id) {
            return res
              .status(401)
              .json({ unauthorized: "user is unauthorized" });
          }
          //Delete to post
          post.remove().then(() => res.status(200).json({ success: true }));
        })
        .catch(err => res.status(404).json({ postnotfound: "No post found" }));
    });
  }
);

//@route POST api/posts/likes/:id
//@desc Like Posts
//@access private
router.post(
  "/like/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //getr profile of logged in user
    Profile.findOne({ user: req.user.id }).then(profile => {
      //find post by id
      Post.findById(req.params.id)
        .then(post => {
          if (
            //check if the user id already exists in likes array.
            post.likes.filter(like => like.user.toString() === req.user.id)
              .length > 0
          ) {
            return res
              .status(400)
              .json({ alreadyliked: "User already liked this post." });
          }

          //add user id in likes array
          post.likes.unshift({ user: req.user.id });
          post.save().then(post => res.json(post));
        })
        .catch(err => res.status(404).json({ postnotfound: "No post found" }));
    });
  }
);

//@route POST api/posts/unlike/:id
//@desc Unlike Posts
//@access private
router.post(
  "/unlike/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //getr profile of logged in user
    Profile.findOne({ user: req.user.id }).then(profile => {
      //find post by id
      Post.findById(req.params.id)
        .then(post => {
          if (
            //check if the user id already exists in likes array.
            post.likes.filter(like => like.user.toString() === req.user.id)
              .length == 0
          ) {
            return res
              .status(400)
              .json({ notLiked: "You have not liked the post yet." });
          }

          //Get remove index of the user curretly trying to unlike the post.map converts this 2d array to 1d array and then get index of passed value.
          const removeIndex = post.likes
            .map(like => like.user.toString())
            .indexOf(req.user.id);

          //splice index of array
          post.likes.splice(removeIndex);

          post.save().then(post => res.json(post));
        })
        .catch(err => res.status(404).json({ postnotfound: "No post found" }));
    });
  }
);

module.exports = router;
