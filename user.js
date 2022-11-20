const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const Post = require("../models/Post");

// Get all users
router.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ users });
  } catch (err) {
    res.status(500).json({ msg: "Internal Server error" });
  }
}),
  // Get a user by id
  router.get("/:id", async (req, res) => {
    try {
      const user = await User.findById(req.params.id);

      // const {password , ...others} = user._doc;
      const password = undefined;
      res.status(200).json({
        user,
      });
    } catch (err) {
      res.status(500).json({
        msg: "Internal Server error",
      });
    }
  });

// Update
router.put("/:id", async (req, res) => {
  console.log(req.body);
  if (req.body.userId == req.params.id) {
    // First check if the user with updated username already exists
    let { userId } = req.body;
    // if (username || email) {
    const user = await User.findById(userId);
    if (user) {
      try {
        const updatedUser = await User.findByIdAndUpdate(
          req.params.id,
          { $set: req.body },
          { new: true }
        );
        res.status(200).json({
          updatedUser,
          msg: "User updated",
        });
        console.log(updatedUser);
      } catch (err) {
        res.status(500).json({
          msg: "Internal Server error",
        });
        console.log(err);
      }
      // return res.status(409).json({ msg: "User already exists" });
      console.log("userId", req.body.userId);
      if (req.body.password) {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hashSync(req.body.password, salt);
      }
      // try {
      //   const updatedUser = await User.findByIdAndUpdate(
      //     req.params.id,
      //     { $set: req.body },
      //     { new: true }
      //   );
      //   res.status(200).json({
      //     updatedUser,
      //     msg: "User updated",
      //   });
      //   console.log(updatedUser);
      // } catch (err) {
      //   res.status(500).json({
      //     msg: "Internal Server error",
      //   });
      //   console.log(err);
      // }
    } else {
      res
        .status(400)
        .json({ msg: "Ids do not match , You can only update your account" });
    }
  }
});

// Delete
router.delete("/:id", async (req, res) => {
  console.log(req.body);
  let { userId } = req.body;
  if (req.body.userId == req.params.id) {
    const user = await User.findById(userId);
    if (user) {
      try {
        const deletedUser = await User.findByIdAndDelete(userId);
        const deletedPosts = await Post.deleteMany({ username: user.username });
        res.status(200).json({
          deletedUser,
          deletedPosts,
          msg: "User Deleted",
        });
      } catch (err) {
        res.status(500).json({
          msg: "Internal Server error",
        });
      }
    } else {
      res.status(401).json({ msg: "User not found" });
    }
    // try {
    //   const user = await User.findById(userId);
    //   //   const deletedUser = await User.findByIdAndDelete(req.params.id);
    //   try {
    //     const deletedPosts = await Post.deleteMany({ username: user.username });
    //     const deletedUser = await User.findByIdAndDelete(req.params.id);
    //     res.status(200).json({
    //       deletedUser,
    //       deletedPosts,
    //       msg: "User deleted",
    //     });
    //   } catch (err) {
    //     res.status(401).json({ msg: "User not found" });
    //   }
    // } catch (err) {
    //   res.status(500).json({
    //     msg: "Internal Server error",
    //   });
    // }
  } else {
    res
      .status(400)
      .json({ msg: "Ids do not match , You can only delete your account" });
  }
});

module.exports = router;
