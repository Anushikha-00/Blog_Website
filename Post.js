import React from "react";
import "./post.css";
import { Link } from "react-router-dom";
const Post = ({ post }) => {
  // const pp = "http://localhost:4001/images/";
  // const pp = "/images/";
  const pp = "https://blogapp-backend18.herokuapp.com/images/";
  // console.log(post);
  return (
    <div className="post">
      {post.photo ? (
        <img src={pp + post.photo} alt="" className="postImg" />
      ) : (
        <img
          src="https://images.pexels.com/photos/574077/pexels-photo-574077.jpeg?auto=compress&cs=tinysrgb&w=1600"
          alt=""
          className="postImg"
        />
      )}
      <div className="postInfo">
        <div className="postCats">
          {post.categories.map((cat, index) => (
            <span key={cat + index}>{cat.name}</span>
          ))}

          {/* <span className="postCat">Music</span> */}
          {/* <span className="postCat">Life</span> */}
        </div>
        {
          <Link to={"/post/" + post._id} className="link">
            <span className="postTitle">{post.title}</span>
          </Link>
        }
        <hr />
        <span className="postDate">{new Date(post.date).toDateString()}</span>
      </div>
      <p className="postDesc">{post.description}</p>
    </div>
  );
};

export default Post;
