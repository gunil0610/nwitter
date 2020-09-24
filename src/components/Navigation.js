import React from "react";
import { Link } from "react-router-dom";

const Navigation = ({ userObj }) => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/profile">
            <>
              {userObj.photoURL && (
                <img
                  src={userObj.photoURL}
                  alt="pic"
                  width="50px"
                  height="50px"
                />
              )}
              <div>
                {userObj.displayName ? userObj.displayName : "NewUser"}'s
                Profile
              </div>
            </>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
