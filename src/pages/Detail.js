import React from "react";
import Post from "../component/Post";
import styled from "styled-components";
import { useHistory } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import Image from "../element/Image";
// import { history } from "../redux/configStore";
import { Button, Grid, Input, Text } from "../element/index";
import CommentList from '../component/CommentList';
import CommentWrite from '../component/CommentWrite';
import { actionCreators as postActions } from "../redux/modules/post";

const Detail = (props) => {
  // const {history} = props;
  // const history = useHistory();
  const dispatch = useDispatch();
  const post_list = useSelector((state) => state.post.list);

  const id = props.match.params.post_id;
  const post_idx = post_list.findIndex((p) => p.post_id === id);
  console.log(post_idx);
  const post_data = post_list[post_idx];
  console.log(post_data);

  const [post, setPost] = React.useState(post_data ? post_data : null);

  return (
    <>
      {post && (
        <>
          <Text bold size="24px">
            상세페이지
          </Text>
          <Post {...post} />
          <CommentBox>
            <CommentList></CommentList>
            <CommentWrite></CommentWrite>
          </CommentBox>
        </>
      )}
    </>
    // <Post {...post} is_me={post.user_info.user_id === user_info?.uid} />
  );
};

const CommentBox = styled.div`
  width: auto;
  height: auto;
  box-sizing: border-box;
  padding: 25px;
  background-color: #59c1c2;
  border: 8px solid #1f969c;
`;

export default Detail;
