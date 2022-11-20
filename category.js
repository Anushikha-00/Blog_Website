const router = require("express").Router();
const Category = require("../models/Category");

// Post
router.post("/", async (req, res) => {
  const newCat = new Category(req.body);
  try {
    const savedCat = await newCat.save();
    res.status(201).json({
      savedCat,
      msg: "Category created",
    });
  } catch (err) {
    res.status(500).json({
      msg: "Internal Server error",
    });
  }
});

// Get
router.get("/", async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json({
      categories,
      msg: "Categories fetched",
    });
  } catch (err) {
    res.status(500).json({
      msg: "Internal Server error",
    });
  }
});
module.exports = router;
