const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateLoginInput(data) {
  let errors = {};
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  if (Validator.isEmpty(data.email)) {
    errors.email = "Email is required";
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = "Invalid Email";
  }

  if (Validator.isEmpty(data.password)) {
    errors.passsword = "password is required";
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "password must be atleast 6 characters.";
  }

  return {
    errors,
    //If no errors thrown,is Valid ie set to true
    isValid: isEmpty(errors)
  };
};
