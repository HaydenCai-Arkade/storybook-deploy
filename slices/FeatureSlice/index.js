import React from 'react';
import { array, shape } from 'prop-types';
import { RichText } from 'prismic-reactjs';

const MySlice = ({ slice }) => (
  <div className="feature-slice">
    {slice.primary.image ? (
      <img src={slice.primary.image.url} className="image" />
    ) : null}
    <div className="content">
      <div>
        {slice.primary.title ? <RichText render={slice.primary.title} /> : null}
        {slice.primary.description ? (
          <RichText render={slice.primary.description} />
        ) : null}
        {slice.primary.button_label ? (
          <button className="feature-btn">{slice.primary.button_label}</button>
        ) : null}
      </div>
    </div>

    <style>{`

    .feature-slice{
      padding:50px 80px;
      position:relative;
      color:white;
      overflow-x: hidden;
    }

    .image{
      width:100%;
      height:500px;
    }

    .content{
      width:100%;
      position:absolute;
      top:50%;
      left:45%;
    }

    .feature-btn{
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
`}</style>
  </div>
);

MySlice.propTypes = {
  slice: shape({
    primary: shape({
      title: array.isRequired,
    }).isRequired,
  }).isRequired,
};

export default MySlice;
