import Cookies from "js-cookie";

export const getCheckoutId = () => {
  return Cookies.get("checkoutId");
};

export const setCheckoutId = (checkoutId) => {
  Cookies.set("checkoutId", checkoutId, {
    expires: 6,
  });
};

export const removeCheckoutId = () => {
  Cookies.remove("checkoutId");
};
