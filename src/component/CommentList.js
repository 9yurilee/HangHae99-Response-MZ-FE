import React from "react";
import {Grid, Text} from "../element/index";

import {useDispatch, useSelector} from "react-redux";
// import {actionCreators as commentActions} from "../redux/modules/comment";

const CommentList = (props) => {
  // const dispatch = useDispatch();
  // const comment_list = useSelector(state => state.comment.list);

  // const {post_id} = props;

  // React.useEffect(() => {

  //   if(!comment_list[post_id]){
  //     dispatch(commentActions.getCommentFB(post_id));
  //   }
  // }, []);
  
  // if(!comment_list[post_id] || !post_id){
  //   return null;
  // }

  return (
    <React.Fragment>
      <Grid padding="15px" border="2px solid #1f969c">
        <CommentItem></CommentItem>
      </Grid>
    </React.Fragment>
  );
};

CommentList.defaultProps = {
  post_id: null,
}

export default CommentList;


const CommentItem = (props) => {
    const {user_id, post_id, contents, insert_dt} = props;
    return (
        <Grid is_flex_center>
            <Grid width="auto">
                <Text letter bold size="18px">익명</Text>
            </Grid>
            <Grid is_flex_center>
                <Text margin="0 0 0 25px" letter size="17px" minWidth="380px">{contents}</Text>
                <Text margin="0 0 0 30px" size="12px">{insert_dt}</Text>
            </Grid>
        </Grid>
    )
}

CommentItem.defaultProps = {
    user_id: "",
    post_id: 1,
    contents: "귀여운 고양이!",
    insert_dt: '2022-02-16 03:32:18'
}