const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validatePostInput(data) {
  let errors = {};
  data.text = !isEmpty(data.text) ? data.text : "";

  if (!Validator.isLength(data.text, { min: 10, max: 30 })) {
    errors.text = "The post must be of length between 10 and 300";
  }
  if (Validator.isEmpty(data.text)) {
    errors.text = "Text Field is required";
  }

  return {
    errors,
    //If no errors thrown,is Valid ie set to true
    isValid: isEmpty(errors)
  };
};
