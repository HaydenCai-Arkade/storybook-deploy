import React from 'react';
import { array, shape } from 'prop-types';
import { RichText } from 'prismic-reactjs';

const MySlice = ({ slice }) => {
  return (
    <div className="image-banner">
      <div>
        {slice.primary.image ? (
          <img src={slice.primary.image.url} className="banner-image" />
        ) : null}
      </div>
      <div className="right-banner">
        <h3>TAG HERE</h3>
        {slice.primary.title ? <RichText render={slice.primary.title} /> : null}
        {slice.primary.content ? (
          <RichText render={slice.primary.content} />
        ) : null}
      </div>
      <style>{`

      .image-banner{
        padding:50px;
        display:flex;

      }
      .banner-image{
        width:1000px;
        height:500px;

      }
      .right-banner{
        margin-left:30px;
        padding:30px 50px;
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
