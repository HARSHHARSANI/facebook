import React from "react";
import {
  ArrowDown,
  Friends,
  Gaming,
  HomeActive,
  Logo,
  Market,
  Menu,
  Messenger,
  Notifications,
  Search,
  Watch,
} from "../../svg";
import "./style.css";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Header = () => {
  const color = "#65676b";
  const { user } = useSelector((user) => ({ ...user }));
  console.log(user);
  return (
    <header>
      <div className="header_left">
        <Link to={"/"} className="header_logo">
          <div className="circle">
            <Logo />
          </div>
        </Link>
        <div className="search search1">
          <Search color={color} />
          <input
            type="text"
            placeholder="Search Facebook"
            className="hide_input"
          />
        </div>
      </div>
      <div className="header_middle">
        <Link to={"/"} className="middle_icon active">
          <HomeActive color={color} />
        </Link>
        <Link to={"/"} className="middle_icon hover1">
          <Friends color={color} />
        </Link>
        <Link to={"/"} className="middle_icon hover1">
          <Watch color={color} />
          <div className="middle_notification">9+</div>
        </Link>
        <Link to={"/"} className="middle_icon hover1">
          <Market color={color} />
        </Link>
        <Link to={"/"} className="middle_icon hover1">
          <Gaming color={color} />
        </Link>
      </div>
      <div className="header_right">
        <Link className="profile_link hover1">
          <img
            src={process.env.PUBLIC_URL + "/images/default_pic.png"}
            alt=""
          />

          <span>{user?.first_name}</span>
        </Link>
        <div className="circle_icon hover1">
          <Menu />
        </div>
        <div className="circle_icon hover1">
          <Messenger />
        </div>
        <div className="circle_icon hover1">
          <Notifications />
          <div className="right_notification">5</div>
        </div>
        <div className="circle_icon hover1">
          <ArrowDown />
        </div>
      </div>
    </header>
  );
};

export default Header;
