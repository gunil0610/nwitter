import React from "react";
import { FaTwitter, FaUser } from "react-icons/fa";
import { IconContext } from "react-icons/lib";
import {
  NavList,
  NavNweetLink,
  NavProfileLink,
  NavProfileName,
  NavProfilePic,
} from "styles/Navigation.styles";

const Navigation = ({ userObj }) => {
  return (
    <nav>
      <NavList>
        <IconContext.Provider value={{ color: "#04AAFF", size: "2em" }}>
          <li>
            <NavNweetLink to="/">
              <FaTwitter />
            </NavNweetLink>
          </li>
          <li>
            <NavProfileLink to="/profile">
              <>
                {userObj.photoURL ? (
                  <NavProfilePic src={userObj.photoURL} alt="userProfile" />
                ) : (
                  <FaUser />
                )}
                <NavProfileName>
                  {userObj.displayName ? userObj.displayName : "User"}'s Profile
                </NavProfileName>
              </>
            </NavProfileLink>
          </li>
        </IconContext.Provider>
      </NavList>
    </nav>
  );
};

export default Navigation;
