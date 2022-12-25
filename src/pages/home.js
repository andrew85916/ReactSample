import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import NavBar from "../components/navBar";
import {useNavigate} from "react-router-dom"
import Post from "../components/post";
import Share from "../components/share";

const FeedContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

`  
const FeedWrapper = styled.div`
    padding: 20px;
    width:30em;
`

export default function Home (){

  const navigate = useNavigate();
  const [articles,setArticles] = useState([]);

  function hasJWT() {
    let flag = false;
    //check user has JWT token
    localStorage.getItem("token") ? (flag = true): (flag = false);
    return flag; 
  }

  const fetchArticles = async ()=>{
    const token = localStorage.getItem("token");
    const response = await fetch("http://localhost:8080/api/get_others_articles", {
      method: "GET",
      headers: { 
        "Content-Type": "application/json",
        "authorization":`Bearer ${token}`,
       },
    })
    const responseJSON = await response.json()
    setArticles(responseJSON)
  }

  useEffect(()=>{
    if (!hasJWT()) {
      console.log("not login")
      navigate("/sign_in");
    }
    fetchArticles()
  },[])
  return (
    <>
      <NavBar/>
      <FeedContainer>
        <FeedWrapper>
          <Share />     
          {articles.map((p) => (
            <Post key={p.id} post={p} />
          ))}
      </FeedWrapper>
    </FeedContainer>
    </>
  )
};

