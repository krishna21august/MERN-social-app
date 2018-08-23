const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateProfileInput(data) {
  let errors = {};
  data.handle = !isEmpty(data.handle) ? data.handle : "";
  data.status = !isEmpty(data.status) ? data.status : "";
  data.skills = !isEmpty(data.skills) ? data.skills : "";

  if (!Validator.isLength(data.handle, { min: 2, max: 40 })) {
    errors.handle = "handle must be between 2 and 4 characters.";
  }
  if (Validator.isEmpty(data.handle)) {
    errors.handle = "handle is required.";
  }
  if (Validator.isEmpty(data.skills)) {
    errors.skills = "skills is required.";
  }
  if (Validator.isEmpty(data.status)) {
    errors.status = "status is required.";
  }

  if (!isEmpty(data.website)) {
    if (!Validator.isURL(data.website)) {
      errors.website = "The url is not valid";
    }
  }
  if (!isEmpty(data.twitter)) {
    if (!Validator.isURL(data.twitter)) {
      errors.twitter = "The url is not valid";
    }
  }
  if (!isEmpty(data.youtube)) {
    if (!Validator.isURL(data.youtube)) {
      errors.youtube = "The url is not valid";
    }
  }
  if (!isEmpty(data.linkedin)) {
    if (!Validator.isURL(data.linkedin)) {
      errors.linkedin = "The url is not valid";
    }
  }
  if (!isEmpty(data.facebook)) {
    if (!Validator.isURL(data.facebook)) {
      errors.facebook = "The url is not valid";
    }
  }

  if (!isEmpty(data.instagram)) {
    if (!Validator.isURL(data.instagram)) {
      errors.instagram = "The url is not valid";
    }
  }

  return {
    errors,
    //If no errors thrown,is Valid ie set to true
    isValid: isEmpty(errors)
  };
};
