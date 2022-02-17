import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as imageActions } from "../redux/modules/image";

const Upload = (props) => {

  const dispatch = useDispatch();
  // const is_uploading = useSelector(state => state.image.uploading);
  const fileInput = React.useRef();


  const selectFile = (e) => {
    const accessToken = document.cookie.split("=")[1];

    const img = e.target.files[0]
    console.log(img)
    const formData = new FormData();
    formData.append('image', img);
    console.log(formData);

    dispatch(imageActions.uploadImageDB(formData));

    // for (const keyValue in formData) console.log(keyValue)

    const reader = new FileReader();
    const file = fileInput.current.files[0]

    reader.readAsDataURL(file)
    console.log(file)

    reader.onloadend = () => {
      dispatch(imageActions.setPreview(reader.result))
      console.log(reader.result)
    }
  }


  // const saveFileImage = (e) => {
  //   const img = e.target.files[0];
  //   const formData = new FormData();
  //   formData.append('imgUrl', img);
  //   console.log(formData); // FormData {}
  //   for (const keyValue of formData) console.log(keyValue);
  //   dispatch(postActions.imageAPI(formData));
  //   setFileImage(URL.createObjectURL(e.target.files[0]));
  // };

  return (
      <input
        type="file"
        onChange={selectFile}
        ref={fileInput}
      />
  );
};

export default Upload;