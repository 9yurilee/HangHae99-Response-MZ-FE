import React from "react";
import styled from "styled-components";

const Button = (props) => {
  const {
    text,
    _onClick,
    is_float,
    children,
    margin,
    width,
    height,
    padding,
    size,
    bg,
    color,
    disabled,
  } = props;

  const styles = {
    margin: margin,
    width: width,
    padding: padding,
    size: size,
    height,
    bg,
    color,
    disabled,
  };

  return (
    <ElButton {...styles} onClick={_onClick}>
      {text ? text : children}
    </ElButton>
  );
};

Button.defaultProps = {
  text: false,
  children: null,
  _onClick: () => {},
  is_float: false,
  margin: false,
  width: "100%",
  padding: "12px 0px",
  height: "auto",
  bg: false,
  color: "#fff",
  size: "15px",
  disabled: false,
};

const ElButton = styled.button`
  width: ${(props) => props.width};
  ${(props) => (props.height ? `height: ${props.height};` : "")}
  ${(props) => (props.bg ? `background-color: ${props.bg}` : "")};
  ${(props) => (props.color ? `color: ${props.color}` : "")};
  padding: 12px 0px;
  background-color: #f47b6a;
  box-sizing: border-box;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  padding: ${(props) => props.padding};
  margin: ${(props) => props.margin};
  font-size: ${(props) => props.size};
  font-family: "DungGeunMo";
  ${(props)=> (props.disabled ? `background-color: #f47b6a80;` : `background-color: #f47b6a;`)}
`;

export default Button;
