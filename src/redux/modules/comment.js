import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { api } from "../../shared/api";


const SET_COMMENT = "SET_COMMENT";
const ADD_COMMENT = "ADD_COMMENT";
const DELETE_COMMENT = "DELETE_COMMENT"
const LOADING = "LOADING";

const setComment = createAction(SET_COMMENT, (article_id, comment_list) => ({article_id, comment_list}));
const addComment = createAction(ADD_COMMENT, (article_id, content) => ({article_id, content}));
const deleteComment = createAction(DELETE_COMMENT, (article_id, comment_id) => ({article_id, comment_id}));
const loading = createAction(LOADING, (is_loading) => ({ is_loading }));

const initialState = {
  list: {},
  is_loading: false,
};

const getCommentDB = (article_id = null) => {
    return function (dispatch, getState, { history }) {
      api
        .get(`/articles/${article_id}/comments`)
        .then((res) => {
          dispatch(setComment(article_id, res.data.comments))
          console.log(res.data)
        })
        .catch((err) => {
          console.error(err)
        })
    }
  }

const addCommentDB = (article_id, content) => {
    return function (dispatch, getState, { history }) {
      api
        .post(`/articles/${article_id}/comments`, {
            content: content,
        })
        .then((res) => {
            dispatch(addComment(article_id, {content: content}))
        })
        .catch((err) => {
            console.error(err)
        })
    }
}

const deleteCommentDB = (article_id, comment_id) => {
    return function (dispatch, getState, { history }) {
      api
      .delete(`articles/${article_id}/comments/${comment_id}`)
        .then((res) => {
          dispatch(deleteComment(article_id, comment_id))
        })
        .catch((err) => {
          console.error(err)
        })
    }
  }

export default handleActions(
  {
      [SET_COMMENT]: (state, action) => produce(state, (draft) => {
        draft.list[action.payload.article_id] = action.payload.comment_list
      }),
      [ADD_COMMENT]: (state, action) => produce(state, (draft)=> {
        draft.list[action.payload.article_id].push(action.payload.content)
      }),
      [DELETE_COMMENT]: (state, action) => produce(state, (draft) => {
        draft.list[action.payload.article_id].filter((c, i) => c.comment_id !== action.payload.comment_id)
      }),
      [LOADING]: (state, action) => 
      produce(state, (draft) => {
        draft.is_loading = action.payload.is_loading;
      })
  },
  initialState
);

const actionCreators = {
  getCommentDB, addCommentDB, deleteCommentDB,
  setComment,
  addComment,
  deleteComment
};

export { actionCreators };