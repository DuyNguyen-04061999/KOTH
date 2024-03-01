import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import TableFilter from "./TableFilter";
import TableTemplate from "./TableTemplate";
import { useSelector } from "react-redux";
export default function ReferralTable() {
  const { device } = useSelector((state) => state.deviceReducer);
  const [filter, setFilter] = useState("all");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      fetch(
        "https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json"
      )
        .then((res) => res.json())
        .then((data) => {
          setLoading(false);
          setData(data);
        })
        .catch((err) => {
          setLoading(false);
          setData([]);
        });
    }, 3000);
  }, []);
  const row = [
    {
      header: "NO.",
      field: "name",
      condition: (field) => {
        return field;
      },
    },
    {
      header: "Display name",
      field: "name",
      condition: (name) => {
        return name.length > 5 ? name.slice(0, 5) + " ..." : name;
      },
    },
    {
      header: "Registration Date",
      condition: (field) => {
        return field;
      },
      field: "price",
    },
    {
      header: "Subscribed",
      condition: (field) => {
        return field;
      },
      field: "type",
    },
  ];
  return (
    <Box sx={{ marginTop: "35px", marginBottom: "35px" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          sx={{
            textAlign: "start",
            color: "#fff",
            marginLeft: "0px !important",
            fontSize: device === "Mobile" ? "15px" : "24px",
          }}
        >
          Referral
        </Typography>
        <TableFilter filter={filter} setFilter={setFilter} />
      </Box>
      <TableTemplate row={row} data={data} isLoading={loading} />
    </Box>
  );
}
