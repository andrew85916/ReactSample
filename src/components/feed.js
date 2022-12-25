import Post from "./post";
import Share from "./share";
import { Posts } from "./dummyData";
import styled from "@emotion/styled";
import { useEffect,useState } from "react";

const FeedContainer = styled.div`
    // flex:5.5;
    display: flex;
    align-items: center;
    justify-content: center;

`  
const FeedWrapper = styled.div`
    padding: 20px;
    
`
export default function Feed() {
  
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
    setArticles(responseJSON)
  }
  
  useEffect(()=>{
    fetchArticles()
  },[])
  
  return (
    <FeedContainer>
      <FeedWrapper>
        <Share />
        {articles.map((p) => (
          <Post post={p} />
        ))}
        <Post post ={articles} />
      </FeedWrapper>
    </FeedContainer>
  );
}
