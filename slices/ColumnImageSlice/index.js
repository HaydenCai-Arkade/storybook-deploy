import React from 'react';
import { array, shape } from 'prop-types';
import { RichText } from 'prismic-reactjs';

const MySlice = ({ slice }) => (
  <div className="column-slice">
    <div className="column-box">
      <div className="column-content">
        <img src={slice.items[0].image.url} className="column-image" />
        <button className="column-btn">{slice.items[0].button_label}</button>
        <p>{slice.items[0].description[0].text}</p>
      </div>
      <div className="column-content">
        {slice.primary.title ? (
          <RichText render={slice.primary.title} />
        ) : (
          <p></p>
        )}
        <p>{slice.items[0].description[0].text}</p>
        <button className="column-btn">{slice.items[1].button_label}</button>
        <img src={slice.items[1].image.url} className="column-image2" />
      </div>
    </div>

    <style>{`

    .column-slice{
      padding:100px;
      display:flex;
      justify-content:center;
      align-items:center;
    }
  
    .column-box{
      display:flex;
      width:80%;
    }

    .column-content{
     padding:30px; 
     
    }

    .column-image{
      height:700px;
      width:400px;
    }
    .column-image2{
      height:600px;
      width:350px;
    }

    .column-btn{
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
      margin-bottom:50px;
    }
    .sb-show-main {
      padding:0 !important;  
    }

    @media (max-width: 680px) {
    
      .column-slice{
        padding:0;
      }

      .column-box{
        width:100%;
        display:flex;
       flex-direction:column;
      }

      .column-content{
        padding:0; 
        width:100%;
        
       }
       .column-btn{
         margin-left:20%;
       }

      .column-image{
        height:500px;
        width:100%;
      }
      .column-image2{
        height:500px;
        width:100%;
      }
    
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
