import React from "react";
import Post from "../component/Post";
import { useHistory } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import Image from "../element/Image";
// import { history } from "../redux/configStore";
import { Button, Grid, Input, Text, CommentsList } from "../element/index";
import { actionCreators as postActions } from "../redux/modules/post";

const Detail = (props) => {
  // const {history} = props;
  // const history = useHistory();
  const dispatch = useDispatch();
  const post_list = useSelector((state) => state.post.list);
  console.log(post_list);

  const id = props.match.params.post_id;
  console.log(props);
  const post_idx = post_list.findIndex((p) => p.id === props.post_id);
  console.log(props.post_id)
  console.log(post_idx);
  const post_data = post_list[post_idx];
  console.log(post_data);


  const [post, setPost] = React.useState(post_data? post_data : null);

  // React.useEffect(() => {
  //   dispatch(postActions)})

  return (
    <Grid width="700" margin="auto">
      {/* {post && ( */}
        <>
          <Text margin="85px 0px 0px 0px"bold size="24px">
            상세페이지
          </Text>
          <Post />
          {/* <Post {...post} is_me={post.user_info.user_id === user_info?.uid} /> */}
        </>
      {/* } */}
    </Grid>
  );
};

export default Detail;
