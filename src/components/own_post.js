import {useState } from "react";
import styled from "@emotion/styled";

const PostContainer = styled.div`
  width: 100%;
  border-radius: 10px;
  -webkit-box-shadow: 0px 0px 16px -8px rgba(0, 0, 0, 0.68);
  box-shadow: 0px 0px 16px -8px rgba(0, 0, 0, 0.68);
  margin: 30px 0;
`
const PostWrapper = styled.div`
  padding: 10px;
`
const PostTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`
const PostTopRight = styled.div`
  display: flex;
  align-items: center;
`
const PostUsername = styled.span`
  font-size: 20px;
  margin-left: 10px;
`
const PostCenter = styled.div`
`
const PostBottom = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`
const PostBottomLeft = styled.div`
  display: flex;
  align-items: center;   
`
const PostBottomRight = styled.div`
  // display: flex;
  // align-items: center;
  width:50px;
  // margin-right: 10px;
`
const ShowArticle = styled.span`
  margin-right: 10px;
  margin-left: 10px;
`
const PostLikeCounter = styled.span`
  font-size: 15px;
`
const DeleteButton = styled.img`
    width: 20px;
    height: 20px;
    margin-right: 5px;
   ursor: pointer;
`
const EditButton = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 5px;
  ursor: pointer;
`
const SubmitEditButton = styled.button`
  border: none;
  padding: 7px;
  border-radius: 5px;
  background-color: green;
  font-weight: 500;
  margin-right: 10px;
  cursor: pointer;
  color: white;
`
const EditInput  = styled.textarea`
  border: none;
  outline: none;
  margin-right: 10px;
  margin-left: 10px;
  resize:none;
`
const ShareHeader = styled.hr`
  margin: 10px;
` 

export default function OwnPost(props) {
  const [content, setContent] = useState(props.post.content)
  const [edit, setEdit] = useState(false)

  const handlerDelete = (id) =>{ 
    console.log(id)
    const token = localStorage.getItem("token");
    fetch("http://localhost:8080/api/delete_article",{
        method: "DELETE",
        headers: { 
          "Content-Type": "application/json",
          "authorization":`Bearer ${token}`,
         },
         body: JSON.stringify({
            "id":id,
        })
    });
    props.reloadFlag(false)
  }

  const handlerEditText = (e) =>{ 
    e.preventDefault();
    const token = localStorage.getItem("token");
    fetch("http://localhost:8080/api/update_article",{
        method: "PUT",
        headers: { 
          "Content-Type": "application/json",
          "authorization":`Bearer ${token}`,
         },
         body: JSON.stringify({
            "id":props.post.id,
            "content": content,
        })
    });
    props.reloadFlag(false)
    setEdit(false)
  }

  const handlerEdit = ()=>{
    if (edit===true){
      setEdit(false)
    }else{
      setEdit(true)
    }

  }

  return (
    <PostContainer>
      <PostWrapper>
        <PostTop>
            <PostUsername>
              {props.post.author}
            </PostUsername>
            <div>
              <EditButton
                src={require('../icons/edit.png')}
                 onClick={()=>handlerEdit()} 
              />
              <DeleteButton
                  src={require('../icons/close.png')}
                 onClick={()=>handlerDelete(props.post.id )} 
              />
            </div>

        </PostTop>
        <PostCenter>
          <div>
          {edit ?  
            <EditInput cols={50} rows={5} maxLength={256}  placeholder="What happening?" value={content} onChange={(e) => setContent(e.target.value)}/>:
            <ShowArticle>{props.post.content}</ShowArticle>
          }
          </div>
        </PostCenter>
        {edit ?  
            <ShareHeader/>:
            <></>
        }
        <PostBottom>
          <PostBottomLeft/>
          <PostBottomRight>
            {edit ?
              <SubmitEditButton onClick={handlerEditText}>Edit</SubmitEditButton>:
              <></>
            }
          </PostBottomRight>
        </PostBottom>
        </PostWrapper>
      </PostContainer> 
  );
}
