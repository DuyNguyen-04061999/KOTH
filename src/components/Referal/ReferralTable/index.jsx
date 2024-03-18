import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import TableFilter from "./TableFilter";
import TableTemplate from "./TableTemplate";
import { useSelector } from "react-redux";
import moment from "moment";
import { imagesReferral } from "../../../utils/imagesReferral";
export default function ReferralTable() {
  const { device } = useSelector((state) => state.deviceReducer);
  const { registerList, isGetRegisterReady } = useSelector(
    (state) => state.referralReducer
  );
  const [filter, setFilter] = useState("all");

  const row = [
    {
      header: "NO.",
      field: "index",
    },
    {
      header: "Display name",
      condition: (name) => {
        return name
          ? name?.length > 20
            ? name.slice(0, 10) + " ..."
            : name
          : "";
      },
      valueGetter: (item) => {
        return item?.userNickName;
      },
    },
    {
      header: "Registration Date",
      condition: (field) => {
        return moment(field)?.format("LL");
      },
      valueGetter: (item) => {
        return item?.updatedAt;
      },
      field: "price",
    },
    {
      header: "Subscribed",
      condition: (field) => {
        return (
          <Box
            component={"img"}
            src={
              field ? imagesReferral.checkedIcon : imagesReferral.uncheckIcon
            }
          ></Box>
        );
      },
      valueGetter: (item) => {
        return item?.hasBuySubscription;
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
      <TableTemplate
        filter={filter}
        row={row}
        data={registerList}
        isLoading={isGetRegisterReady}
      />
    </Box>
  );
}
