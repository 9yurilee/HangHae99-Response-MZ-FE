import React from "react";
import styled from "styled-components";

const Image = (props) => {
  const { src, width, height, margin} = props;

  const styles = {
    src,
    width,
    height,
    margin
  };

  return (
    <>
      <ImageDefault {...styles} />
    </>
  );
};

Image.defaultProps = {
  src: "https://ilovecharacter.com/news/data/20210122/p179568629887999_597.jpg",
  width: '450px',
  height: '450px', 
  margin: false,
};

const ImageDefault = styled.div`
  width: ${(props) => props.width}px;
  min-width: 350px;
  min-height: 300px;
  height: ${(props) => props.height}px;
  ${(props)=> props.margin ? `margin: ${props.margin}`: ""};
  background-color: #59c1c2;
  background-image: url("${(props) => props.src}");
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
`;

export default Image;
