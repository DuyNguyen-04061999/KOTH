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
            padding: "20px",
          }}
        >
          <Typography>No data loaded!</Typography>
        </Box>
      )}
    </Box>
  );
}
