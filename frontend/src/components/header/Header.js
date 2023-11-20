import React, { useRef, useState } from "react";
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
import SearchMenu from "./SearchMenu";
import AllMenu from "./AllMenu";
import useClickOutside from "../helpers/clickOutside";
import UserMenu from "./UserMenu";

const Header = () => {
  const { user } = useSelector((user) => ({ ...user }));
  const color = "#65676b";

  const [showSearchMenu, setShowSearchMenu] = useState(false);
  const [showAllMenu, setShowAllMenu] = useState(false);
  const allmenu = useRef(null);
  useClickOutside(allmenu, () => {
    setShowAllMenu(false);
  });

  return (
    <header>
      <div className="header_left">
        <Link to={"/"} className="header_logo">
          <div className="circle">
            <Logo />
          </div>
        </Link>
        <div
          className="search search1"
          onClick={() => {
            setShowSearchMenu(true);
          }}
        >
          <Search color={color} />
          <input
            type="text"
            placeholder="Search Facebook"
            className="hide_input"
          />
        </div>
      </div>

      {showSearchMenu && (
        <SearchMenu color={color} setShowSearchMenu={setShowSearchMenu} />
      )}
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
        <Link to={"/profile"} className="profile_link hover1">
          <img
            src={process.env.PUBLIC_URL + "/images/default_pic.png"}
            alt=""
          />

          <span>{user?.first_name}</span>
        </Link>
        <div
          className="circle_icon hover1"
          ref={allmenu}
          onClick={() => {
            setShowAllMenu(!showAllMenu);
          }}
        >
          <Menu />
          {showAllMenu && <AllMenu />}
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
          <UserMenu />
        </div>
      </div>
    </header>
  );
};

export default Header;