import {
  Box,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React from "react";
import Paper from "@mui/material/Paper";
import { useSelector } from "react-redux";

export default function TableTemplate({ row, data, isLoading, filter }) {
  const { device } = useSelector((state) => state.deviceReducer);
  return (
    <TableContainer
      component={Paper}
      sx={{
        maxHeight: "500px",
        backgroundColor: "#2E233D !important",
        color: "white !important",
        overflowY: "auto",
        marginTop: "35px",
        marginBottom: "70px",
      }}
    >
      {
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              {row?.map((item, index) => {
                return (
                  <TableCell
                    key={index}
                    sx={{
                      borderBottom: "none",
                      color: "#9384B7",
                      fontSize: device === "Mobile" ? "12px" : "14px",
                      fontWeight: "700",
                    }}
                    align="center"
                  >
                    {item?.header}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
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
                  <TableRow
                    key={index1}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                      backgroundColor: index1 % 2 === 0 ? "#443565" : "",
                      height: "auto",
                    }}
                  >
                    {row?.map((item, index) => {
                      return (
                        <TableCell
                          key={index}
                          sx={{
                            borderBottom: "none",
                            color: "white",
                            fontSize: device === "Mobile" ? "12px" : "14px",
                          }}
                          align="center"
                          component="th"
                          scope="row"
                        >
                          {item?.field === "index"
                            ? index1 + 1
                            : item?.condition(item?.valueGetter(p))}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))}
          </TableBody>
        </Table>
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
    </TableContainer>
  );
}
