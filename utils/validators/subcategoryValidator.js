const { check } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");

// exports.getsubCategoryValidator = [
//   check("id").isMongoId().withMessage("Invalid subcategory id format"),
//   validatorMiddleware,
// ];

exports.createsubCategoryValidator = [
  check("name")
    .notEmpty()
    .withMessage("subCategory required")
    .isLength({ min: 2 })
    .withMessage("Too short subcategory name")
    .isLength({ max: 32 })
    .withMessage("Too long subcategory name"),
  check("category")
    .notEmpty()
    .withMessage("subCategory must be belong to category")
    .isMongoId()
    .withMessage("invalid category id format"),
  validatorMiddleware,
];

// exports.updatesubCategoryValidator = [
//   check("id").isMongoId().withMessage("Invalid subcategory id format"),
//   validatorMiddleware,
// ];

// exports.deletesubCategoryValidator = [
//   check("id").isMongoId().withMessage("Invalid subcategory id format"),
//   validatorMiddleware,
// ];
