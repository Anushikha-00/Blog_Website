import React, { useContext } from "react";
import { Context } from "../../context/Context";
import "./topbar.css";
import { Link } from "react-router-dom";
// const PP = "http://localhost:4001/images"
// const PP = "/images/";
const PP = "https://blogapp-backend18.herokuapp.com/images/";

const Topbar = () => {
  const { user, dispatch } = useContext(Context);
  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };
  // console.log("top_bar", user);
  return (
    <div className="top">
      <div className="topLeft">
        {/* <i className="topIcon fa-brands fa-facebook"></i>
        <i className="topIcon fa-brands fa-twitter"></i>
        <i className="topIcon fa-brands fa-instagram"></i> */}
      </div>
      <div className="topCenter">
        <ul className="topList">
          <li className="topListItem">
            <Link to="/" className="link">
              HOME
            </Link>
          </li>
          {/* <li className="topListItem">About</li> */}
          {/* <li className="topListItem">Contact</li> */}
          <li className="topListItem link">
            <Link to="/write" className="link">
              WRITE
            </Link>
          </li>
          {user ? (
            <li className="topListItem link">
              {" "}
              <Link to="#" className="link" onClick={handleLogout}>
                LOGOUT
              </Link>
            </li>
          ) : null}
          {user ? (
            <>
              <li className="topListItem link">
                {" "}
                <Link to="/settings" className="link">
                  SETTINGS
                </Link>
              </li>
            </>
          ) : (
            <>
              <li className="topListItem link">
                {" "}
                <Link to="/register" className="link">
                  REGISTER
                </Link>
              </li>
              <li className="topListItem link">
                {" "}
                <Link to="/login" className="link">
                  LOGIN
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
      <div className="topRight">
        <Link to="/settings">
          <img
            src={PP + user?.user?.profilePic}
            alt="Profile Pic"
            className="topImg"
          />
        </Link>
      </div>
    </div>
  );
};

export default Topbar;
