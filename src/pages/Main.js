import React, {useState} from "react";
import { useSelector, useDispatch } from "react-redux";

import { history } from "../redux/configStore";
import post, { actionCreators as postActions } from "../redux/modules/post";

import Grid from "../element/Grid";
import Post from "../component/Post";
import { api } from "../shared/api";

const Main = (props) => {
  const { history } = props;
  const dispatch = useDispatch();
  const post_list = useSelector((state) => state.post.list);

  React.useEffect(() => {
    if (post_list.length === 0) {
      dispatch(postActions.getPostFB());
    }
  }, []);

  return (
    <React.Fragment>
      {post_list.map((p, idx) => {
        return (
          <Grid bg="#e3b3af" padding="50px 20px" borderRadius="10px" key={idx}>
            <Post  {...p} />
          </Grid>
        );
      })}
    </React.Fragment>
  );
};

export default Main;
