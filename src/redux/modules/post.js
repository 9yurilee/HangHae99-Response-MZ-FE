import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { getCookie, setCookie, deleteCookie } from "../../shared/Cookie";
import { api, api_post } from "../../shared/api";
// import moment from 'moment';

const SET_POST = "SET_POST";
const GET_POST = "GET_POST";
const ADD_POST = "ADD_POST";

const setPost = createAction(SET_POST, (post_list) => ({ post_list }));
const getPost = createAction(GET_POST, (post_list) => ({ post_list }));
const addPost = createAction(ADD_POST, (post) => ({ post }));

const initialState = {
  list: [],
};

const initialPost = {
  user_info: {
    user_id: "initialPost의 user-id",
  },
  title: "initialPost의 title",
  image_url: "http://www.ipon.co.kr/common/img/default_profile.png",
  contents: "기본 콘텐츠222",
  year: "2022-02-15 10:00:00",
};

const getPostFB = () => {
  return function (dispatch, getState, { history }) {
    api_post
      .get("/api/articles", {})
      .then(function (response) {
        console.log(response.data.articles);
        const postDB = response.data.articles;
        const post_list = [];
        postDB.forEach((p, i) => {
          let list = {
            user_id: p.user_id,
            title: p.title,
            post_id: p.id,
            year: p.year,
            image_url: p.image,
            contents: p.content,
            insert_dt: p.date,
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

const addPostFB = (image_url, title, user_id, year, contents) => {
  return function (dispatch, getState, { history }) {
    api_post
      .post("/api/articles", { 
        image_url,
        title,
        user_id,
        year,
        contents, //서버는 content인데,,
      })
      .then(function (response) {
        console.log(response)
        addPost()
      })
      .catch(function (error) {
        console.log(error);
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
  },
  initialState
);

const actionCreators = {
  setPost,
  getPost,
  addPost,
  getPostFB,
  addPostFB,
};

export { actionCreators };
