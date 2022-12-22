import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
// import {  NavLink  } from "react-router-dom";
import NavBar from "../components/navBar";
// import Feed from "../components/feed";
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

const Home = (props) => {
  const navigate = useNavigate();

  function hasJWT() {
    let flag = false;
    //check user has JWT token
    localStorage.getItem("token") ? (flag = true): (flag = false);
    return flag; 
  }

  const [articles,setArticles] = useState([])

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
    console.log("feed")
    // console.log(responseJSON)
    setArticles(responseJSON)
    console.log(articles)
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
        {/* <Post post ={articles} /> */}
      </FeedWrapper>
    </FeedContainer>
    </>
  )
};

export default Home;
