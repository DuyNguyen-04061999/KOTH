import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { hideToastNotification } from "../../redux-saga-middleware/reducers/alertReducer";
import { images } from "../../utils/images";
import useWindowDimensions from "../../utils/useWindowDimensions";

export default function ToastNotification() {
  const {
    isShowToastNotification,
    messageToastNotification,
    typeToastNotification,
  } = useSelector((state) => state.alertReducer);

  const dispatch = useDispatch();
  const { width } = useWindowDimensions();
  useEffect(() => {
    if (isShowToastNotification) {
      switch (typeToastNotification) {
        case "error":
          toast.error(messageToastNotification || "This is default notify!", {
            icon: ({ theme, type }) => (
              <img
                style={{ width: "20px", marginRight: "10px" }}
                alt="..."
                src={images.closeButtonToast}
              />
            ),
            position: "top-center",
            className:
              // width < 576 ? "error-background-small" : "error-background",
              "error-background",
          });
          break;
        case "warning":
          toast.warning(messageToastNotification || "This is default notify!", {
            icon: ({ theme, type }) => (
              <img
                style={{ width: "20px", marginRight: "10px" }}
                alt="..."
                src={images.WarningIcon}
              />
            ),
            position: "top-center",
            className:
              width < 576 ? "warning-background-small" : "warning-background",
          });
          break;
        case "success":
          toast.success(messageToastNotification || "This is default notify!", {
            icon: ({ theme, type }) => (
              <img
                style={{ width: "20px", marginRight: "10px" }}
                alt="..."
                src={images.successIcon}
              />
            ),
            position: "top-center",
            className:
              // width < 576 ? "success-background-small" : "success-background",
              "success-background",
          });
          break;
        case "info":
          toast.info(messageToastNotification || "This is default notify!");
          break;
        default:
          toast.info("This is default notify!");
      }
    }
    setTimeout(() => {
      dispatch(hideToastNotification());
    }, 3000);
  }, [
    messageToastNotification,
    isShowToastNotification,
    typeToastNotification,
    dispatch,
  ]);

  return <></>;
}
