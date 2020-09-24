import React from 'react';
import Link from 'next/link';
import { array, shape } from 'prop-types';
import { RichText } from 'prismic-reactjs';

const MySlice = ({ slice }) => {
  return (
    <div className="blogs-banner">
      <div className="blog-content">
        {slice.items
          ? slice.items.map((news, index) => {
              return (
                <div className="content-box">
                  <Link href={`/page/${news.tag[0].text}`}>
                    <img
                      key={index}
                      src={news.image.url}
                      className="blog-image"
                    />
                  </Link>

                  <div className="title">
                    <RichText render={news.title} />
                  </div>
                  <div>
                    <p>{news.excerpt[0].text}</p>
                  </div>
                </div>
              );
            })
          : null}
      </div>

      <style>{`

      .blogs-banner{
        width:94vw;
        margin:0 auto;
        padding:100px;

      }

      .blog-content{
        display:flex;
      }
      .content-box{
        width:30%;
        margin-right:50px;
      }

      .title{
        font-size:20px;
      }

      .blog-image{
        height:300px;
        width:100%;
        cursor:pointer;
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
