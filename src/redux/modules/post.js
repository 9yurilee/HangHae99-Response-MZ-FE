import { createAction, handleActions } from "redux-actions";
import axios from "axios";
import { produce } from "immer";
import { getCookie, setCookie, deleteCookie } from "../../shared/Cookie";
import { api_post } from "../../db/api";
// import moment from 'moment';

const SET_POST = "SET_POST"; //목록에 넣어주는 애
const ADD_POST = "ADD_POST";

const setPost = createAction(SET_POST, (post_list) => ({ post_list }));
const addPost = createAction(ADD_POST, (post) => ({ post }));

const initialState = {
  list: [],
};

const initialPost = {
  id: 0,
  user_info: {
    user_id: "user_id",
  },
  image_url: "http://www.ipon.co.kr/common/img/default_profile.png",
  contents: "기본 콘텐츠222",
  insert_dt: "2022-02-04 16:20:00",
};

const option = {
  url: "http://localhost:3001/articles",
  method: "GET",
  headers: {
    accept: "application/json",
    "content-type": "application/json",
  },
  data: {
    user_id: "test",
    image_url: "http://www.ipon.co.kr/common/img/default_profile.png",
    contents: "되나용",
  },
};

const post_data = axios(option).then((response) => {
  const new_data = response.data;
  console.log(new_data);
});

function search1() {
    return axios.get("http://localhost:3001/articles");
}
console.log(search1());


export default handleActions(
  {
    [SET_POST]: (state, action) =>
      produce(state, (draft) => {
          console.log("시작")
        draft.list = action.payload.post_data;
        console.log(action.payload.post_data)
      }),
    [ADD_POST]: (state, action) => produce(state, (draft) => {

    }),
  },
  initialState
);

const actionCreators = {
  setPost,
  addPost,
  // getPostFB
};

export { actionCreators };
