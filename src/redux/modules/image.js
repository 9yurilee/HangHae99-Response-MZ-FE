import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import {api} from '../../shared/api';

// // actions
const UPLOADING = "UPLOADING";    
const SET_PREVIEW = "SET_PREVIEW";
const SET_IMAGE = "SET_IMAGE";

// action creators
const uploading = createAction(UPLOADING, (uploading) => ({ uploading }));
const setPreview = createAction(SET_PREVIEW, (preview) => ({ preview }));
const setImage = createAction(SET_IMAGE, (image) => ({image}))

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
    [SET_IMAGE]: (state, action) =>
    produce(state, (draft) => {
      draft.image = action.payload.image
    })
  }, initialState
);

const actionCreators = {
  setImage,
  // uploadImage,
  uploadImageFB,
  setPreview,
};

export { actionCreators }