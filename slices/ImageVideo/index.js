import React from 'react';
import { array, shape } from 'prop-types';
import { RichText } from 'prismic-reactjs';

const MySlice = ({ slice }) => {
  return (
    <div className="image-video">
      <div className="image-video-content">
        <div>
          {slice.primary.title ? (
            <RichText render={slice.primary.title} />
          ) : null}
          <div className="picture">
            {slice.primary.picture ? (
              <img src={slice.primary.picture.url} className="picture" />
            ) : null}
          </div>
          <div>
            {slice.primary.content ? (
              <RichText render={slice.primary.content} />
            ) : null}
          </div>
          <div className="video">
            {slice.primary.video ? (
              <div
                dangerouslySetInnerHTML={{
                  __html: slice.primary.video.html,
                }}
              />
            ) : null}
          </div>
        </div>
      </div>
      <style>{`
      .image-video-content{
        max-width:1100px;
        margin:0 auto;
        text-algin:center;
        padding-top:50px;
      }

      .picture{
        width:1100px;
        margin-bottom:30px;
      }

      iframe{
        width:1100px;
        height:400px;
        margin-top:50px;
   
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
