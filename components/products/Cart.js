import React, { useContext } from "react";
import LineItem from "./LineItem";
import { ShopContext } from "context/shopContext";

function Cart() {
  const {
    removeLineItemInCart,
    updateLineItemInCart,
    checkout,
    isCartOpen,
    handleCartClose,
  } = useContext(ShopContext);

  const openCheckout = () => {
    window.location.href = checkout.node.webUrl;
  };

  const lineItems =
    checkout.node &&
    checkout.node.lineItems.edges.map((lineItem) => {
      return (
        <LineItem
          removeLineItemInCart={removeLineItemInCart}
          updateLineItemInCart={updateLineItemInCart}
          key={lineItem.node.id}
          lineItem={lineItem.node}
        />
      );
    });

  return (
    <div className={`Cart ${isCartOpen ? "Cart--open" : ""}`}>
      <header className="Cart__header">
        <h2>Your cart</h2>
        <button type="button" onClick={handleCartClose} className="Cart__close">
          ×
        </button>
      </header>
      <ul className="Cart__line-items">{lineItems}</ul>
      <footer className="Cart__footer">
        <div className="Cart-info clearfix">
          <div className="Cart-info__total Cart-info__small">Subtotal</div>
          <div className="Cart-info__pricing">
            <span className="pricing">
              $ {checkout.node && checkout.node.subtotalPrice}
            </span>
          </div>
        </div>
        <div className="Cart-info clearfix">
          <div className="Cart-info__total Cart-info__small">Taxes</div>
          <div className="Cart-info__pricing">
            <span className="pricing">
              $ {checkout.node && checkout.node.totalTax}
            </span>
          </div>
        </div>
        <div className="Cart-info clearfix">
          <div className="Cart-info__total Cart-info__small">Total</div>
          <div className="Cart-info__pricing">
            <span className="pricing">
              $ {checkout.node && checkout.node.totalPrice}
            </span>
          </div>
        </div>
        <button
          type="button"
          className="Cart__checkout button"
          onClick={openCheckout}
        >
          Checkout
        </button>
      </footer>
    </div>
  );
}

export default Cart;
