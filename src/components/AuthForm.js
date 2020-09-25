import { authService } from "fbase";
import React, { useState } from "react";
import {
  AuthFormContainer,
  AuthFormInput,
  AuthFormSubmit,
  AuthFormError,
  AuthFormSwitch,
} from "styles/AuthForm.styles";

const AuthForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState("");

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      let data;
      if (newAccount) {
        // create account
        data = await authService.createUserWithEmailAndPassword(
          email,
          password
        );
      } else {
        // log in
        data = await authService.signInWithEmailAndPassword(email, password);
      }
      console.log(data);
    } catch (error) {
      setError(error.message);
    }
  };

  const toggleAccount = () => setNewAccount((prev) => !prev);

  return (
    <>
      <AuthFormContainer onSubmit={onSubmit}>
        <AuthFormInput
          name="email"
          type="text"
          placeholder="Email"
          required
          value={email}
          onChange={onChange}
        />
        <AuthFormInput
          name="password"
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={onChange}
        />
        <AuthFormSubmit
          type="submit"
          value={newAccount ? "Create Account" : "Sign in"}
        />
        {error && <AuthFormError>{error}</AuthFormError>}
      </AuthFormContainer>
      <AuthFormSwitch onClick={toggleAccount}>
        {newAccount ? "Sign in" : "Create Account"}
      </AuthFormSwitch>
    </>
  );
};

export default AuthForm;
