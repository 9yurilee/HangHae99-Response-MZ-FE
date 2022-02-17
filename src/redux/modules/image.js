import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import { api_post, apis } from "../../shared/api";

// // actions
const UPLOADING = "UPLOADING";
const SET_PREVIEW = "SET_PREVIEW";
const SET_IMAGE = "SET_IMAGE";

// action creators
const uploading = createAction(UPLOADING, (uploading) => ({ uploading }));
const setPreview = createAction(SET_PREVIEW, (preview) => ({ preview }));

// middleWear
const uploadImageDB = (image) => {
  return function (dispatch, getState, { history }) {
    apis
      .imageUpload(image)
      .then((res) => {
        console.log("하이");
        window.alert("😆 이미지 업로드 성공! 😆");
      })
      .catch((error) => {
        console.log("이미지 업로드 실패");
        alert(error.response.data.errorMessage);
        // window.alert(error.errorMessage)
        return;
      });
    dispatch(uploading(true));
  };
};

const getImageFB = (file) => {
  // for (const keyValue of file) console.log(keyValue);
  return async function (dispatch, useState, { history }) {
    api_post.post("/articles", file).then(function (res) {
      console.log(res.data.image_url);
      // dispatch(getImageUrl(res.data.image_url));
    });
  };
};

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
  },
  initialState
);

const actionCreators = {
  uploadImageDB,
  setPreview,
};

export { actionCreators };
