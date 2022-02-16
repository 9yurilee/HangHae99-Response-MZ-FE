import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as imageActions } from "../redux/modules/image";
import { api, api_post } from "./api";

const ImgUpload = (props) => {
  const dispatch = useDispatch();
  const is_uploading = useSelector((state) => state.image.uploading);
  const fileInput = React.useRef();

  const selectFile = (e) => {
    const reader = new FileReader();
    const file = e.target.files[0];
    console.log(file)
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      dispatch(imageActions.setPreview(reader.result));
      console.log(reader.result)
    };
  };

  return (
    <input
      type="file"
      onChange={selectFile}
      ref={fileInput}
      disabled={is_uploading}
      //_onclick={uploadFB} //에러 개많이 뜨네
      accept="image/*"
    />
  );
};

export default ImgUpload;
