import { dbService } from "fbase";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Navigation = ({ userObj }) => {
  const [userName, setUserName] = useState(userObj.displayName);
  const [userPhoto, setUserPhoto] = useState("");
  // realtime change
  useEffect(() => {
    dbService.collection("users").onSnapshot((snapshot) => {
      const user = snapshot.docs.map((doc) => doc.data());
      if (user[0]) {
        setUserPhoto(user[0].photoURL);
      }
      setUserName(userObj.displayName);
    });
  }, []);
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/profile">
            <>
              {userPhoto && (
                <img src={userPhoto} alt="pic" width="50px" height="50px" />
              )}
              <div>{userName}'s Profile</div>
            </>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
