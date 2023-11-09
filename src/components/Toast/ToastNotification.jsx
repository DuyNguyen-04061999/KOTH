import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { hideToastNotification } from "../../redux-saga-middleware/reducers/alertReducer";

export default function ToastNotification() {
  const {
    isShowToastNotification,
    messageToastNotification,
    typeToastNotification,
  } = useSelector((state) => state.alertReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    if (isShowToastNotification) {
      switch (typeToastNotification) {
        case "error":
          toast.error(messageToastNotification || "This is default notify!");
          break;
        case "warning":
          toast.warning(messageToastNotification || "This is default notify!");
          break;
        case "success":
          toast.success(messageToastNotification || "This is default notify!");
          break;
        case "info":
          toast.info(messageToastNotification || "This is default notify!");
          break;
        default:
          toast.info("This is default notify!");
      }
    }
    const timeOut = setTimeout(() => {
      dispatch(hideToastNotification());
    }, 2000);
    return () => {
      clearTimeout(timeOut);
    };
  }, [
    messageToastNotification,
    isShowToastNotification,
    typeToastNotification,
    dispatch,
  ]);

  return <></>;
}
