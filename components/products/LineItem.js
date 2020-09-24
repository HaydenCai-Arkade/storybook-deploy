import React from "react";
import PropTypes from "prop-types";

function LineItem({ removeLineItemInCart, updateLineItemInCart, lineItem }) {
  const { id, quantity, variant, title } = lineItem;
  const decrementQuantity = (lineItemId) => {
    const updatedQuantity = lineItem.quantity - 1;
    updateLineItemInCart(lineItemId, updatedQuantity);
  };

  const incrementQuantity = (lineItemId) => {
    const updatedQuantity = lineItem.quantity + 1;
    updateLineItemInCart(lineItemId, updatedQuantity);
  };

  const decrementItem = () => {
    decrementQuantity(id);
  };
  const increaseItem = () => {
    incrementQuantity(id);
  };
  const removeItem = () => {
    removeLineItemInCart(id);
  };

  return (
    <li className="Line-item">
      <div className="Line-item__img">
        {variant.image ? (
          <img src={variant.image.src} alt={`${title} product shot`} />
        ) : null}
      </div>
      <div className="Line-item__content">
        <div className="Line-item__content-row">
          <div className="Line-item__variant-title">{variant.title}</div>
          <span className="Line-item__title">{title}</span>
        </div>
        <div className="Line-item__content-row">
          <div className="Line-item__quantity-container">
            <button
              type="button"
              className="Line-item__quantity-update"
              onClick={decrementItem}
            >
              -
            </button>
            <span className="Line-item__quantity">{quantity}</span>
            <button
              type="button"
              className="Line-item__quantity-update"
              onClick={increaseItem}
            >
              +
            </button>
          </div>
          <span className="Line-item__price">
            $ {(quantity * variant.price).toFixed(2)}
          </span>
          <button
            type="button"
            className="Line-item__remove"
            onClick={removeItem}
          >
            ×
          </button>
        </div>
      </div>
      <style jsx>
        {`
          img {
            display: block;
            max-width: 100%;
            max-height: 100%;
          }
        `}
      </style>
    </li>
  );
}
LineItem.propTypes = {
  removeLineItemInCart: PropTypes.func.isRequired,
  updateLineItemInCart: PropTypes.func.isRequired,
  lineItem: PropTypes.object.isRequired,
};

export default LineItem;
