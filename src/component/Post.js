import React from "react";
import { Grid, Image, Text } from "../element/index";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {history} from '../redux/configStore';

const Post = (props) => {
  const history = useHistory();

  return (
    <React.Fragment>
      <Grid margin="120px auto" _onClick={() => history.push(`/detail/${props.post_id}`)}>
        <Grid
          bg="#59c1c2"
          margin="15px auto"
          width="700"
          is_flex
          position="relative"
        >
          <Image
            width="350"
            height="300"
            src={props.image_url}
            margin="20px 5px"
          />
          <Text minWidth="300px" bg="#59c1c2" margin="0px 20px">
            <Text>{props.user_id}</Text>
            <Text>{props.insert_dt}</Text>
            <Text height="300">{props.contents}</Text>
          </Text>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

Post.defaultProps = {
  user_info: {
    user_id: "user_id",
  },
  image_url: "http://www.ipon.co.kr/common/img/default_profile.png",
  contents: "기본 콘텐츠222",
  insert_dt: "2022-02-04 16:20:00",
  // comment_cnt: '0',
};

export default Post;
