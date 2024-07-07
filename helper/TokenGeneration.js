const jwt = require("jsonwebtoken");

module.exports.createSecretToken = (payload,secret,expiry) => {
  return jwt.sign({ id:payload.id,role:payload.role }, secret, {
    expiresIn: expiry,
  });
};