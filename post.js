const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Post = require("../models/Post");

// Create Post
// router.post("/", async (req, res) => {
//   try {
//     const { title, description, photo, username, categories } = req.body;
//     const newPost = new Post({
//       title,
//       description,
//       photo,
//       username,
//       // categories
//     });
//     await newPost.save();
//     res.status(201).json({
//       newPost,
//       msg: "Post created",
//     });
//   } catch (err) {
//     res.status(500).json({
//       msg: "Internal server error",
//     });
//   }
// });

// Create Post

router.post("/", async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(201).json({
      savedPost,
      msg: "Post created",
    });
    console.log(savedPost);
  } catch (err) {
    res.status(500).json({
      msg: "Internal Server error",
    });
    console.log(err);
  }
});

// Update Post
router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        const updatedPost = await Post.findByIdAndUpdate(
          req.params.id,
          { $set: req.body },
          { new: true }
        );
        res.status(200).json({
          updatedPost,
          msg: "Post updated",
        });
      } catch (err) {
        res.status(500).send(err);
      }
    } else {
      res.status(400).json({
        msg: "You are not authorized to update this post",
      });
    }
  } catch (err) {
    res.status(500).json({
      msg: "Internal Server error",
    });
  }
});

// Delete Post
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const post = await Post.findById(req.params.id);
    try {
      const post = await Post.findByIdAndDelete(req.params.id);
      if (post.username === req.body.username) {
        try {
          const deletedPost = await post.delete();
          res.status(200).json({
            deletedPost,
            msg: "Post deleted",
          });
        } catch (err) {
          res.status(500).send(err);
        }
      } else {
        res.status(400).json({
          msg: "You are not authorized to delete this post",
        });
      }
    } catch (err) {
      res.status(500).send(err);
    }
  } catch (err) {
    res.status(500).json({
      msg: "Internal Server error",
    });
  }
});

// Get all posts
router.get("/posts", async (req, res) => {
  const username = req.query.username;
  const categories = req.query.categories;
  try {
    let posts;
    if (username) {
      posts = await Post.find({ username: username });
    } else if (categories) {
      posts = await Post.find({
        categories: {
          $in: categories.split(","),
        },
      });
    } else {
      posts = await Post.find();
    }
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({
      msg: "Internal Server error",
    });
  }
}),
  // Get a post by id
  router.get("/:id", async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      res.status(200).json(post);
    } catch (err) {
      res.status(500).json({
        msg: "Internal Server error",
      });
    }
  }),
  (module.exports = router);
