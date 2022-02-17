import { useSelector } from "react-redux";

import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { getCookie, setCookie, deleteCookie } from "../../shared/Cookie";
import { api, api_post } from "../../shared/api";
import axios from "axios";
// import moment from 'moment';

const SET_POST = "SET_POST";
const GET_POST = "GET_POST";
const ADD_POST = "ADD_POST";
const EDIT_POST = "EDIT_POST";
const DELETE_POST = "DELETE_POST";

const IMAGE_URL = "IMAGE_URL";

const setPost = createAction(SET_POST, (post_list) => ({ post_list }));
const getPost = createAction(GET_POST, (post_list) => ({ post_list }));
const addPost = createAction(ADD_POST, (post) => ({ post }));
const editPost = createAction(EDIT_POST, (post) => ({ post }));
const deletePost = createAction(DELETE_POST, (post_id) => ({ post_id }));

const getImageUrl = createAction(IMAGE_URL, (img_url) => ({ img_url }));

const initialState = {
  list: [],
  post: [],
  img: "http://www.ipon.co.kr/common/img/default_profile.png",
};

const initialPost = {
  user_info: {
    user_id: "user_id",
  },
  post_id: "post_id",
  title: "initialPost의 title",
  img_url: "http://www.ipon.co.kr/common/img/default_profile.png",
  content: "기본 콘텐츠222",
  year: 2022,
};

const getPostFB = () => {
  return function (dispatch, getState, { history }) {
    api
      .get("/articles", {})
      .then(function (response) {
        const postDB = response.data.articles;

        const post_list = [];
        postDB.forEach((p, i) => {
          let list = {
            user_id: p.user_id,
            title: p.title,
            post_id: p.id,
            year: p.year,
            image: p.image,
            content: p.content,
            date: p.date,
          };
          post_list.push(list);
        });
        dispatch(getPost(post_list));
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};

const addPostFB = (img_url = "", title, year, content) => {
  return function (dispatch, getState, { history }) {
    const accessToken = document.cookie.split("=")[1];

    const formData = new FormData();
    formData.append("image", img_url);
    formData.append("title", title);
    formData.append("year", year);
    formData.append("content", content);

    console.log(formData);
    axios
      .post("/articles", formData, {
        headers: {
          Authorization: `${accessToken}`,
        },
      })
      .then(function (response) {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
        return;
      });
    //   };
    // };
  };
};

const editPostFB = (post_id, preview, title, year, content) => {
  return async function (dispatch, useState, { history }) {
    const accessToken = document.cookie.split("=")[1];

    api_post.post(
      `/articles/${post_id}`,
      { post_id, preview, title, year, content },
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    console.log("수정중").then(function (res) {
      console.log("수정완료!");
      // history.replace('/');
    });
  };
};

const deletePostFB = (post_id = null) => {
  return function (dispatch, getState, { history }) {
    const _post_idx = getState().post.list.findIndex(
      (p) => p.post_id === post_id
    );
    api
      .delete(`/articles/${post_id}`, {})
      .then(function (response) {
        console.log(response);
        dispatch(deletePost(_post_idx));
        window.location.reload();
      })
      .catch((error) => {
        console.error(error);
      });
  };
};

const imageAPI = (file) => {
  for (const keyValue of file) console.log(keyValue);
  return async function (dispatch, useState, { history }) {
    api_post.post("/articles", file).then(function (res) {
      console.log(res.data.img_url);
      dispatch(getImageUrl(res.data.img_url));
    });
  };
};

export default handleActions(
  {
    [GET_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list = action.payload.post_list;
      }),
    [ADD_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list.unshift(action.payload.post);
        console.log(action.payload.post);
      }),
    [DELETE_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list = draft.list.filter(
          (p) => p.post_id !== action.payload.post_id
        );
      }),
    [IMAGE_URL]: (state, action) =>
      produce(state, (draft) => {
        draft.img = action.payload.img_url;
      }),
  },
  initialState
);

const actionCreators = {
  setPost,
  getPost,
  addPost,
  getPostFB,
  addPostFB,
  editPostFB,
  deletePostFB,
  imageAPI,
};

export { actionCreators };
