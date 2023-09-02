const { validationResult } = require('express-validator');
//2- middleware => catch errors from rules if exit
// @desc  Finds the validation errors in this request and wraps them in an object with handy functions
const validatorMiddleware = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
 
module.exports = validatorMiddleware;
