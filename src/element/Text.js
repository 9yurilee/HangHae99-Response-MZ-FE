import React from "react";
import styled from "styled-components";

const Text = (props) => {
  const {
    float,
    bold,
    color,
    size,
    children,
    _onClick,
    margin,
    height,
    text,
    display,
    alignItems,
    justifyContent,
    textAlign,
    bg,
    position,
    left,
    right,
    paddingTop,minWidth,
    letter
  } = props;

  const styles = {
    bold,
    color,
    size,
    margin,
    height,
    text,
    display,
    alignItems,
    textAlign,
    justifyContent,
    float,
    bg,
    position,
    left,
    right,
    paddingTop,minWidth, letter  };

  return (
    <TextWrap {...styles} onClick={_onClick}>
      {text ? text : children}
    </TextWrap>
  );
};

Text.defaultProps = {
  children: null,
  bold: false,
  color: "#222831",
  size: "",
  margin: false,
  _onClick: () => {},
  height: 0,
  text: "",
  display: "block",
  alignItems: false,
  justifyContent: false,
  textAlign: "left",
  position: false,
  paddingTop: false,
  minWidth: false,
  letter: false,
};

const TextWrap = styled.div`
  ${(props) => (props.minWidth ? `min-width: ${props.minWidth}` : "")};
  color: ${(props) => props.color};
  ${(props) => (props.float ? `float: ${props.float}` : "")};
  box-sizing: border-box;
  font-size: ${(props) => props.size};
  font-weight: ${(props) => (props.bold ? "600" : "400")};
  ${(props) => (props.margin ? `margin: ${props.margin}` : "")};
  ${(props) => (props.position ? `position: ${props.position}` : "")};
  ${(props) => (props.paddingTop ? `padding-top: ${props.paddingTop}` : "")};
  text-align: ${(props) => props.textAlign};
  ${(props) =>
    props.is_Main
      ? `overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-break: break-all;`
      : ""}
  font-family: '양진체';
  ${(props) => (props.letter) ? `letter-spacing: 2px;` : ""};
`;

export default Text;
