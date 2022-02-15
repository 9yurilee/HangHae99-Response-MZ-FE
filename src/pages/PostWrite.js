import React from "react";
import { actionCreators as postActions } from "../redux/modules/post";
import { useSelector, useDispatch } from "react-redux";
import { Button, Grid, Image, Text, Input } from "../element/index";
import Upload from '../shared/Upload';
import { history } from "../redux/configStore";
import { actionCreators as imageActions } from '../redux/modules/image';

const PostWrite = (props) => {
  const dispatch = useDispatch();
  const { history } = props;

  const is_login = useSelector((state) => state.user.is_login);
  const preview = useSelector((state) => state.image.preview);
  const title = useSelector((state) => state.post.title);
  const user_id = useSelector((state) => state.user_id);
  const year = useSelector((state) => state.year);

  // const post_list = useSelector((state) => state.post.list);
  //_post_id 어케 받아올지 생각
  // const _post_id = props.match.params.post_id
  // console.log(props)
  // const is_edit = _post_id ? true : false;
  // let _post = is_edit ? post_list.find((p) => p.id === _post_id) : null;
  // const [contents, setContents] = React.useState(_post ? _post.contents : '');
  const [contents, setContents] = React.useState("");

  const changeContents = (e) => {
    setContents(e.target.value);
    console.log(e.target.value);
  };

  const addPost = (image, title, user_id, year, contents) => {
    dispatch(postActions.addPostFB())
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
              preview
                ? preview
                : 'https://cdn1.vectorstock.com/i/1000x1000/50/20/no-photo-or-blank-image-icon-loading-images-vector-37375020.jpg'
            }
            margin="20px 5px"
          />
          <Grid height="300">
            <Upload />
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
