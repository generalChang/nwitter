import React, { useEffect } from "react";
import { Link } from "react-router-dom";

export default ({ userObj }) => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/profile">
            {userObj.displayName
              ? userObj.displayName
              : userObj.email.split("@")[0]}{" "}
            Profile
          </Link>
        </li>
      </ul>
    </nav>
  );
};
