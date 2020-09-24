import React, { useState, useEffect } from "react";
import Cart from "components/products/Cart";
import { FaCartPlus } from "react-icons/fa";
import {
  useCheckoutEffect,
  createCheckout,
  checkoutLineItemsAdd,
  checkoutLineItemsUpdate,
  checkoutLineItemsRemove,
} from "helper/checkout";
import Cookies from "js-cookie";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { setCheckoutId, removeCheckoutId } from "helper/cookies";
import { CHECKOUT_QUERY, checkoutById } from "helper/checkout";

const ShopContext = React.createContext();

const ShopProvider = (props) => {
  const [isCartOpen, setCartOpen] = useState(false);
  const [checkout, setCheckout] = useState({ lineItems: { edges: [] } });

  const [
    lineItemAddMutation,
    {
      data: lineItemAddData,
      loading: lineItemAddLoading,
      error: lineItemAddError,
    },
  ] = useMutation(checkoutLineItemsAdd);

  const [
    lineItemUpdateMutation,
    {
      data: lineItemUpdateData,
      loading: lineItemUpdateLoading,
      error: lineItemUpdateError,
    },
  ] = useMutation(checkoutLineItemsUpdate);

  const [
    lineItemRemoveMutation,
    {
      data: lineItemRemoveData,
      loading: lineItemRemoveLoading,
      error: lineItemRemoveError,
    },
  ] = useMutation(checkoutLineItemsRemove);

  const [
    createCheckoutMutation,
    {
      data: createCheckoutData,
      loading: createCheckoutLoading,
      error: createCheckoutError,
    },
  ] = useMutation(createCheckout);

  useCheckoutEffect(createCheckoutData, "checkoutCreate", setCheckout);
  useCheckoutEffect(lineItemAddData, "checkoutLineItemsAdd", setCheckout);
  useCheckoutEffect(lineItemUpdateData, "checkoutLineItemsUpdate", setCheckout);
  useCheckoutEffect(lineItemRemoveData, "checkoutLineItemsRemove", setCheckout);

  const handleCartClose = () => {
    setCartOpen(false);
  };
  const handleCartOpen = () => {
    setCartOpen(true);
  };

  const { data: checkoutData } = useQuery(CHECKOUT_QUERY, {
    variables: checkoutById(Cookies.get("checkoutId")),
  });

  useEffect(() => {
    if (checkoutData) {
      setCheckout(checkoutData);
      console.log("get checkout data");
      if (checkout.node && checkout.node.completedAt) {
        removeCheckoutId();
        setCheckout({});
        console.log("remove checkoutId");
      }
    } else {
      const variables = { input: {} };
      createCheckoutMutation({ variables });
    }
  }, [checkout.id]);

  // useEffect(() => {
  //   if (checkoutData) {
  //   setCheckout(checkoutData);
  //   } else if (checkoutData && checkout.node && checkout.node.completedAt) {
  //   removeCheckoutId();
  //   setCheckout({});
  //   } else {
  //   const variables = { input: {} };
  //   createCheckoutMutation({ variables });
  //   }
  //   }, [checkout.id]);

  const addVariantToCartOne = (variantId, quantity) => {
    const variables = {
      checkoutId: checkout.id,
      lineItems: [{ variantId, quantity: parseInt(quantity, 10) }],
    };
    lineItemAddMutation({ variables }).then((res) => {
      setCheckoutId(checkout.id);
      setCartOpen(true);
    });
  };
  const addVariantToCartTwo = (variantId, quantity) => {
    const variables = {
      checkoutId: Cookies.get("checkoutId"),
      lineItems: [{ variantId, quantity: parseInt(quantity, 10) }],
    };
    lineItemAddMutation({ variables }).then((res) => {
      setCartOpen(true);
    });
  };

  const addLineItemButton = (variantId, quantity) => {
    if (Cookies.get("checkoutId")) {
      addVariantToCartTwo(variantId, quantity);
    } else {
      addVariantToCartOne(variantId, quantity);
    }
  };

  const updateLineItemInCartOne = (lineItemId, quantity) => {
    const variables = {
      checkoutId: checkout.id,
      lineItems: [{ id: lineItemId, quantity: parseInt(quantity, 10) }],
    };
    lineItemUpdateMutation({ variables });
  };

  const updateLineItemInCartTwo = (lineItemId, quantity) => {
    const variables = {
      checkoutId: Cookies.get("checkoutId"),
      lineItems: [{ id: lineItemId, quantity: parseInt(quantity, 10) }],
    };
    lineItemUpdateMutation({ variables });
  };
  const updateLineItem = (lineItemId, quantity) => {
    if (Cookies.get("checkoutId")) {
      updateLineItemInCartTwo(lineItemId, quantity);
    } else {
      updateLineItemInCartOne(lineItemId, quantity);
    }
  };

  const removeLineItemInCartOne = (lineItemId) => {
    const variables = { checkoutId: checkout.id, lineItemIds: [lineItemId] };
    lineItemRemoveMutation({ variables });
  };
  const removeLineItemInCartTwo = (lineItemId) => {
    const variables = {
      checkoutId: Cookies.get("checkoutId"),
      lineItemIds: [lineItemId],
    };
    lineItemRemoveMutation({ variables });
  };
  const removeLineItem = (lineItemId) => {
    if (Cookies.get("checkoutId")) {
      removeLineItemInCartTwo(lineItemId);
    } else {
      removeLineItemInCartOne(lineItemId);
    }
  };

  return (
    <ShopContext.Provider
      value={{
        checkout: checkout,
        isCartOpen: isCartOpen,
        handleCartOpen: handleCartOpen,
        removeLineItemInCart: removeLineItem,
        updateLineItemInCart: updateLineItem,
        handleCartClose: handleCartClose,
        addVariantToCart: addLineItemButton,
      }}
    >
      {!isCartOpen && (
        <div className="App__view-cart-wrapper">
          <a className="cart" onClick={handleCartOpen}>
            <FaCartPlus />
            &nbsp; Cart &nbsp;
            <span>
              ({checkout.node && checkout.node.lineItems.edges.length})
            </span>
          </a>
        </div>
      )}
      <Cart />
      {props.children}

      <style>
        {`
      .cart{
        font-size:20px;
        position:absolute;
        right:120px;
        top:25px;
        cursor:pointer;
      }
      `}
      </style>
    </ShopContext.Provider>
  );
};

const ShopConsumer = ShopContext.Consumer;

export { ShopConsumer, ShopContext };

export default ShopProvider;
