import React from 'react';
import styled from 'styled-components';

import { Text, Grid } from './index';

const Input = (props) => {
  const {label, placeholder, _onChange, type, multiLine, value, is_submit, onSubmit, radio, paddingTop, width, margin} = props;
  
  const styles = {
    paddingTop, width, margin
  }

  if (multiLine) {
    return (
      <Grid>
        {label && <Text>{label}</Text>}
        <ElTextarea  
          rows={10}
          value={value}
          placeholder={placeholder}
          onChange={_onChange}
        ></ElTextarea>
      </Grid>
    );
  }

  return (
    <>
      <Grid {...styles}>
        {label && <Text>{label}</Text>}
        {is_submit ? (
          <ElInput
            type={type}
            placeholder={placeholder}
            onChange={_onChange}
            value={value}

          />
        ) : (
          <ElInput type={type} placeholder={placeholder} onChange={_onChange} />
        )}
      </Grid>
    </>
  );
};

Input.defaultProps = {
  multiLine: false,
  label: false,
  placeholder: '내용을 입력해주세요.',
  type: 'text',
  value: "",
  is_submit: false,
  radio: false,
  paddingTop: false,
  onSubmit: () => {},
  _onChange: () => {},
  width: "auto",
  margin: "0",
};

const ElTextarea = styled.textarea`
  /* border: none; */
  width: 100%;
  height: 200px;
  padding: 12px 4px;
  box-sizing: border-box;
  word-break: break-all;
  overflow: hidden; 
  `;

const ElInput = styled.input`
  border: 1px solid #212121;
  width: 100%;
  padding: 12px 4px;
  box-sizing: border-box;
  font-family: '양진체';
  width: ${(props) => props.width};
  margin: ${(props) => props.margin};
  font-size: 16px;
`;

export default Input;