import { dbService, storageService } from "fbase";
import React, { useState } from "react";
import { FaTrash, FaPencilAlt } from "react-icons/fa";
import {
  NweetStyle,
  NweetForm,
  NweetFormInput,
  NweetSubmitButton,
  NweetEditCancel,
  NweetButtonContainer,
  NweetContainer,
} from "styles/Nweet.styles";

const Nweet = ({ nweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newNweet, setNewNweet] = useState(nweetObj.text);

  // delete tweet
  const onDeleteClick = async () => {
    const ok = window.confirm("Are you sure you want to delete this nweet?");
    if (ok) {
      //delete
      await dbService.doc(`nweets/${nweetObj.id}`).delete();
      await storageService.refFromURL(nweetObj.attachmentUrl).delete();
    }
  };

  const toggleEditing = () => setEditing((prev) => !prev);
  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.doc(`nweets/${nweetObj.id}`).update({
      text: newNweet,
    });
    setEditing(false);
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewNweet(value);
  };

  return (
    <NweetStyle>
      {editing ? (
        <>
          {isOwner && (
            <>
              <NweetForm onSubmit={onSubmit}>
                <NweetFormInput
                  type="text"
                  placeholder="Edit your nweet"
                  value={newNweet}
                  required
                  autoFocus
                  onChange={onChange}
                />
                <NweetSubmitButton type="submit" value="Update Nweet" />
              </NweetForm>
              <NweetEditCancel onClick={toggleEditing}>Cancel</NweetEditCancel>
            </>
          )}
        </>
      ) : (
        <>
          <NweetContainer>
            <h4>{nweetObj.text}</h4>
            {nweetObj.attachmentUrl && (
              <img src={nweetObj.attachmentUrl} alt="attachment" />
            )}
            {isOwner && (
              <NweetButtonContainer>
                <span onClick={onDeleteClick}>
                  <FaTrash />
                </span>
                <span onClick={toggleEditing}>
                  <FaPencilAlt />
                </span>
              </NweetButtonContainer>
            )}
          </NweetContainer>
        </>
      )}
    </NweetStyle>
  );
};

export default Nweet;
