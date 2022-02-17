import React from "react";

import styled from "styled-components";
import { useHistory } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import Image from "../element/Image";
import { Button, Grid, Input, Text } from "../element/index";

import Post from "../component/Post";
import CommentList from "../component/CommentList";
import CommentWrite from "../component/CommentWrite";

import axios from "axios";

import { actionCreators as postActions } from "../redux/modules/post";
import { history } from "../redux/configStore";
import { api } from "../shared/api";

const Detail = (props) => {
  const dispatch = useDispatch();
  const post_list = useSelector((state) => state.post.list);
  const user_info = useSelector((state) => state.user.user);
  console.log(user_info);
  const id = props.match.params.post_id;
  const post_idx = post_list.findIndex((p) => p.post_id === id);
  console.log(post_idx);
  const post_data = post_list[post_idx];
  console.log(post_data);

  const [post, setPost] = React.useState(post_data ? post_data : null)

  const onDelete = async function() {
    if(window.confirm("delete?")){
      dispatch(postActions.deletePostFB(post_data.post_id))
      console.log("삭제")
    }
  }

  return (
    <>
      {post && (
        <Grid>
           <Text bold size="24px">
            상세페이지
          </Text>
          <Post {...post} is_me={post_data.user_id === post_data?.id} />

          <Grid is_flex_center>
            <Button
              text="수정"
              width="auto"
              padding="4px"
              margin="4px"
              _onclick={() => {
                history.push(`/postwrite/${post_data.post_id}`);
              }}
            />
            <Button
              text="삭제"
              width="auto"
              padding="4px"
              margin="4px"
              _onclick={onDelete}
            />
          </Grid>
          {props.is_me && (
              <Grid>
                <Button
                  text="수정"
                  width="auto"
                  padding="4px"
                  margin="4px"
                  _onclick={() => {
                    history.push(`/write/${props.id}`);
                  }}
                />
                <Button
                  text="삭제"
                  width="auto"
                  padding="4px"
                  margin="4px"
                  // _onclick={onDelete}
                />
              </Grid>
            )}
          <Comment>
            <CommentBox>
              <CommentList article_id={id}></CommentList>
              <CommentWrite article_id={id}></CommentWrite>
            </CommentBox>
          </Comment>
        </Grid>
        
      )}
    </>
  );
};

const Comment = styled.div`
  padding: 0 20%;
`;

const CommentBox = styled.div`
  width: auto;
  height: auto;
  box-sizing: border-box;
  padding: 25px;
  background-color: #59c1c2;
  border: 8px solid #1f969c;
  width: auto;
  height: auto;
  box-sizing: border-box;
  padding: 25px;
  background-color: #59c1c2;
  border: 8px solid #1f969c;
`;

export default Detail;