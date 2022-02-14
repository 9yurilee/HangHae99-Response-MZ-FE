import React from "react";
import Post from "../component/Post";
import Button from '../element/Button';
import { useHistory } from "react-router-dom";

const Main = () => {
    const history = useHistory();
    return (
        <>
        <div>나는 규리</div>
            <Post />
        </>
    )
}

export default Main;