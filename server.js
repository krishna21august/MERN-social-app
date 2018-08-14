const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

//Require route files
const users = require("./routes/api/users");
const posts = require("./routes/api/posts");
const profile = require("./routes/api/profile");

const app = express();

//middleware for body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//db config
const db = require("./config/keys").mongoURI;

//connect to mongodb using mongoose
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log("DB connected"))
  .catch(err => console.log(err));

app.get("/", (req, res) => res.send("Hello"));

//use Routes
//when you will make request to localhost:5000/api/users/test the test router/get or router/post ex. router.get('/test') will be called since we have already defined to call this file using app.use
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);

const port = process.env.PORT || 5000;

app.listen(port, () => `Server running on port ${port}`);
