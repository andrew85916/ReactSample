// import "./share.css";
// import { PermMedia, Label, Room, EmojiEmotions } from "@material-ui/icons";

import styled from "@emotion/styled";
import { useEffect, useState } from "react";
const ShareContainer = styled.div`
  width: 100%;
  height: 170px;
  border-radius: 10px;
  -webkit-box-shadow: 0px 0px 16px -8px rgba(0, 0, 0, 0.68);
  box-shadow: 0px 0px 16px -8px rgba(0, 0, 0, 0.68);
`
const ShareWrapper = styled.div`
  padding: 10px;
`
const ShareTop = styled.div`
  display: flex;
  // align-items: center;
  flex-direction: column;
` 

const ShareUsername = styled.span`
  font-size: 20px;
  // font-weight: 500;
  margin-left: 10px;
`



const ShareInput= styled.textarea`
  border: none;
  // width: 80%;
  outline: none;
  margin-right: 10px;
  margin-left: 10px;
  resize:none;
` 
const ShareHeader = styled.hr`
  margin: 10px;
` 

const ShareBottom = styled.div `
  display: flex;
  align-items: center;
  justify-content: space-between;
`
const ShareButton = styled.button`
  border: none;
  padding: 7px;
  border-radius: 5px;
  background-color: green;
  font-weight: 500;
  margin-right: 10px;
  cursor: pointer;
  color: white;
`

const fetchPostArtictle = (content) => {
  const token = localStorage.getItem("token");
  return fetch("http://localhost:8080/api/post_article", {
    method: "POST",
    headers: { 
      "Content-Type": "application/json",
      "authorization":`Bearer ${token}`,
     },
    body: JSON.stringify({
      content,
    })
  });
};

// const  fetchUserName =  async ()=>{
//   const token = localStorage.getItem("token");
//   return  await  axios("http://localhost:8080/api/get_username", {
//     method: "GET",
//     headers: { 
//       // "Content-Type": "application/json",
//       "authorization":`Bearer ${token}`,
//     }
//   });
// }


export default function Share(props) {

  const [author, setAuthor] = useState("")
  const [content, setContent] = useState("");
  
  useEffect(()=>{
    const fetchUsername = async ()=>{
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:8080/api/get_username", {
        method: "GET",
        headers: { 
          "Content-Type": "application/json",
          "authorization":`Bearer ${token}`,
         },
      })
      const responseJSON = await response.json()
      setAuthor(responseJSON.username)
      // console.log(responseJSON)
    }
    fetchUsername()

  },[])


  const submit = async (e) => {
    e.preventDefault();
    const response= await fetchPostArtictle (content);
    // console.log(response)
    if (response.ok === true) {
      setContent("")
    }
    props.reloadFlag(false)
    
  };
  


  return (
    <ShareContainer>
      <ShareWrapper> 
        <ShareTop>
          <ShareUsername>{author}</ShareUsername>
          {/* <ShareProfileImg/> */}
          <ShareInput cols={50} rows={5} maxLength={256}  placeholder="What happening?" value={content} onChange={(e) => setContent(e.target.value)}/>
        </ShareTop>
        <ShareHeader/>
        <ShareBottom>
          <div></div>
          <ShareButton onClick={submit}>
            Share
          </ShareButton>
          
        </ShareBottom>
        
      </ShareWrapper>
    </ShareContainer>
  );
}

{/* <Input
placeholder="Name"
required
onChange={(e) => setUsername(e.target.value)}
/> */}