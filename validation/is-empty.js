//new convention of making functions asper ES6 modules.
const isEmpty = value =>
  value === undefined ||
  value === null ||
  (typeof value === "object" && Object.keys(value).length === 0) ||
  (typeof value === "string" && value.trim().length === 0);

//Export function isEmpty.
//I can import this function using import from any file and use it
module.exports = isEmpty;
