import React from 'react';
import { array, shape } from 'prop-types';
import { RichText } from 'prismic-reactjs';

const MySlice = ({ slice }) => (
  <div className="price-slice">
    {slice.primary.image ? (
      <img src={slice.primary.image.url} className="image" />
    ) : null}
    <div className="price-content">
      <div className="title">
        {slice.primary.title ? <RichText render={slice.primary.title} /> : null}
        {slice.primary.description ? (
          <RichText render={slice.primary.description} />
        ) : null}
      </div>
      <div className="btn-group">
        {slice.items
          ? slice.items.map((item, index) => {
              return (
                <div className="btn-item" key={index}>
                  <button className="price-btn">{item.button_label}</button>
                </div>
              );
            })
          : null}
      </div>
    </div>

    <style>{`
    .sb-show-main {
      padding:0 !important;  
    }

    .price-slice{

      position:relative;
      color:white;
      overflow-x: hidden;
      boxing-sizing:border-box;
    }

    .image{
      width:100%;
      height:400px;
    }

    .price-content{
      width:50%;
      position:absolute;
      top:20%;
      left:63%;
    }

    .btn-group{
      display:flex;
      flex-wrap:wrap;
      width:30vw;
      margin-top:40px;
    }

    .btn-item{
      width:30%;
      margin-right:50px;
      margin-bottom:30px;
    }

    .price-btn{
      display:block;
      background-color:black;
      outline:none;
      width:180px;
      height:50px;
      font-size:15px;
      border:none;
      cursor:pointer;
      color:white;
      margin-right:30px;

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
