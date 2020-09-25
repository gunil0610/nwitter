import { dbService, storageService } from "fbase";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { FaPlus, FaTimes } from "react-icons/fa";
import {} from "styles/NweetFactory.styles";

const NweetFactory = ({ userObj }) => {
  const [nweet, setNweet] = useState("");
  const [attachment, setAttachment] = useState("");

  // save data on database on form submit
  const onSubmit = async (event) => {
    event.preventDefault();
    // making url for picture
    let attachmentUrl = "";
    if (attachment !== "") {
      const attachmentRef = storageService
        .ref()
        .child(`${userObj.uid}/${uuidv4()}`);
      const response = await attachmentRef.putString(attachment, "data_url");
      attachmentUrl = await response.ref.getDownloadURL();
    }
    // nweet obj
    const nweetObj = {
      text: nweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
      attachmentUrl,
    };
    // adding nweet obj on db
    await dbService.collection("nweets").add(nweetObj);
    // clear the form
    setNweet("");
    setAttachment("");
  };

  // show what you write on text input
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNweet(value);
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

  // clear the photo
  const onClearAttachment = () => {
    setAttachment("");
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        value={nweet}
        onChange={onChange}
        type="text"
        placeholder="What's on your mind"
        maxLength={120}
      />
      <input type="file" accept="image/*" onChange={onFileChange} />
      <input type="submit" value="&rarr;" />
      {attachment && (
        <div>
          <img src={attachment} alt="pic" width="50px" height="50px" />
          <button onClick={onClearAttachment}>Clear</button>
        </div>
      )}
    </form>
  );
};

export default NweetFactory;
