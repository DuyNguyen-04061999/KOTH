import { Box, Dialog } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toggleAlertStripeProcess } from "../../../redux-saga-middleware/reducers/stripeReducer";
import useWindowDimensions from "../../../utils/useWindowDimensions";

export default function StripeAlertComponent() {
  const navigate = useNavigate();
  const { isAlertDialog, typeAlert } = useSelector(
    (state) => state.stripeReducer
  );
  const dispatch = useDispatch();
  const { width } = useWindowDimensions();

  return (
    <Dialog
      open={isAlertDialog}
      onClose={() => {
        navigate("/");
        dispatch(toggleAlertStripeProcess());
      }}
      PaperProps={{
        style: {
          width: width < 576 ? "60%" : "30%",
          backgroundColor:
            typeAlert && typeAlert === "success" ? "#9ED458" : "#F3D886",
          boxShadow: "1px 2px 9px #404040",
        },
      }}
    >
      <Box component={"div"} className="position-relative rounded p-3" sx={{}}>
        <Box
          component={"div"}
          className="position-absolute cursor-pointer"
          
          sx={{ right: 10, top: 10 }}
        >
          {typeAlert && typeAlert === "success" ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              fill="none"
              viewBox="0 0 18 18"
              onClick={() => {
                navigate("/");
                dispatch(toggleAlertStripeProcess());
              }}
            >
              <path
                fill="#466717"
                stroke="#466717"
                d="M16.646 4.06L4.061 16.647a1.5 1.5 0 01-2.122 0l-.585-.585a1.5 1.5 0 010-2.122L13.939 1.354a1.5 1.5 0 012.122 0l.585.585a1.5 1.5 0 010 2.122z"
              ></path>
              <path
                fill="#466717"
                stroke="#466717"
                d="M13.94 16.646L1.353 4.061a1.5 1.5 0 010-2.122l.585-.585a1.5 1.5 0 012.122 0l12.585 12.585a1.5 1.5 0 010 2.122l-.585.585a1.5 1.5 0 01-2.122 0z"
              ></path>
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              fill="none"
              viewBox="0 0 18 18"
            >
              <path
                fill="#997D24"
                stroke="#997D24"
                d="M16.646 4.06L4.061 16.647a1.5 1.5 0 01-2.122 0l-.585-.585a1.5 1.5 0 010-2.122L13.939 1.354a1.5 1.5 0 012.122 0l.585.585a1.5 1.5 0 010 2.122z"
              ></path>
              <path
                fill="#997D24"
                stroke="#997D24"
                d="M13.94 16.646L1.353 4.061a1.5 1.5 0 010-2.122l.585-.585a1.5 1.5 0 012.122 0l12.585 12.585a1.5 1.5 0 010 2.122l-.585.585a1.5 1.5 0 01-2.122 0z"
              ></path>
            </svg>
          )}
        </Box>
        <Box component={"div"} className="d-flex justify-content-center mt-3">
          {typeAlert && typeAlert === "success" ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="33"
              height="32"
              fill="none"
              viewBox="0 0 33 32"
            >
              <path
                fill="#466717"
                d="M16.517 0c8.83.008 15.998 7.211 15.983 16.048-.023 8.803-7.209 15.96-16.017 15.952C7.653 31.989.479 24.789.5 15.952.521 7.15 7.708-.008 16.517 0zm-2.5 18.65l-.599-.548c-1.23-1.124-2.45-2.259-3.693-3.373-.578-.515-1.24-.571-1.85-.234-.58.321-.921.96-.732 1.642.126.412.358.785.672 1.08 1.611 1.51 3.25 2.986 4.89 4.47 1.097.992 1.784.971 2.841-.08 3.193-3.166 6.385-6.335 9.575-9.507a4.91 4.91 0 00.469-.5 1.598 1.598 0 00-.125-2.063 1.577 1.577 0 00-2.094-.195c-.21.169-.41.354-.593.552l-8.76 8.756z"
              ></path>
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="33"
              height="31"
              fill="none"
              viewBox="0 0 33 31"
            >
              <path
                fill="#997D24"
                d="M16.525 30.313c3.666 0 7.332.01 11.003 0 2.604-.014 4.472-1.545 4.909-4.013.207-1.167-.114-2.227-.67-3.248A3187.062 3187.062 0 0124.547 9.72c-1.263-2.333-2.54-4.657-3.784-7C19.837.977 18.427-.012 16.46 0c-1.942.013-3.317 1.005-4.24 2.723A8226.07 8226.07 0 011.19 23.113c-1.188 2.202-.819 4.496.928 6.04.975.862 2.138 1.162 3.408 1.16 3.666-.004 7.332-.005 11 0zm-1.904-15.996v-4.52c0-1.282.758-2.107 1.895-2.096 1.107.01 1.848.83 1.85 2.078.007 2.993.007 5.985 0 8.977 0 1.256-.787 2.126-1.895 2.11-1.088-.015-1.844-.862-1.85-2.091-.009-1.484 0-2.97 0-4.458zm0 10.309c.038-.475.254-.917.604-1.238a1.87 1.87 0 012.555.023c.344.328.552.774.582 1.249a1.887 1.887 0 01-.604 1.238 1.87 1.87 0 01-2.554-.022 1.888 1.888 0 01-.583-1.248v-.002z"
              ></path>
            </svg>
          )}
        </Box>
        <Box
          component={"div"}
          className="text-center mt-4"
          sx={{
            color: typeAlert && typeAlert === "success" ? "#466717" : "#997D24",
            fontSize: "20px",
          }}
        >
          <span
            className=""
            style={{
              fontWeight: "bold",
            }}
          >
            {typeAlert && typeAlert === "success"
              ? "Payment Success"
              : "Payment Error"}
          </span>
        </Box>
        <Box
          component={"div"}
          className="d-flex justify-content-center align-items-center text-center mt-3 mb-2"
          sx={{
            color: "#404040",
            fontSize: "14px",
          }}
        >
          After a successful payment, the customer return to your websites.
        </Box>
      </Box>
    </Dialog>
  );
}
