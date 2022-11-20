import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { useLocation, Link } from "react-router-dom";
import "./singlePost.css";
import { Context } from "../../context/Context";
import { toast } from "react-toastify";

const SinglePost = () => {
  const { user, dispatch } = useContext(Context);
  // const pp = "http://localhost:4001/images/";
  // const pp = "/images/";
  const pp = "https://blogapp-backend18.herokuapp.com/images/";

  // console.log("single " , user)

  const [post, setPost] = useState({});
  // console.log("Post" , post);
  const location = useLocation();
  // console.log("location", location);
  const path = location.pathname.split("/")[2];
  // console.log("path", path);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [updateMode, setUpdateMode] = useState(false);

  // console.log("post", post);
  // console.log("user", user);
  // console.log("Username", user.user.username);

  useEffect(() => {
    const getPost = async () => {
      const { data } = await axios.get(
        "https://blogapp-backend18.herokuapp.com/api/v1/post/" + path
      );
      console.log("data is 32 ", data);
      setPost(data);
      setTitle(data.title);
      setDescription(data.description);
    };
    getPost();
  }, [path]);

  console.log("40", post);

  const handleDelete = () => {
    console.log("Delete category");
    console.log("Post", post._id);
    axios
      .delete(
        `https://blogapp-backend18.herokuapp.com/api/v1/post/${post._id}`,
        {
          data: { username: user?.user?.username },
        }
      )
      .then((res) => {
        toast.success("Post deleted successfully");
        window.location.href = "/";
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  const handleUpdate = () => {
    axios
      .put(`https://blogapp-backend18.herokuapp.com/api/v1/post/${post._id}`, {
        username: user?.user?.username,
        title,
        description,
      })
      .then((res) => {
        toast.success("Post updated successfully");
        setUpdateMode(false);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        {post.photo ? (
          <img src={pp + post.photo} alt="" className="singlePostImg" />
        ) : (
          <img
            src="https://images.pexels.com/photos/574077/pexels-photo-574077.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt=""
            className="singlePostImg"
          />
        )}
        {updateMode ? (
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="singlePostTitleInput"
            autoFocus
            type="text"
          />
        ) : (
          <>
            <h1 className="singlePostTitle">
              {title}
              {post.username === user?.user.username && (
                <div className="singlePostEdit">
                  <i
                    className="singlePostIcon far fa-edit"
                    onClick={() => setUpdateMode(true)}
                  ></i>
                  <i
                    className="singlePostIcon far fa-trash-alt"
                    onClick={() => handleDelete()}
                  ></i>
                </div>
              )}
            </h1>
          </>
        )}
        <div className="singlePostInfo">
          <span>
            Author :
            <Link className="link" to={"/posts/?username=" + post.username}>
              <b className="singlePostAuthor"> {post.username} </b>
            </Link>
          </span>
          <span>
            {" "}
            Date :{" "}
            <b className="singlePostDate">
              {new Date(post.date).toDateString()}
            </b>
          </span>
        </div>
        {updateMode ? (
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="singlePostDescInput"
            autoFocus
            type="text"
          />
        ) : (
          <p className="singlePostDesc">{description}</p>
        )}
        {updateMode && (
          <button className="singlePostUpdateBtn" onClick={handleUpdate}>
            Update
          </button>
        )}
      </div>
    </div>
  );
};

export default SinglePost;
