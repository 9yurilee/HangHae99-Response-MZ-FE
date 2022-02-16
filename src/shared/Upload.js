import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as imageActions } from "../redux/modules/image";
import { api } from "./api";

const ImgUpload = (props) => {
  const dispatch = useDispatch();
  const is_uploading = useSelector((state) => state.image.uploading);
  const fileInput = React.useRef();

  const selectFile = (e) => {
    const reader = new FileReader();
    const file = e.target.files[0];

    reader.readAsDataURL(file);

    reader.onloadend = () => {
      dispatch(imageActions.setPreview(reader.result));
    };
  };

  // const UploadImage = async (e) => {
  //   e.preventDefault();
  //   fileInput.current.click();
  //   const formData = new FormData();
  //   formData.append('file', e.target.files[0]);
  //   const response = await api.post('/articles', formData);
  // }

  const uploadFB = () => {
    let image = fileInput.current.files;
    if (!fileInput.current || image.length === 0) {
      window.alert("파일을 선택해주세요!");
      return;
    }
    dispatch(imageActions.uploadImageFB(image[0])).then(function (response) {
      console.log(response);
    });
  };

  return (
    <input
      type="file"
      onChange={selectFile}
      ref={fileInput}
      disabled={is_uploading}
      _onclick={uploadFB}
      accept="image/*"
    />
  );
};

export default ImgUpload;
