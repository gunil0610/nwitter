import styled, { css } from "styled-components";

const container = css`
  width: 100%;
  max-width: 320px;
  display: flex;
  flex-direction: column;
`;

const authInput = css`
  max-width: 320px;
  width: 100%;
  padding: 10px;
  border-radius: 30px;
  background-color: rgba(255, 255, 255, 1);
  margin-bottom: 10px;
  font-size: 12px;
  color: black;
`;

export const AuthFormContainer = styled.form`
  ${container}
`;

//authinput
export const AuthFormInput = styled.input`
  ${authInput}
`;

// authsubmit
export const AuthFormSubmit = styled.input`
  ${authInput}
  text-align: center;
  background: #04aaff;
  color: white;
  margin-top: 10;
  cursor: pointer;
`;

//span autherror
export const AuthFormError = styled.span`
  color: tomato;
  text-align: center;
  font-weight: 500;
  font-size: 12px;
`;
// authSwitch
export const AuthFormSwitch = styled.span`
  color: #04aaff;
  cursor: pointer;
  margin-top: 10px;
  margin-bottom: 50px;
  display: block;
  font-size: 12px;
  text-decoration: underline;
`;
