import React, { useState, useEffect } from 'react';
import { array, shape } from 'prop-types';
import { RichText } from 'prismic-reactjs';

const MySlice = ({ slice }) => {
  const [imageUrl, setImageUrl] = useState();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.innerWidth >= 680
        ? setImageUrl(slice.primary.image.url)
        : setImageUrl(slice.primary.image.responsive.url);
    }
  });

  return (
    <div className="intro-banner">
      <img src={imageUrl} className="banner-image" />
      <div className="content">
        <div>
          {slice.primary.title ? (
            <RichText render={slice.primary.title} />
          ) : null}
          {slice.primary.description ? (
            <RichText render={slice.primary.description} />
          ) : null}
          {slice.primary.button_label ? (
            <button>{slice.primary.button_label}</button>
          ) : null}
        </div>
      </div>
      <style>{`

    .intro-banner{
      width:100vw;
      position:relative;
      color:black;
      overflow-x: hidden;
    }

    .banner-image{
      width:100%;
      height:600px;
    }

    .content{
      width:100%;
      position:absolute;
      top:50%;
      left:20%;
    }

    button{
      display:block;
      background-color:black;
      outline:none;
      width:200px;
      height:50px;
      font-size:20px;
      border:none;
      cursor:pointer;
      color:white;
    }
    .sb-show-main {
      padding:0 !important;  
    }

    @media (max-width: 680px) {
      .content{
        left:25% ;
      }
  }
`}</style>
    </div>
  );
};

MySlice.propTypes = {
  slice: shape({
    primary: shape({
      title: array.isRequired,
    }).isRequired,
  }).isRequired,
};

export default MySlice;
