export const getPaypal = (data) => {
  return {
    type: "GET_PAYPAL",
    payload: data,
  };
};
const payPalReducer = (
  state = {
    isFetchPayPal: false,
    PayPalURL: "",
    isAlertDialog: false,
    typeAlert: "success",
  },
  action
) => {
  const { type, payload } = action;
  switch (type) {
    case "GET_PAYPAL":
      return {
        ...state,
        isFetchPayPal: true,
      };
    case "GET_PAYPAL_SUCCESS":
      return {
        ...state,
        isFetchPayPal: false,
        PayPalURL: payload?.paymentLink,
      };
    case "GET_PAYPAL_FAIL":
      return { ...state, isFetchPayPal: false };
    default:
      return { ...state };
  }
};
export default payPalReducer;
