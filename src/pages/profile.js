import styled from "@emotion/styled";
import React, { useEffect, useState,useRef,useCallback } from "react";
// import {  NavLink  } from "react-router-dom";
import NavBar from "../components/navBar";
import Feed from "../components/feed";
import {useNavigate} from "react-router-dom"
import OwnPost from "../components/own_post";
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

const Profile = (props) => {
  const navigate = useNavigate();

  const [articles,setArticles] = useState([])
  const [articleFlag,setArticleFlag] = useState(false)



  function hasJWT() {
    let flag = false;
    //check user has JWT token
    localStorage.getItem("token") ? (flag = true): (flag = false);
    return flag; 
  }


  const fetchArticles = async ()=>{
    const token = localStorage.getItem("token");
    const response = await fetch("http://localhost:8080/api/get_self_articles", {
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

    console.log("test")
  };




  useEffect(()=>{
    if (!hasJWT()) {
      console.log("not login")
      navigate("/sign_in");
    }
    fetchArticles();
    setArticleFlag(true)
  },[articleFlag])
  return (
    <>
      <NavBar/>
      <FeedContainer>
        <FeedWrapper>
          <Share reloadFlag={setArticleFlag}/>
          {/* {console.log(articles)} */}
          {articles.map((p) => (
            <OwnPost key={p.id} post={p} reloadFlag={setArticleFlag} />
          ))}
        {/* <OwnPost post ={articles} /> */}
      </FeedWrapper>
    </FeedContainer>
    </>
  )
};

export default Profile;
