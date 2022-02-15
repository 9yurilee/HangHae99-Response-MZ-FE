import React from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { history } from "../redux/configStore";
import post, { actionCreators as postActions } from "../redux/modules/post";
import Grid from "../element/Grid";
import Post from "../component/Post";

const Main = (props) => {
  const { history } = props;
  const dispatch = useDispatch();
  const post_list = useSelector((state) => state.post.list);
  console.log(post_list);

  React.useEffect(() => {
    if (post_list.length === 0) {
      dispatch(postActions.getPostFB());
    }
  }, []);

  return (
    <React.Fragment>
      {post_list.map((p, idx) => {
        return (
          <Grid key={idx}>
            <Post  {...p} />
          </Grid>
        );
      })}
    </React.Fragment>
  );
};

export default Main;
