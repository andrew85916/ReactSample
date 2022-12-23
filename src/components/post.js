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
const PostTopLeft = styled.div`
  display: flex;
  align-items: center;
`
const PostUsername = styled.span`
  font-size: 20px;
  // font-weight: 500;
  margin-left: 10px;
`
const PostCenter = styled.div`
margin-right: 10px;
margin-left: 10px;
`
const PostImg = styled.img`
  margin-top: 20px;
  width: 100%;
  max-height: 500px;
  object-fit: contain;
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
const LikeIcon = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 5px;
  cursor: pointer;
`
const PostLikeCounter = styled.span`
  font-size: 15px;
`

export default function Post({ post }) {

  return (
    <PostContainer>
      <PostWrapper>
        <PostTop>
          <PostTopLeft>
            <PostUsername>
              {post.author}
            </PostUsername>
          </PostTopLeft>
        </PostTop>
        <PostCenter>
          <span> {post.content}</span>
        </PostCenter>
        <PostBottom>
          <PostBottomLeft>
          </PostBottomLeft>
          <PostBottomRight>
          </PostBottomRight>
        </PostBottom>
        </PostWrapper>
      </PostContainer> 
  );
}
