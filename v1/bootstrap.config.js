var exports = require("bootstrap-webpack/bootstrap.config.js");

// we don't have any jQuery at the moment...
Object.keys(exports.scripts).forEach(function (key) { exports.scripts[key] = false });

module.exports = exports;

