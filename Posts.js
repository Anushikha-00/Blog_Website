import React from "react";
import "./posts.css";

import Post from "../post/Post";
const Posts = ({ posts }) => {
  return (
    <div className="posts">
      {posts.map((post) => (
        <Post key={post._id} post={post} />
      ))}
      {/* <Post />
      <Post />
      <Post />
      <Post />
      <Post /> */}
    </div>
  );
};

export default Posts;
