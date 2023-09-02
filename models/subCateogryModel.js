const mongoose = require("mongoose");

const subCategorySchema = new mongoose.Schema(
  {},
  {
    name: {
      type: String,
      trim: true, //time delete spacess .. example: "hp   "===> trim convert to this "hp"
      unique: [true, "Subcategory must be unique"],
      minlength: [2, "too short SubCategory name"],
      maxlength: [32, "too long SubCategory name"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    category: {
      type: mongoose.Schema.ObjectId,
      ref: "Category",
      required: [true, "SubCategory must be long to parent category"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("SubCategory", subCategorySchema);
