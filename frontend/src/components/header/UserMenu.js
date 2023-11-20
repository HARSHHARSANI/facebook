import React from "react";
import { Link } from "react-router-dom";

const UserMenu = () => {
  return (
    <div className="mmenu">
      <Link to={"/profile"} className="mmenu_header hover3">
        <img src="" alt="" />
      </Link>
    </div>
  );
};

export default UserMenu;
