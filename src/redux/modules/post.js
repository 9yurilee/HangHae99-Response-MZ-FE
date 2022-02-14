import {createAction, handleActions} from "redux-actions";
import {produce} from "immer"; 
import {getCookie, setCookie, deleteCookie} from "../../shared/Cookie"
import {api} from '../../db/api';
// import moment from 'moment';

const SET_POST = 'SET_POST';  //목록에 넣어주는 애
const ADD_POST = 'ADD_POST';

const setPost = createAction(SET_POST, (post_list) => ({ post_list }));
const addPost = createAction(ADD_POST, (post) => ({ post}));

const initialState = {
    list: [],
}

const initialPost = {
    id: 0,
    user_info: {
        user_id: "user_id",
      },
      image_url: "http://www.ipon.co.kr/common/img/default_profile.png",
      contents: "기본 콘텐츠222",
      insert_dt: "2022-02-04 16:20:00",
      // comment_cnt: '0',
}

const getPostFB = () => {
    return function (dispatch, getState, { history }) {
        
    }
}

//리듀서 작성 //immer로 불변성 유지!
// 
export default handleActions(
    {
        [SET_POST]: (state, action) => produce(state, (draft) => {

        }),
        [ADD_POST]: (state, action) => produce(state, (draft) => {

        })
    }, initialState
);

// const getPostFB = () => {
//     return function (dispatch, getState, { history }) {
        
//         // const postDB = api_post.response
//         // console.log(api_post.response)
//     }
// }

const actionCreators = {
    setPost,
    addPost,
    // getPostFB
};

export { actionCreators };