import styled, { css } from "styled-components";

const container = css`
  width: 100%;
  max-width: 320px;
  display: flex;
  flex-direction: column;
`;

const formBtn = css`
  cursor: pointer;
  width: 100%;
  padding: 7px 20px;
  text-align: center;
  color: white;
  border-radius: 20px;
  background-color: #04aaff;
`;

export const ProfileContainer = styled.div`
  ${container}
`;

export const ProfileForm = styled.form`
  border-bottom: 1px solid rgba(255, 255, 255, 0.9);
  padding-bottom: 30px;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const ProfileFormInput = styled.input`
  width: 100%;
  padding: 10px 20px;
  border-radius: 20px;
  border: 1px solid black;
  text-align: center;
  background-color: white;
  color: black;
`;

export const ProfileFormBtn = styled.input`
  ${formBtn}
  margin-top:10px;
`;

export const ProfileEditBtn = styled.span`
  ${formBtn}
`;
// formbtn cancelbtn logout span
export const ProfileLogOutBtn = styled.span`
  ${formBtn}
  background-color: tomato;
  margin-top: 10px;
`;
