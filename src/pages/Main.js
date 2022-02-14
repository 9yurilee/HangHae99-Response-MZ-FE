import React from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { history } from "../redux/configStore";
import post, { actionCreators as postActions } from "../redux/modules/post";
import Post from "../component/Post";
// import Button from '../element/Button';

const Main = () => {
  // const dispatch = useDispatch();
  // const [_post, set_Post] = React.useState([]);
  // const post_list = useSelector((state) => state.post.list);
  // console.log(post_list);

  return (
    <>
      <Post />
      {/* {_post &&
        post_list.map((p, i) => {
          return <Post key={p.id} {...p} />;
        })} */}
    </>
  );
};

export default Main;
