import React, { useEffect, useRef, useState } from "react";
import Post from "../component/Post";
import { actionCreators as postActions } from "../redux/modules/post";
import { useSelector, useDispatch } from "react-redux";
import { Button, Grid, Image, Text, Input } from "../element/index";
import { useHistory } from "react-router-dom";
import { history } from "../redux/configStore";

const PostWrite = (props) => {
  const dispatch = useDispatch();
  const { history } = props;

  const is_login = useSelector((state) => state.user.is_login);
  console.log(is_login)
  // // const preview = useSelector((state) => state.image.preview);
  const post_list = useSelector((state) => state.post.list);
  console.log(post_list);

  // const _post_id = props.match.params.post_id
  // const is_edit = _post_id ? true : false;

  // let _post = is_edit ? post_list.find((p) => p.id === _post_id) : null;
  // const [contents, setContents] = React.useState(_post ? _post.contents : '');
  const [contents, setContents] = React.useState("");
  const changeContents = (e) => {
    setContents(e.target.value);
  };

  const addPost = () => {
    dispatch(postActions.addPostFB(contents))
    history.push("/")
  };

  // const editPost = () => {
  //   dispatch(postActions.editPostFB(post_id, { contents: layout  }));
  // };

  if (!is_login) {
    return (
      //margin 왜 안먹냐 ?_?
      <Grid margin="200" padding="16px" center>
        <Text size="30px" bold>
          잠깐✋🏻
        </Text>
        <Text size="24px">로그인 후에만 글 작성이 가능합니다!</Text>
        <Button
          _onClick={() => {
            history.replace("/login");
          }}
          text="로그인 하러가기"
        ></Button>
      </Grid>
    );
  }

  return (
    <React.Fragment>
      <Text margin="85px 0px 0px 10px" size="36px" bold>게시물 작성
          {/* {is_edit ? '게시글 수정' : '게시글 작성'} */}
        </Text>
      <Grid margin="90px auto" width="700" height="500">
        <Grid is_flex borderRadius="10">
          <Image
            width="350"
            height="400"
            src={
              "https://ilovecharacter.com/news/data/20210122/p179568629887999_597.jpg"
            }
            margin="20px 5px"
          />
          <Grid height="300">
            <Input type="file" _onChange={changeContents} />
            <Text text="타이틀"></Text> <Input type="text" _onChange={changeContents}/>
            <Text
              bold
              // margin="0px 0px 10px 0px"
              padding="0px 0px 10px"
              textAlign="left"
              bg="#59c1c2"
              text="추억의 연도"
            />
            <Grid display="flex" alignItems="center">
              <input
                style={{ background: "#59c1c2", margin: "5px" }}
                type="radio"
                name="year"
                value="80s"
                id="80s"
              />{" "}
              1980년대
              <input type="radio" name="year" value="90s" id="90s" /> 1990년대
              <input type="radio" name="year" value="2000s" id="2000s" />{" "}
              2000년대
            </Grid>
            <Grid>
              <Text
                bold
                paddingTop="30px"
                bg="#59c1c2"
                textAlign="left"
                text="게시물 내용"
              />
              <Input _onChange={changeContents}/>
            </Grid>
          </Grid>
        </Grid>
        <Grid is_flex>
          <Button
            width="120px"
            height="50px"
            color="white"
            bg="#f47b6a"
            text="돌아가기"
            _onClick={() => history.push("/")}
          ></Button>
          <Button
            width="120px"
            height="50px"
            color="white"
            bg="#f47b6a"
            text="작성하기"
            _onClick={addPost}
          ></Button>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default PostWrite;
