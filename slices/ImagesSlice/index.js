import React from 'react';
import { array, shape } from 'prop-types';
import { RichText } from 'prismic-reactjs';

const MySlice = ({ slice }) => (
  <div className="images-slice">
    <div className="images-content">
      <div className="title">
        {slice.primary.title ? (
          <RichText render={slice.primary.title} />
        ) : (
          <p></p>
        )}
        {slice.primary.description ? (
          <RichText render={slice.primary.description} />
        ) : (
          <p></p>
        )}
      </div>

      <div className="images">
        {slice.items
          ? slice.items.map((item, index) => {
              return item.image.url ? (
                <img
                  src={item.image.url}
                  className={item.image.alt}
                  key={index}
                />
              ) : null;
            })
          : null}
      </div>
      {/* className={`Cart ${isCartOpen ? 'Cart--open' : ''}`} */}

      {slice.items
        ? slice.items.map((item, index) => {
            return item.button_label ? (
              <button className="price-btn" key={index}>
                {item.button_label}
              </button>
            ) : null;
          })
        : null}
    </div>
    <style>{`

.images-slice{
width:100vw;
display:flex;
justify-content:center;
align-items:center;
}
.title{
  padding:0 120px;
  text-align:center;
}
.images{

}

.images-content{
  width:50vw;
  position:relative;
}

.slice-image{
  height:300px;
  width:300px;
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
