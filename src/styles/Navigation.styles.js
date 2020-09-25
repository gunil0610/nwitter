import styled from "styled-components";
import { Link } from "react-router-dom";

export const NavList = styled.ul`
  display: flex;
  justify-content: center;
  margin-top: 50px;
`;

export const NavNweetLink = styled(Link)`
  margin-right: 10px;
`;

export const NavProfilePic = styled.img`
  height: 3em;
  width: 3em;
  border-radius: 50%;
`;

export const NavProfileLink = styled(Link)`
  margin-left: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 12px;
`;

export const NavProfileName = styled.span`
  margin-top: 10px;
`;
