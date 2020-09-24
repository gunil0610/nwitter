import { authService, dbService, storageService } from "fbase";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

export default ({ refreshUser, userObj }) => {
  const history = useHistory();
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
  const [editing, setEditing] = useState(false); // state for editing profile
  const [attachment, setAttachment] = useState(""); // state for photo

  const toggleEditing = () => setEditing((prev) => !prev);

  // logout functionality
  const onLogOutClick = () => {
    authService.signOut();
    history.push("/");
  };

  // update value of input
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewDisplayName(value);
  };

  // update profile on submit
  const onSubmit = async (event) => {
    event.preventDefault();
    let attachmentUrl = userObj.photoURL;
    let userDataObj = {};

    // making url for picture
    if (attachment !== "") {
      const attachmentRef = storageService
        .ref()
        .child(`${userObj.uid}/${uuidv4()}`);
      const response = await attachmentRef.putString(attachment, "data_url");
      attachmentUrl = await response.ref.getDownloadURL();
    }

    // update profile name / photo
    if (
      userObj.displayName !== newDisplayName ||
      userObj.photoURL !== attachmentUrl
    ) {
      await userObj.updateProfile({
        displayName: newDisplayName,
        photoURL: attachmentUrl,
      });
    }

    // make user data Obj for reference to delete photoURL
    userDataObj = {
      userId: userObj.uid,
      name: newDisplayName,
      photoURL: attachmentUrl,
      updatedDate: Date.now(),
    };

    // clear userData add user data to DB
    await clearUserData();
    await dbService.collection("users").add(userDataObj);

    refreshUser();
    setEditing(false);
  };

  // uploading image functionality
  const onFileChange = (event) => {
    const {
      target: { files },
    } = event;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttachment(result);
    };
    reader.readAsDataURL(theFile);
  };

  // get user obj to delete old photo and user obj
  const getUserData = async () => {
    const userData = await dbService
      .collection("users")
      .where("userId", "==", userObj.uid)
      .orderBy("updatedDate", "desc")
      .get();
    const userDataId = userData.docs.map((doc) => {
      return {
        id: doc.id,
        attachmentUrl: doc.data().photoURL,
      };
    });
    if (userDataId.length > 0) {
      return userDataId.slice(0);
    } else {
      return null;
    }
  };

  // delete obj and old photo
  const clearUserData = async () => {
    const clearArr = await getUserData();
    if (clearArr) {
      clearArr.forEach(async (item) => {
        await dbService.doc(`users/${item.id}`).delete();
        if (item.attachmentUrl !== "") {
          await storageService.refFromURL(item.attachmentUrl).delete();
        }
      });
    }
  };

  return (
    <>
      {editing ? (
        <form onSubmit={onSubmit}>
          <input
            onChange={onChange}
            type="text"
            placeholder="Display Name"
            value={newDisplayName}
          />
          <input type="file" accept="image/*" onChange={onFileChange} />
          <input type="submit" placeholder="Update Profile" />
        </form>
      ) : (
        <>
          <button onClick={toggleEditing}>edit profile</button>
          <button onClick={onLogOutClick}>Log Out</button>
        </>
      )}
    </>
  );
};
