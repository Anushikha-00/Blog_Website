import React, { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import Sidebar from "../../components/sidebar/Sidebar";
import Posts from "../../components/posts/Posts";
import "./home.css";
import axios from "axios";
import { useLocation } from "react-router-dom";
const Home = () => {
  const [posts, setPosts] = useState([]);

  // const location = useLocation()
  const { search } = useLocation();
  // console.log(search);
  useEffect(() => {
    const fetchPosts = async () => {
      // const res = await axios.get("http://localhost:4000/api/v1/post/posts");
      const { data } = await axios.get(
        "https://blogapp-backend18.herokuapp.com/api/v1/post/posts" + search
      );
      // console.log(data);
      setPosts(data);
    };
    fetchPosts();
  }, [search]);
  return (
    <>
      <Header />
      <div className="home">
        <Posts posts={posts} />
        {/* <Sidebar /> */}
      </div>
    </>
  );
};

export default Home;
