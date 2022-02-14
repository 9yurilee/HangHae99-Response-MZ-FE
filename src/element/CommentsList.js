import React from "react";
import { Grid, Text, Input } from "../element/index";

const CommentsList = (props) => {
  const { width, height, children } = props;
  const styles = {
    width,
    height,
  };
  return (
    <React.Fragment>
      <Grid
        bg="#59c1c2"
        margin="auto"
        width="700"
        height="300"
        is_flex
        position="relative"
      >
        <Grid width="600">
          <Grid bg="#fff">
            <Grid is_flex>
              <Text>아이디</Text>
              <Text>작성시간{props.insert_dt}</Text>
            </Grid>

            <Input width="600" />
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

CommentsList.defaultProps = {
  width: "100%",
  height: "200px",
};

export default CommentsList;
