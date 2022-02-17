import React, {useRef} from "react";
import { useSelector, useDispatch } from "react-redux";

import { Button, Grid, Image, Text, Input } from "../element/index";
import Upload from "../shared/Upload";
import { api, api_post } from "../shared/api";
import axios from "axios";

import { history } from "../redux/configStore";
import { actionCreators as imageActions } from "../redux/modules/image";
import { actionCreators as postActions } from "../redux/modules/post";

const PostWrite = (props) => {
  const dispatch = useDispatch();
  const { history } = props;
  const user_id = useSelector((state) => state.user_id);
  const post_id = props.match.params.id;

  const post = useSelector((state) => state.post.post);

  const post_list = useSelector((state) => state.post.list);

  const _post_id = props.match.params.post_id;
  const is_edit = _post_id ? true : false;
  let _post = is_edit ? post_list.find((p) => p.id === _post_id) : null;

  const [title, setTitle] = React.useState("");
  const [year, setYear] = React.useState();
  const [content, setContent] = React.useState(_post ? _post.content : "");

  const is_login = useSelector((state) => state.user.is_login);
  // const preview = useSelector((state) => state.image.preview);

  const img_url = useSelector((state) => state.post.img_url);
  console.log(img_url)

  const [fileImage, setFileImage] = React.useState(
   img_url !== '' && is_edit
      ? img_url
      : 'https://w7.pngwing.com/pngs/767/518/png-transparent-color-vantablack-light-graphy-white-paper-blue-white-text-thumbnail.png'
  );
  console.log(post.img_url)

  const saveFileImage = (e) => {
    const img = e.target.files[0];
    console.log(img)
    const formData = new FormData();
    formData.append('image', img);
    console.log(formData); // FormData {}
    for (const keyValue of formData) console.log(keyValue);
    dispatch(postActions.imageAPI(formData));

    setFileImage(URL.createObjectURL(e.target.files[0]));
  };

  const changeImage = (e) => {
    setFileImage(e.target.value)
  }
  React.useEffect(() => {
    api_post.get('/articles',{}
      ).then(function (res) {
        console.log(res.data)
      setFileImage(res.data.post.img_url);
    })}, []);

  const changeContent = (e) => {
    setContent(e.target.value);
    console.log(e.target.value);
  };

  const changeTitle = (e) => {
    setTitle(e.target.value);
    console.log(e.target.value);
  };

  const is_checked = (e) => {
    if (e.target.checked) {
      setYear(e.target.value);
      console.log(e.target.value);
    }
  };

  const addPost = () => {
    dispatch(postActions.addPostFB(img_url, title, year, content));
    console.log(img_url, title, year, content)
    console.log("add post 완료?!")
  }

  const editPost = () => {
    dispatch(postActions.editPostFB(post_id, img_url, title, year, content));
    console.log("edit dispatch 완료")

  };
  // // 새로고침 시 데이터 유지
  // React.useEffect(() => {
  //   dispatch(postActions.getOnePostAPI(_post_id));
  // }, []);

  // if (!is_login) {
  //   return (
  //     <Grid margin="200px" padding="16px" center>
  //       <Text size="30px" bold>
  //         잠깐✋🏻
  //       </Text>
  //       <Text size="24px">로그인 후에만 글 작성이 가능합니다!</Text>
  //       <Button
  //         _onclick={() => {
  //           history.replace("/login");
  //         }}
  //         text="로그인 하러가기"
  //       ></Button>
  //     </Grid>
  //   );
  // }

  return (
    <>
      <Text margin="100px" size="36px" bold>
        {is_edit ? '게시글 수정' : '게시글 작성'}
      </Text>
      <Grid margin="100px auto" width="700" height="500">
        <Grid is_flex borderRadius="10">
          <Image
            width="350"
            height="400"
            _onChange={changeImage}
            src={
              img_url
              ? img_url
              : ''}
            //   preview
            //     ? preview
            //     : "https://cdn1.vectorstock.com/i/1000x1000/50/20/no-photo-or-blank-image-icon-loading-images-vector-37375020.jpg"
            
            margin="20px 5px"
          />
          <Grid height="300">
            {/* <Upload /> */}
            <Input type="file" _onChange={saveFileImage}/>
            <Text text="타이틀"></Text>{" "}
            <Input type="text" _onChange={changeTitle} />
            <Text
              bold
              // margin="0px 0px 10px 0px"
              padding="0px 0px 10px"
              textAlign="left"
              bg="#59c1c2"
              text="추억의 연도"
            />
            <Grid display="inline-box" alignItems="center">
              <input
                type="radio"
                name="year"
                value="1980"
                id="1980"
                onChange={is_checked}
              />
              80년대 추억
              <input
                type="radio"
                name="year"
                value="1990"
                id="1990"
                onChange={is_checked}
              />{" "}
              90년대 추억
              <input
                type="radio"
                name="year"
                value="2000"
                id="2000"
                onChange={is_checked}
              />{" "}
              2000년대 이후 추억
            </Grid>
            <Grid>
              <Text
                bold
                paddingTop="30px"
                bg="#59c1c2"
                textAlign="left"
                text="게시물 내용"
              />
              <Input _onChange={changeContent} />
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
            _onclick={() => history.push("/")}
          ></Button>
          <Grid padding="25px">
            {is_edit ? (
              <Button
              text="수정완료"             
              width="120px"
              height="50px"
              color="white"
              bg="#f47b6a"
              // _onChange={onChange}
              _onclick={editPost}
              />
            ) : (
              <Button
              text="게시글 작성"             
              width="120px"
              height="50px"
              color="white"
              bg="#f47b6a"
              // _onChange={onChange}
              _onclick={() => {addPost()}}/>
            )}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default PostWrite;
