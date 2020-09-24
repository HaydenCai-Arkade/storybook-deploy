import React from "react";
import PropTypes from "prop-types";

const ImagesViewer = ({ imageHandleChange, images, title }) => {
  return (
    <>
      {images.edges.map((image, id) => {
        const handleClick = () => {
          imageHandleChange(id);
        };
        return (
          <div key={id}>
            <img
              src={image.node.originalSrc}
              alt={title}
              onClick={handleClick}
              className="image-index"
            />
          </div>
        );
      })}
      <style>
        {`
        .image-index{
          margin-right:10px !important;
          width:80px;
          height:110px;
          cursor:pointer;
        }
      `}
      </style>
    </>
  );
};

ImagesViewer.propTypes = {
  imageHandleChange: PropTypes.func.isRequired,
  images: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
};

export default ImagesViewer;
