/*Used to export the object so that it can be accessed from outer scope.
If you require this module then you have to export module using module.exports*/

module.exports = {
  mongoURI: process.env.MONGO_URI,
  secretOrKey: process.env.SECRET_OR_KEY
};
