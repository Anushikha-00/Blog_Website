import axios from "axios";
import React, { useEffect, useState } from "react";
import "./sidebar.css";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [cats, setCats] = useState([]);
  useEffect(() => {
    const getCats = async () => {
      const { data } = await axios.get("http://localhost:4001/api/v1/category");
      // console.log(data.categories);
      setCats(data.categories);
    };
    getCats();
  }, []);
  return (
    <div className="sidebar">
      <div className="sidebarItem">
        <span className="sidebarTitle">About ME</span>
        <img
          src="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt=""
        />
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat
          distinctio ullam voluptate maxime suscipit impedit? Eligendi pariatur
          dignissimos dolor fugiat, mollitia, modi necessitatibus, fugit ipsa
          ipsum provident corporis? Nesciunt, molestiae!
        </p>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">Categories</span>
        <ul>
          {cats.map((cat) => (
            <Link className="link" to={"/posts/?cat=" + cat.name}>
              <li key={cat._id} className="sidebarListItem">
                {cat.name}
              </li>
            </Link>
          ))}
          {/* <li className="sidebarListItem">Music</li>
          <li className="sidebarListItem">Tech</li>
          <li className="sidebarListItem">Sports</li> */}
        </ul>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">Follow Us</span>
        <div className="sidebarSocial">
          <i className="sidebarIcon fa-brands fa-facebook"></i>
          <i className="sidebarIcon fa-brands fa-twitter"></i>
          <i className="sidebarIcon fa-brands fa-instagram"></i>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
