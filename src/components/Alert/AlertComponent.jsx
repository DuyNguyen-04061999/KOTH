import React, { useEffect } from "react";
import { Alert } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { hideAlert } from "../../redux-saga-middleware/reducers/alertReducer";

export default function AlertComponent() {
  const { isShow, message, type } = useSelector((state) => state.alertReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isShow) {
      setTimeout(() => {
        dispatch(hideAlert());
      }, 3000);
    }
  }, [isShow, dispatch]);

  return (
    <div
      className="position-fixed"
      style={{
        top: 70,
        right: 10,
        zIndex: 1310,
        boxShadow:
          "rgba(0,0,0,0.25) 5px 19px 33px, rgba(0,0,0,0.22) 5px 15px 15px",
        width: 200,
      }}
    >
      <Alert
        onClick={() => dispatch(hideAlert())}
        hidden={!isShow}
        variant="filled"
        severity={type}
        sx={{ color: "white" }}
      >
        {message}
      </Alert>
    </div>
  );
}
