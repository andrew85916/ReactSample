import React, { useState } from "react";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  background-color: gray;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;'
`;
const SignInCard = styled.div`
  background-color: #FFFFFF;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 20em;
  height: 20em;
  border-radius: 20px;
  margin: auto; 
`;
const SignInForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 20em;
  justify-content: center;
`;
const SignInHeader = styled.h1`
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
const SignUpButton = styled.button`
  border-radius: 20px;
  border: 1px solid #FF4B2B;
  background-color: #FF4B2B;
  margin:2.5%; 
  color: #FFFFFF;
  font-size: 12px;
  font-weight: bold;
  padding: 12px 45px;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: transform 80ms ease-in;
`;

const fetchSignIn = (username, password) => {
  return fetch("http://localhost:8080/user/sign_in", {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify({
      username,
      password
    })
  })
    .then((response) => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      // Read the response as json.
      return response.json();
    })
    .catch((error) => {
      console.log(error);
    });
};

export default function SignIn(){

  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    await fetchSignIn(username, password).then((data) => {
      if (data !== undefined) {
        setRedirect(true);
        localStorage.setItem("token", data.token);
      } else {
        alert("Sign in failed.");
      }
    });
  };
  if (redirect) {
    return navigate('/home');
  }
  const handleSignUpButton = () =>{
    navigate("/sign_up")
  } 

  return (
    <Container>
      <SignInCard>
        <SignInForm onSubmit={submit}>
          <SignInHeader>Please Sign In</SignInHeader>
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
          <SubmitButton>Submit</SubmitButton>   
        </SignInForm>
        <div style={{width:'60%', margin: '2.5%'}}>
          <div style={{flex: 1, height: 2, backgroundColor: 'black'}}></div> 
        </div>
        <SignUpButton onClick={handleSignUpButton}>Sign Up</SignUpButton>
      </SignInCard>
    </Container>
  );
};