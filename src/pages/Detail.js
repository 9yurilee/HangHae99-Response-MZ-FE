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
  const post_idx = post_list.findIndex((p) => p.post_id === id);
  console.log(props.post_id);
  console.log(post_idx);
  const post_data = post_list[post_idx];
  console.log(post_data);

  const [post, setPost] = React.useState(post_data ? post_data : null);

  return (
    <React.Fragment>
      <Text margin="85px 0px 0px 0px" bold size="24px">
        상세페이지
      </Text>
      <Grid margin="120px auto">
        <Grid
          bg="#59c1c2"
          margin="15px auto"
          width="700"
          is_flex
          position="relative"
        >
          <Image
            width="350"
            height="300"
            src={post_list.image_url}
            margin="20px 5px"
          />
          <Text minWidth="300px" bg="#59c1c2" margin="0px 20px">
            <Text>{post_list.user_id}</Text>
            <Text>{post_list.insert_dt}</Text>
            <Text height="300">{post_list.contents}</Text>
          </Text>
        </Grid>
      </Grid>
    </React.Fragment>
    // <Grid width="700" margin="auto">
    //   {/* {post && ( */}
    //     <>

    //       <Post />
    //       {/* <Post {...post} is_me={post.user_info.user_id === user_info?.uid} /> */}
    //     </>
    //   {/* } */}
    // </Grid>
  );
};

export default Detail;
