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
      dispatch(imageActions.setImage(file));

    reader.readAsDataURL(file);
    const decode = window.atob(reader.result);
    console.log(decode);

    reader.onloadend = () => {
      dispatch(imageActions.setPreview(reader.result));
    };

    const raw = window.atob(reader.result);
    console.log(raw);
  };

  return (
    <input
      type="file"
      onChange={selectFile}
      name="image"
      ref={fileInput}
      disabled={is_uploading}
      //_onclick={uploadFB} //에러 개많이 뜨네
      accept="image/*"
    />
  );
};

export default ImgUpload;
