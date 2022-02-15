import React from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';

const Year = (props) => {
  const dispatch = useDispatch();

  const preview = useSelector((state) => state.image.preview);
  const post_list = useSelector((state) => state.post.list);
  const [contents, setContents] = React.useState('');

  const changeContents = (e) => {
    setContents(e.target.value);
    console.log(e.target.value);
    const textvalue = e.target.value;
  };

  const { radio, value, type, _onChange } = props;

  React.useEffect(() => {

  })
  return (
    <React.Fragment>
      <DIV>
        <input type="radio" name="year" value="1980s" /> 80년대 추억
        <input type="radio" name="year" value="1990s" /> 90년대 추억
        <input type="radio" name="year" value="2000s" /> 2000년대 이후 추억
    </React.Fragment>
  );
};

export default Year;
