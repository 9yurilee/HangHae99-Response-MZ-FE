import React from "react";
import { useSelector, useDispatch } from 'react-redux';

import { history } from '../redux/configStore';
import post, { actionCreators as postActions } from '../redux/modules/post';
import Post from "../component/Post";
// import Button from '../element/Button';

const Main = () => {
    const dispatch = useDispatch();
    const post_list = useSelector((state) => state.post.list) 
    console.log(post_list);
    return (
        <>
            {/* <Post /> */}
            {/* post항목이 있다면? props로 넘겨야함! 그 과정 작업 */}
            {post_list.map((p, i) => {
                return <Post key={p.id} {...p}/> 
            })}
        </>
    )
}

export default Main;