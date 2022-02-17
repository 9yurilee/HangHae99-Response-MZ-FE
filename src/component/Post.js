import React from "react";
import { Grid, Image, Text, Button } from "../element/index";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { history } from "../redux/configStore";

const Post = (props) => {
  const history = useHistory();

  return (
    <React.Fragment>
      <Grid
        margin="120px auto"
        _onclick={() => history.push(`/detail/${props.post_id}`)}
      >
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
            src={props.image}
            margin="20px 5px"
          />
          <Text minWidth="300px" bg="#59c1c2" margin="0px 20px">
            <Grid margin="0px 0px 25px 0px" is_flex_between>
              <Text >{props.user_id}</Text>
              <Text >{props.date}</Text>
            </Grid>
            <Text height="300">{props.content}</Text>
          </Text>
        </Grid>
      </Grid>
      <Grid></Grid>
    </React.Fragment>
  );
};

Post.defaultProps = {
  user_info: {
    user_id: "user_id",
  },
  image: "http://www.ipon.co.kr/common/img/default_profile.png",
  content: "기본 콘텐츠222",
  insert_dt: "2022-02-04 16:20:00",
  // comment_cnt: '0',
};

export default Post;
