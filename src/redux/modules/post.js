import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { getCookie, setCookie, deleteCookie } from "../../shared/Cookie";
import { api_post } from "../../db/api";
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
  image_url: "http://www.ipon.co.kr/common/img/default_profile.png",
  contents: "기본 콘텐츠222",
  insert_dt: "2022-02-04 16:20:00",
};

const getPostFB = () => {
  return function (dispatch, getState, { history }) {
    api_post
      .get("http://localhost:3001/articles", {})
      .then(function (response) {
        const postDB = response.data;
        const post_list = [];
        postDB.forEach((p, i) => {
          let list = {
            user_id: p.user_id, //user_id 못 읽어옴
            post_id: p.post_id,
            insert_dt: p.insert_dt,
            image_url: p.image_url,
            contents: p.contents,
          };
          post_list.push(list);
        });
        console.log(post_list);
        dispatch(getPost(post_list));
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
        console.log("get_post 안녕");
        draft.list = action.payload.post_list;
      }),
    [ADD_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list.unshift(action.payload.post);
      }),
  },
  initialState
);

const actionCreators = {
  setPost,
  getPost,
  addPost,
  getPostFB,
};

export { actionCreators };
