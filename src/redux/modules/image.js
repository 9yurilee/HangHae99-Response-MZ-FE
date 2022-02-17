import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import { apis } from "../../shared/api";

const UPLOADING = "UPLOADING";
const UPLOAD_IMAGE = "UPLOAD_IMAGE";
const SET_PREVIEW = "SET_PREVIEW"

const uploading = createAction(UPLOADING, (uploading) => ({ uploading }));
const uploadImage = createAction(UPLOAD_IMAGE, (image_url) => ({ image_url }));
const setPreview = createAction(SET_PREVIEW, (preview) => ({ preview }));

const initialState = {
  image: "",
  uploading: false,
  preview: null,
};

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
        return;
      });
    dispatch(uploading(true));
  };
};

export default handleActions(
  {
    [UPLOADING]: (state, action) =>
      produce(state, (draft) => {
        draft.image_url = action.payload.image_url;
        draft.uploading = action.payload.uploading;
      }),
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
  uploadImage,
  uploadImageDB,
  setPreview,
};

export { actionCreators };
