import React from "react";
import { Grid, Input, Button } from "../element";
import { actionCreators as commentActions } from "../redux/modules/comment";
import { useDispatch, useSelector } from "react-redux";
import { history } from "../redux/configStore";
import {getCookie} from "../shared/Cookie"
import styled from "styled-components";

const CommentWrite = (props) => {
  const dispatch = useDispatch();
  const [content, setContent] = React.useState();
  const {article_id} = props;

  let is_login = getCookie("is_login");
  is_login =  document.cookie.split("=")[1];
  
  const onChange = (e) => {
    setContent(e.target.value);
  };

  const write = () => {
    if (is_login === null) {
      window.alert(
        "로그인이 필요한 서비스입니다!"
      )
      history.replace("/login")
      return
    }

    dispatch(commentActions.addCommentDB(article_id, content))
    setContent("")
    window.alert("댓글 작성이 완료되었습니다!")
    window.location.replace("/")
  }

  return (
    <CommentW>
      <Grid padding="16px" is_flex_center>
        <Input
          placeholder="댓글 내용을 입력해주세요 :)"
          _onChange={onChange}
          value={content}
          onSubmit={write}
          is_submit
          width="480px"
        />
        <Button width="80px" padding="18px 0" margin="0px 0px 0px 15px" size="16px" _onclick={write}>
          작성
        </Button>
      </Grid>
    </CommentW>
  );
};

const CommentW = styled.div`
  input{
    border-radius: 5px; padding: 15px 10px; background-color: transparent; border: 2px solid #418b8f; outline-color: #1f969c; letter-spacing: 1px; background-color: #fff;
  }
`;

export default CommentWrite;