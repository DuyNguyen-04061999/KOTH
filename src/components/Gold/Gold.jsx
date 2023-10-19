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
          width="27"
          height="26"
          fill="none"
          viewBox="0 0 27 26"
        >
          <g>
            <path
              fill="#20093B"
              d="M13.531 25.948c7.215 0 13.063-5.797 13.063-12.949 0-7.15-5.848-12.948-13.063-12.948C6.317.05.468 5.848.468 12.999c0 7.152 5.849 12.949 13.063 12.949z"
            ></path>
            <g>
              <path
                fill="#FFE14D"
                d="M13.531 21.631c4.81 0 8.709-3.865 8.709-8.632 0-4.768-3.9-8.633-8.709-8.633-4.81 0-8.708 3.865-8.708 8.633 0 4.767 3.898 8.632 8.708 8.632z"
              ></path>
              <path
                fill="#FB3"
                d="M22.24 12.999c0-4.76-3.907-8.633-8.709-8.633v17.265c4.802 0 8.709-3.872 8.709-8.632z"
              ></path>
              <g>
                <g>
                  <path
                    fill="#FB3"
                    d="M13.531 19.575c-3.658 0-6.634-2.95-6.634-6.576 0-3.625 2.976-6.575 6.634-6.575 3.658 0 6.633 2.95 6.633 6.575 0 3.626-2.975 6.576-6.633 6.576z"
                  ></path>
                </g>
              </g>
              <path
                fill="#E68A2E"
                d="M20.165 12.998c0-3.625-2.976-6.575-6.634-6.575v13.15c3.658 0 6.633-2.95 6.633-6.575z"
              ></path>
              <g>
                <path
                  fill="#FFE14D"
                  d="M14.042 12.528v-2c.587.143 1.02.517 1.02.947 0 .28.228.506.51.506.283 0 .51-.226.51-.506 0-.977-.877-1.794-2.04-1.982v-.547a.508.508 0 00-.51-.506.508.508 0 00-.51.506v.547c-1.164.188-2.042 1.005-2.042 1.982 0 .978.878 1.795 2.041 1.982v2c-.587-.142-1.02-.517-1.02-.947a.508.508 0 00-.51-.506.508.508 0 00-.511.506c0 .977.878 1.795 2.041 1.982v.552c0 .28.228.506.51.506.282 0 .51-.226.51-.506v-.552c1.164-.188 2.042-1.005 2.042-1.982 0-.977-.878-1.794-2.041-1.982zM12 11.475c0-.43.433-.804 1.02-.947v1.894c-.587-.142-1.02-.517-1.02-.947zm2.04 3.982v-1.894c.588.143 1.021.517 1.021.947 0 .43-.433.805-1.02.947z"
                ></path>
              </g>
              <path
                fill="#FB3"
                d="M14.041 17.044v-.552c1.164-.188 2.041-1.005 2.041-1.982 0-.977-.877-1.794-2.04-1.982v-2c.586.143 1.02.517 1.02.947 0 .28.228.506.51.506.282 0 .51-.226.51-.506 0-.977-.877-1.794-2.04-1.982v-.547a.508.508 0 00-.511-.506v9.11c.282 0 .51-.226.51-.506zm0-3.481c.587.143 1.02.517 1.02.947 0 .43-.433.805-1.02.947v-1.894z"
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
            formatMoney(Number.parseFloat(value)) : Number.parseFloat(value) > 100000 ? "100,000+" : 0}
        </Typography>
      </div>
    </div>
  );
}
