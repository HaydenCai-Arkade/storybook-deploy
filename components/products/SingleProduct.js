import React, { useState } from "react";
import VariantSelector from "./VariantSelector";
import PropTypes from "prop-types";
import ImagesViewer from "./ImagesViewer";

function SingleProduct({ product, addVariantToCart }) {
  const { options, images, variants, title, description } = product;
  let defaultOptionValues = {};

  product.options.forEach((selector) => {
    defaultOptionValues[selector.name] = selector.values[0];
  });

  const [selectedOptions, setSelectedOptions] = useState(defaultOptionValues);

  const [variantImage, setVariantImage] = useState(images.edges[0].node);
  const [variant, setVariant] = useState(variants.edges[0].node);
  const [variantQuantity, setVariantQuantity] = useState(1);

  const handleOptionChange = (event) => {
    const target = event.target;
    selectedOptions[target.name] = target.value;

    const selectedVariant = variants.edges.find((variant) => {
      return variant.node.selectedOptions.every((selectedOption) => {
        return selectedOptions[selectedOption.name] === selectedOption.value;
      });
    }).node;

    setVariant(selectedVariant);
    setVariantImage(selectedVariant.image);
  };

  const handleQuantityChange = (event) => {
    setVariantQuantity(event.target.value);
  };

  let variantSelectors = options.map((option) => {
    return (
      <VariantSelector
        handleOptionChange={handleOptionChange}
        key={option.id.toString()}
        option={option}
      />
    );
  });

  const [imageViewer, setImageViewer] = useState(
    images.edges[0].node.originalSrc
  );

  const imageHandleChange = (id) => {
    const imageList = images.edges;
    imageList.map((imageNode) => {
      if (imageList.indexOf(imageNode) === id) {
        setImageViewer(imageNode.node.originalSrc);
      }
    });
  };
  const addToCart = () => {
    addVariantToCart(variant.id, variantQuantity);
  };

  return (
    <>
      <div className="product">
        <div>
          <div>
            {images.edges.length ? (
              <div className="product-picture">
                {variant.compareAtPrice ? (
                  <div className="sale">sale</div>
                ) : null}
                <img src={imageViewer} alt={`${title} product shot`} />
              </div>
            ) : null}
          </div>

          <div className="view-images">
            <ImagesViewer
              imageHandleChange={imageHandleChange}
              images={images}
              title={title}
            />
          </div>
        </div>

        <div>
          <h3>{title}</h3>
          <p>Price</p>
          <div className="product-price">
            <span>${variant.price}</span> &nbsp;&nbsp;
            {variant.compareAtPrice ? (
              <del>
                <span className="price">${variant.compareAtPrice}</span>
              </del>
            ) : null}
          </div>
          {variantSelectors}
          <div>
            <label>
              Quantity
              <input
                min="1"
                type="number"
                defaultValue={variantQuantity}
                onChange={handleQuantityChange}
              ></input>
            </label>
          </div>

          <button className="Product__buy button" onClick={addToCart}>
            Add to Cart
          </button>

          <p>{description}</p>

          <span>Free Delivery and Returns</span>
          <p>
            Free standard delivery on orders over $200. Delivery may take longer
            than normal. Check your estimated delivery date at checkout. You can
            return your order for any reason, free of charge, within 60 days.
          </p>
        </div>

        <style>
          {`
            .Product-wrapper {
              width: 1100px;
              margin: 40px auto 0;
              display: flex;
              flex-wrap: wrap;
              justify-content: center;
              padding: 100px 0;
            }
            .product {
              display: flex;
              flex-direction: row;
            }
            img {
              width: 400px;
              margin-right: 60px;
            }

            .image-index {
              margin-right: 10px !important;
              width: 80px;
              height: 110px;
              cursor: pointer;
            }

            p,
            label {
              font-size: 14px;
              font-weight: 400;
              font-style: normal;
              line-height: 1.6;
              color: #858585;
            }

            input {
              display: block;
              border: 2px solid black;
              height: 30px;
              width: 300px;
            }

            .view-images {
              display: flex;
              flex-wrap: wrap;
            }

            .price {
              color: #e74c3c;
            }

            .product-price {
              margin-bottom: 15px;
              font-size: 18px;
            }
            .product-picture {
              margin-bottom: 20px;
              position: relative;
            }

            .sale {
              height: 50px;
              width: 50px;
              background-color: #e74c3c;
              color: white;
              font-size: 16px;
              padding-top: 14px;
              text-align: center;
              border-radius: 50%;
              position: absolute;
              top: 20px;
              left: 10px;
            }
          `}
        </style>
      </div>
    </>
  );
}

SingleProduct.propTypes = {
  product: PropTypes.object.isRequired,
  addVariantToCart: PropTypes.func.isRequired,
};

export default SingleProduct;
