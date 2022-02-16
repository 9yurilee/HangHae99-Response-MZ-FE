import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as imageActions } from "../redux/modules/image";
import axios from 'axios'
import { api, api_post } from "./api";

const ImgAPI = (props) => {
  const dispatch = useDispatch();
  const is_uploading = useSelector((state) => state.image.uploading);
  const fileInput = React.useRef();

  const selectFile = async (e) => {
    const reader = new FileReader();
    const file = e.target.files[0];
    console.log(file)

    if(e.target.files){
      e.preventDefault();
      
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append('image', file)
      console.log(file)

      const accessToken = document.cookie.split("=")[1];

      await axios({
        method: 'post',
        url: 'http://54.180.137.157:8080/api/articles',
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
          authorization: `${accessToken}`
        }
      })
    }
    };
  }

};

export default ImgAPI;
