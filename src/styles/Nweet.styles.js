import styled, { css } from "styled-components";

const formBtn = css`
  cursor: pointer;
  width: 100%;
  padding: 7px 20px;
  text-align: center;
  color: white;
  border-radius: 20px;
  background-color: #04aaff;
`;

const container = css`
  width: 100%;
  max-width: 320px;
  display: flex;
  flex-direction: column;
`;

const formInput = css`
  width: 100%;
  padding: 10px 20px;
  border-radius: 20px;
  border: 1px solid black;
  text-align: center;
  background-color: white;
  color: black;
`;

export const NweetStyle = styled.div`
  margin-bottom: 20px;
  background-color: white;
  width: 100%;
  max-width: 320px;
  padding: 20px;
  border-radius: 10px;
  position: relative;
  display: flex;
  flex-direction: column;
  color: rgba(0, 0, 0, 0.8);

  & h4 {
    font-size: 14px;
  }

  & img {
    right: -10px;
    top: 20px;
    position: absolute;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    margin-top: 10px;
  }
`;

export const NweetForm = styled.form`
  ${container}
`;

//className="formInput"
export const NweetFormInput = styled.input`
  ${formInput}
`;

//className="formBtn"
export const NweetSubmitButton = styled.input`
  ${formBtn}
  margin-top: 15px;
  margin-bottom: 5px;
`;

// className="formBtn cancelBtn"
export const NweetEditCancel = styled.span`
  ${formBtn}
  background-color: tomato;
`;

//<div class="nweet__actions">
export const NweetButtonContainer = styled.div`
  position: absolute;
  right: 10px;
  top: 10px;

  & span {
    cursor: pointer;
  }
  & span:first-child {
    margin-right: 10px;
  }
`;

export const NweetContainer = styled.div`
  word-wrap: break-word;
`;
