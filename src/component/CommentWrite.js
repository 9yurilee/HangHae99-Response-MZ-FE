import React from "react";
import { Grid, Input, Button } from "../element";
import { actionCreators as commentActions } from "../redux/modules/comment";
import { useDispatch, useSelector } from "react-redux";
import { history } from "../redux/configStore";
import {getCookie} from "../shared/Cookie"

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

  }

  return (
    <React.Fragment>
      <Grid padding="16px" is_flex_center>
        <Input
          placeholder="댓글 내용을 입력해주세요 :)"
          _onChange={onChange}
          value={content}
          onSubmit={write}
          is_submit
          width="420px"
        />
        <Button width="100px" margin="0px 2px 0px 2px" _onclick={write}>
          작성
        </Button>
      </Grid>
    </React.Fragment>
  );
};

export default CommentWrite;