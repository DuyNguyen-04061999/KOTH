import { Box, CircularProgress, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { sliceString } from "../../../../utils/stringSlice";

export default function TableTemplate({ row, data, isLoading, filter }) {
  const { device } = useSelector((state) => state.deviceReducer);
  return (
    <Box
      sx={{
        maxHeight: "500px",
        backgroundColor: "#2E233D !important",
        color: "white !important",
        marginTop: "35px",
        marginBottom: "70px",
        overflowY: "scroll",
        tableLayout: "fixed",
        width: "100%",
        maxWidth: "100%",
      }}
    >
      {
        <table style={{ width: "100%" }}>
          <thead>
            <tr>
              {row?.map((item, index) => {
                return (
                  <th
                    key={index}
                    style={{
                      borderBottom: "none",
                      padding: device === "Mobile" ? "10px" : "15px",
                      width: item?.header === "NO." ? "10%" : "30%",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: device === "Mobile" ? "12px" : "14px",
                        color: "#9384B7",
                        fontWeight: "700",
                        textAlign: "center",
                      }}
                    >
                      {item?.header}
                    </Typography>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {data?.length > 0 &&
              data
                .filter((n) => {
                  return filter === "all"
                    ? n
                    : filter === "sub"
                    ? n.hasBuySubscription === true
                    : n.hasBuySubscription === false;
                })
                .map((p, index1) => (
                  <tr
                    key={index1}
                    style={{
                      backgroundColor: index1 % 2 === 0 ? "#443565" : "",
                      height: "auto",
                    }}
                  >
                    {row?.map((item, index) => {
                      return (
                        <td
                          key={index}
                          style={{
                            borderBottom: "none",
                            color: "white",
                            padding: device === "Mobile" ? "10px" : "15px",
                            width: item?.header === "NO." ? "10%" : "30%",
                          }}
                        >
                          <Typography
                            sx={{
                              fontSize: device === "Mobile" ? "12px" : "14px",
                              textAlign: "center",
                            }}
                          >
                            {" "}
                            {item?.field === "index"
                              ? index1 + 1
                              : item?.field === "displayName"
                              ? sliceString(
                                  item?.condition(item?.valueGetter(p)),
                                  device === "Mobile" ? 4 : 10
                                )
                              : item?.condition(item?.valueGetter(p))}
                          </Typography>
                        </td>
                      );
                    })}
                  </tr>
                ))}
          </tbody>
        </table>
      }

      {isLoading && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "20px",
          }}
        >
          <CircularProgress color="secondary" />
        </Box>
      )}
      {!isLoading && data?.length === 0 && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            padding: "10px 20px",
            color: "rgb(151, 151, 151)",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            fill="none"
            viewBox="0 0 72 72"
          >
            <g opacity="0.72">
              <path
                fill="#403055"
                d="M36 69.333c18.41 0 33.334-14.923 33.334-33.333C69.334 17.59 54.41 2.667 36 2.667 17.59 2.667 2.667 17.59 2.667 36c0 18.41 14.924 33.333 33.333 33.333z"
              ></path>
              <path
                fill="#745C97"
                d="M66.933 44.933c0 .507-.287.967-.733 1.194l-.214.1a4.653 4.653 0 00-2.426 3.026c-.147.6-.68 1.014-1.294 1.014a1.326 1.326 0 01-1.293-1.014 4.625 4.625 0 00-2.427-3.02l-.213-.106a1.34 1.34 0 010-2.387l.213-.1a4.653 4.653 0 002.427-3.027c.147-.6.68-1.013 1.293-1.013.614 0 1.147.413 1.294 1.013a4.625 4.625 0 002.426 3.02l.214.107c.446.227.733.687.733 1.193z"
              ></path>
              <path
                fill="#745C97"
                d="M15.6 46.2a.764.764 0 01-.376.671l-.11.056c-.624.346-1.08.964-1.248 1.703-.075.337-.35.57-.665.57-.316 0-.59-.233-.665-.57-.168-.739-.624-1.358-1.248-1.699l-.11-.06a.764.764 0 01-.377-.671c0-.285.147-.544.377-.671l.11-.057c.624-.345 1.08-.963 1.248-1.702.075-.338.35-.57.665-.57.315 0 .59.232.665.57.168.739.624 1.357 1.248 1.699l.11.06c.23.127.377.386.377.671z"
              ></path>
              <path
                fill="#745C97"
                d="M14 55.333c0 .507-.286.967-.733 1.194l-.213.1a4.652 4.652 0 00-2.427 3.026c-.147.6-.68 1.014-1.293 1.014a1.326 1.326 0 01-1.294-1.014 4.625 4.625 0 00-2.426-3.02l-.214-.106a1.34 1.34 0 010-2.387l.214-.1a4.652 4.652 0 002.426-3.027c.147-.6.68-1.013 1.294-1.013.613 0 1.146.413 1.293 1.013a4.625 4.625 0 002.427 3.02l.213.107c.447.227.733.687.733 1.193z"
              ></path>
              <path
                fill="#6C528E"
                d="M54.666 8.38v25.147c0 1.513-.853 2.9-2.213 3.58L36 45.333l-16.454-8.226a4.006 4.006 0 01-2.213-3.58V8.38a34.753 34.753 0 012.833-1.713h31.667c.973.526 1.92 1.1 2.833 1.713z"
              ></path>
              <path fill="#4F3571" d="M42 6.667H30v38.666h12V6.667z"></path>
              <path
                fill="#392852"
                d="M36 72c10.309 0 18.666-8.357 18.666-18.667 0-10.309-8.357-18.666-18.666-18.666-10.31 0-18.667 8.357-18.667 18.666C17.333 63.643 25.69 72 36 72z"
              ></path>
              <path
                fill="#745C97"
                d="M47.981 49.567l-2 11.333a1.337 1.337 0 01-1.313 1.1H27.335c-.647 0-1.2-.467-1.314-1.1l-2-11.333a1.33 1.33 0 01.627-1.374 1.327 1.327 0 011.507.087l4.793 3.733 3.9-6.686c.24-.407.68-.66 1.154-.66.473 0 .913.253 1.153.66l3.9 6.686 4.793-3.733a1.327 1.327 0 011.507-.087c.473.28.72.827.627 1.374z"
              ></path>
            </g>
          </svg>
          <Typography
            sx={{
              marginTop: "10px",
              fontSize: device === "Mobile" ? "12px" : "14px",
            }}
          >
            Your referral sheet is empty! Invite friends to receive rewards.
          </Typography>
        </Box>
      )}
    </Box>
  );
}
