import React, { useState } from "react";
import styled from "@emotion/styled";
import { Navigate } from "react-router-dom";


const Container = styled.div`
  background-color: gray;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;'
`;

const SignUpCard = styled.div`
  background-color: #FFFFFF;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  // padding: 0 10px;
  width: 20em;
  height: 20em;
  border-radius: 20px;
  margin: auto; 
`;


const SignUpForm = styled.form`
display: flex;
flex-direction: column;
align-items: center;
width: 20em;

justify-content: center;
`;

const SignUpHeader = styled.h1`
  font-weight: bold;
  text-align: center;
  margin: 5% 0 0 0;
`;

const Input = styled.input`
  background-color: #eee;
  border: none;
  padding: 12px 15px;
  margin: 2.5% 0 0 0;
  width: 50%;
`;

const SubmitButton = styled.button`
  margin: 5% 0 0 0;
  border-radius: 20px;
  border: 1px solid #FF4B2B;
  background-color: #FF4B2B;
  color: #FFFFFF;
  font-size: 12px;
  font-weight: bold;
  padding: 12px 45px;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: transform 80ms ease-in;
`;
const fetchSignUp = (username, password) => {
  return fetch("http://localhost:8080/user/sign_up", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username,
      password
    })
  });
};
const SignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);

  const submit = async (e) => {
    e.preventDefault();

    const response = await fetchSignUp(username, password);
    if (response.ok === true) {
      setRedirect(true);
    } else {
      alert("Sign up failed.");
    }
  };

  if (redirect) {
    return <Navigate to="/sign_in" />;
  }

  return (
    <Container>
      <SignUpCard>
      <SignUpForm onSubmit={submit}>
        <SignUpHeader>Please Sign Up</SignUpHeader>
        <Input
          placeholder="Name"
          required
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          placeholder="Password"
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <SubmitButton >SIGN UP</SubmitButton>
      </SignUpForm>
      </SignUpCard>
    </Container>
  );
};

export default SignUp;
