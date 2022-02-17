import React from "react";
import {Grid, Text, Button} from "../element/index";
import {useDispatch, useSelector} from "react-redux";
import {actionCreators as commentActions} from "../redux/modules/comment";

const CommentList = (props) => {
  const dispatch = useDispatch();
  const comment_list = useSelector(state => state.conmment.list);
  const user_id = useSelector(state => state.user.user.user_id);

  const {article_id} = props;
  
  React.useEffect(() => {
    if(!comment_list[article_id]){
      dispatch(commentActions.getCommentDB(article_id));
    }
  }, []);
  
  if(!comment_list[article_id] || !article_id){
    return null;
  }

  return (
    <React.Fragment>
      <Grid padding="15px" border="2px solid #1f969c">
        {
          comment_list[article_id].map(c => {
            return <CommentItem key={c.id} {...c} is_me={c.user_id === user_id}></CommentItem>
          })
        }
      </Grid>
    </React.Fragment>
  );
};

CommentList.defaultProps = {
  article_id: null,
  is_me: false,
}

export default CommentList;


const CommentItem = (props) => {
    const dispatch = useDispatch();
    const {content, date, comment_id, article_id} = props;

    const deleteComment = () => {
      dispatch(commentActions.deleteCommentDB(article_id, comment_id))
      window.alert("댓글이 삭제됐습니다!");
      window.location.replace("/")
    }

    return (
        <Grid is_flex_center>
            <Grid width="auto">
                <Text letter bold size="18px">익명</Text>
            </Grid>
            <Grid is_flex_center>
                <Text margin="0 0 0 25px" letter size="17px" minWidth="380px">{content}</Text>
                <Text margin="0 0 0 30px" size="12px">{date}</Text>
            </Grid>
            {
              props.is_me ? <Button width="100px" _onclick={deleteComment}>삭제</Button> : null
            }
        </Grid>
    )
}

CommentItem.defaultProps = {
    content: "귀여운 고양이!",
    date: '2022-02-16 03:32'
}