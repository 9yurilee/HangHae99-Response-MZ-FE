import { useSelector } from 'react-redux';

import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { getCookie, setCookie, deleteCookie } from "../../shared/Cookie";
import { api } from "../../shared/api";
// import moment from 'moment';

const SET_POST = "SET_POST";
const GET_POST = "GET_POST";
const ADD_POST = "ADD_POST";
const DELETE_POST = "DELETE_POST";

const setPost = createAction(SET_POST, (post_list) => ({ post_list }));
const getPost = createAction(GET_POST, (post_list) => ({ post_list }));
const addPost = createAction(ADD_POST, (post) => ({ post }));
const deletePost = createAction(DELETE_POST, (post_id) => ({ post_id }))

const initialState = {
  list: [],
};

const initialPost = {
  user_info:{
    user_id: "user_id"
  },
  post_id: "post_id",
  title: "initialPost의 title",
  image_url: "http://www.ipon.co.kr/common/img/default_profile.png",
  contents: "기본 콘텐츠222",
  year: "2022-02-15 10:00:00",
};

console.log(typeof _image);

const getPostFB = () => {
  return function (dispatch, getState, { history }) {
    // const _user = getState.user.user
    // console.log(_user)
    api
      .get("/articles", {})
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
console.log('hi')

const addPostFB = (contents='') => {
  return function(dispatch, getState, { history }){
    const _user = useSelector((state) => state.user.user)
    console.log(_user)
    console.log("안녕")
    const user_info = {
      user_id: _user.user_id
    }
    api
    .post('/articles', {})
    .then(function(response){
      console.log(response)
    })
    .catch(function (error) {
      window.alert("포스팅 중 에러가 발생했습니다")
      console.log(error);
    });
  }
}

// const editPostFB = () => {
//   return function(dispatch, getState, { history }){

//   }
// }

const deletePostFB = (post_id) => {
    api.delete(`articles/:post_id`, (req, res) => {
    const _post_id = req.query.post_id
    const user = api.articles.filter(data => data.post_id != _post_id );
  })
}

// const addPostFB = (image, title, user_id, year, contents) => {
//   return function (dispatch, getState, { history }) {
//     const post = 
//     const id = post.length ? post[post.length - 1].id +1 : 1;
//     console.log(id)
//     const newPost = { user_id, title, content: contents, year, image: image_url}
//      //{withCredentials: true}?
//     .then(function (response) {
//       const res = api_post.post("/articles", newPost)
//       const all_posts = [...posts, res.data]
//         // dispatch(addPost(post));
//         // history.push("/");
//       })
//       .catch(function (error) {
//         console.log(error);
//       });
//   };
// };

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
        draft.list = draft.list.filter((p) => p.id !== action.payload.post_id)
      })
  },
  initialState
);

const actionCreators = {
  setPost,
  getPost,
  addPost,
  getPostFB,
  addPostFB,
  deletePostFB
};

export { actionCreators };
