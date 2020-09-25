import AuthForm from "components/AuthForm";
import { authService, firebaseInstance } from "fbase";
import React from "react";
import { FaTwitter, FaGoogle, FaGithub } from "react-icons/fa";
import { AuthContainer, AuthBtns, AuthBtn } from "styles/Auth.styles";

const Auth = () => {
  // OAuth
  const onSocialClick = async (event) => {
    const {
      target: { name },
    } = event;
    let provider;
    if (name === "google") {
      provider = new firebaseInstance.auth.GoogleAuthProvider();
    } else if (name === "github") {
      provider = new firebaseInstance.auth.GithubAuthProvider();
    }
    const data = await authService.signInWithPopup(provider);
    console.log(data);
  };

  return (
    <AuthContainer>
      <FaTwitter color="#04AAFF" size="3em" style={{ marginBottom: 30 }} />
      <AuthForm />
      <AuthBtns>
        <AuthBtn onClick={onSocialClick} name="google">
          Continue with Google <FaGoogle />
        </AuthBtn>
        <AuthBtn onClick={onSocialClick} name="github">
          Continue with Github <FaGithub />
        </AuthBtn>
      </AuthBtns>
    </AuthContainer>
  );
};
export default Auth;
