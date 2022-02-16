import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import {api} from '../../shared/api';

// // actions
const UPLOADING = "UPLOADING";    
const SET_PREVIEW = "SET_PREVIEW";

// action creators
const uploading = createAction(UPLOADING, (uploading) => ({ uploading }));
const setPreview = createAction(SET_PREVIEW, (preview) => ({ preview }));

// middleWear
function uploadImageFB(image) {
  return function (dispatch, getState, {history}) {
    dispatch(uploading(true))
    .then(function(res){
      console.log(res)
    })
  }
}

// initial state
const initialState = {
  image: "",
  uploading: false,
  preview: null,
};

// reducer
export default handleActions(
  {
    [UPLOADING]: (state, action) =>
      produce(state, (draft) => {
        draft.uploading = action.payload.uploading;
      }),

    [SET_PREVIEW]: (state, action) =>
      produce(state, (draft) => {
        draft.preview = action.payload.preview;
       }),
  }, initialState
);

const actionCreators = {
  // uploadImage,
  uploadImageFB,
  setPreview,
};

export { actionCreators }