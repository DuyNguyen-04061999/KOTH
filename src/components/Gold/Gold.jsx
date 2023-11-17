import { Typography } from "@mui/material";
import React from "react";
import { formatMoney } from "../../utils/helper";
import useWindowDimensions from "../../utils/useWindowDimensions";

export default function Gold(props) {
  const { value } = props;
  const { width } = useWindowDimensions();
  return (
    <div
      style={{
        padding: "0px 5px",
        flexDirection: width > 576 ? "column" : "",
        display: "flex",
        alignItems: "center",
      }}
    >
      <div className="d-flex align-items-center">
      <svg
      xmlns="http://www.w3.org/2000/svg"
      width="28"
      height="28"
      fill="none"
      viewBox="0 0 28 28"
    >
      <g>
        <path
          fill="#20093B"
          d="M13.842 27.296c7.343 0 13.296-5.953 13.296-13.296 0-7.343-5.953-13.295-13.296-13.295C6.5.705.547 6.657.547 14s5.952 13.296 13.295 13.296z"
        ></path>
        <g>
          <path
            fill="#FFE14D"
            d="M13.843 26.409c6.853 0 12.409-5.556 12.409-12.41 0-6.853-5.556-12.409-12.41-12.409C6.99 1.59 1.435 7.146 1.435 14c0 6.853 5.555 12.409 12.409 12.409z"
          ></path>
          <path
            fill="#FB3"
            d="M26.252 14c0-6.843-5.567-12.41-12.41-12.41V26.41c6.843 0 12.41-5.567 12.41-12.41z"
          ></path>
          <g>
            <g>
              <path
                fill="#FB3"
                d="M13.843 23.452c-5.212 0-9.452-4.24-9.452-9.452s4.24-9.453 9.452-9.453 9.452 4.24 9.452 9.453c0 5.212-4.24 9.452-9.452 9.452z"
              ></path>
            </g>
          </g>
          <path
            fill="#E68A2E"
            d="M23.295 14c0-5.212-4.24-9.453-9.452-9.453v18.905c5.212 0 9.452-4.24 9.452-9.452z"
          ></path>
          <g>
            <path
              fill="#FFE14D"
              d="M14.57 13.323v-2.875c.837.205 1.455.743 1.455 1.362a.727.727 0 101.454 0c0-1.405-1.25-2.58-2.908-2.85v-.786a.727.727 0 10-1.455 0v.786c-1.657.27-2.908 1.445-2.908 2.85s1.25 2.58 2.908 2.85v2.874c-.836-.205-1.454-.743-1.454-1.362a.727.727 0 10-1.454 0c0 1.405 1.25 2.58 2.908 2.85v.793a.727.727 0 101.455 0v-.793c1.657-.27 2.908-1.445 2.908-2.85 0-1.404-1.25-2.58-2.908-2.85zm-2.908-1.513c0-.619.618-1.157 1.454-1.362v2.724c-.836-.206-1.454-.744-1.454-1.362zm2.909 5.724v-2.723c.836.205 1.454.743 1.454 1.361 0 .619-.618 1.157-1.454 1.362z"
            ></path>
          </g>
          <path
            fill="#FB3"
            d="M14.57 19.816v-.793c1.658-.27 2.908-1.445 2.908-2.85 0-1.404-1.25-2.579-2.908-2.85V10.45c.836.205 1.454.743 1.454 1.362a.727.727 0 101.454 0c0-1.405-1.25-2.58-2.908-2.85v-.786a.727.727 0 00-.727-.727v13.095a.727.727 0 00.727-.727zm0-5.004c.836.205 1.454.743 1.454 1.361 0 .619-.618 1.157-1.454 1.362v-2.723z"
          ></path>
        </g>
      </g>
    </svg>
        <Typography
          style={{
            color: width > 576 ? "#FB3" : "#FB3",
            fontSize: "15px",
            marginLeft: "5px",
            fontWeight: "500 !important",
            marginRight: "2px",
          }}
        >
          {value &&
            Number.parseFloat(value) > 0 && Number.parseFloat(value) < 100000 ?
            formatMoney(Number.parseFloat(value)) : Number.parseFloat(value) >= 100000 ? "100,000+" : 0}
        </Typography>
      </div>
    </div>
  );
}
