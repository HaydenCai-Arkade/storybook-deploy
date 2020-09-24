import React from 'react';
import Link from 'next/link';
import { array, shape } from 'prop-types';
import { RichText } from 'prismic-reactjs';

const MySlice = ({ slice }) => (
  <div className="single-blog">
    {slice.primary.title ? <RichText render={slice.primary.title} /> : <p></p>}
    <div className="blog-content">
      {slice.items
        ? slice.items.map((item, index) => {
            return (
              <div>
                <img key={index} src={item.image.url} className="blog-image" />
                {item.content.map((item, index) => {
                  return (
                    <p className="content-paragraph" key={index}>
                      {item.text}
                    </p>
                  );
                })}
              </div>
            );
          })
        : null}

      <Link href="/page/blogs">
        <button type="button">Go back</button>
      </Link>
    </div>
    <div></div>

    <style>{`

    .single-blog{
      width:1000px;
      margin:0 auto;
      padding:100px 0;

    }

    .blog-image{
      width:100%;
      margin-bottom:30px;
      margin-top:30px;

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
      margin-top:50px;
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
