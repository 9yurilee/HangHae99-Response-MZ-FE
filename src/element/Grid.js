import React from "react";
import styled from "styled-components";

const Grid = (props) => {
  const {
    is_flex,
    width,
    height,
    padding,
    margin,
    bg,
    border,
    children,
    center,
    borderRadius,
    position,
    _onClick,
    is_flex_center,
    is_flex_between,
  } = props;

  const styles = {
    is_flex: is_flex,
    width: width,
    height,
    margin: margin,
    padding: padding,
    bg: bg,
    center: center,
    border: border,
    borderRadius,
    position,
    is_flex_center,
    is_flex_between,
  };
  return (
    <div>
      <GridBox onClick={_onClick} {...styles}>
        {children}
      </GridBox>
    </div>
  );
};

Grid.defaultProps = {
  children: null,
  is_flex: false,
  is_flex_center: false,
  width: "auto",
  height: "auto",
  padding: false,
  margin: false,
  border: false,
  center: false,
  borderRadius: false,
  position: false,

  _onClick: () => {},
};

const GridBox = styled.div`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  box-sizing: border-box;
  ${(props) => (props.padding ? `padding: ${props.padding}` : "")}
  ${(props) => (props.margin ? `margin: ${props.margin}` : "")};
  ${(props) => (props.bg ? `background-color: ${props.bg}` : "")};
  ${(props) =>
    props.is_flex
      ? `display: flex; align-items: center; justify-content: space-evenly;`
      : ""}
  ${(props) =>
    props.is_flex_between
      ? `display: flex; justify-content: space-between;`
      : ""}   
  ${(props) =>
    props.is_flex_center
      ? `display: flex; align-items: center; justify-content: center;`
      : ""}
  ${(props) => (props.center ? `text-align: center` : "")}
  ${(props) => (props.border ? `border-bottom: ${props.border}` : "")}
  border-radius: ${(props) => props.borderRadius};
`;

export default Grid;
