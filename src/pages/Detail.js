import React from "react";
import Header from "../component/Header";
import Post from "../component/Post";
import { Button, Grid, Input, Text, CommentsList } from "../element/index";

const Detail = () => {
  return (
    <Grid width="700" margin="auto">
      <Post />
      <CommentsList />
    </Grid>
  );
};

export default Detail;
