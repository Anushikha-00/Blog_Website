import React from "react";
import "./header.css";

const Header = () => {
  return (
    <div className="header">
      <div className="headerTitles">
        <span className="headerTitleSm">BLOGGING</span>
        <span className="headerTitleLg">BLOG WEBSITE</span>
      </div>
      <img
        src="https://images.pexels.com/photos/7925859/pexels-photo-7925859.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        alt="Header Image"
        className="headerImg"
      />
    </div>
  );
};

export default Header;
