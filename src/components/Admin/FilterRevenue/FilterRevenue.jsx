import React from "react";
import SearchBar from "../SearchBar/SearchBar";
import { Box, Button, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import useWindowDimensions from "../../../utils/useWindowDimensions";

const FilterRevenue = () => {
  const { roles } = useSelector((state) => state.adminAuthReducer);
  const { width } = useWindowDimensions();
  const listAction = [
    "Today",
    "Yesterday",
    "This week",
    "Last week",
    "This month",
    "Last month",
  ];

  // const handleChangeSearch = (e) => {
  //   setSearchValue(e?.target?.value);
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (searchValue) {
  //     if (roles && roles?.length > 0 && roles?.includes("master")) {
  //       const listFilter = listDistributor?.filter(
  //         (item) =>
  //           item?.account === String(searchValue)?.toLowerCase() ||
  //           item?.account?.includes(String(searchValue)?.toLowerCase())
  //       );
  //       if (listFilter && listFilter?.length > 0) {
  //         dispatch(updateDetailAccount(listFilter[0]));
  //         if (width < 576) {
  //           dispatch(openDetailDialog());
  //         }
  //       } else {
  //         dispatch(updateDetailAccount());
  //       }
  //     }

  //     if (roles && roles?.length > 0 && roles?.includes("distributor")) {
  //       const listFilter = listSub?.filter(
  //         (item) =>
  //           item?.account === String(searchValue)?.toLowerCase() ||
  //           item?.account?.includes(String(searchValue)?.toLowerCase())
  //       );
  //       if (listFilter && listFilter?.length > 0) {
  //         dispatch(updateDetailAccount(listFilter[0]));
  //         if (width < 576) {
  //           dispatch(openDetailDialog());
  //         }
  //       } else {
  //         dispatch(updateDetailAccount());
  //       }
  //     }

  //     if (roles && roles?.length > 0 && roles?.includes("sub_distributor")) {
  //       const listFilter = listRefs?.filter(
  //         (item) =>
  //           item?.account === String(searchValue)?.toLowerCase() ||
  //           item?.account?.includes(String(searchValue)?.toLowerCase())
  //       );
  //       if (listFilter && listFilter?.length > 0) {
  //         dispatch(updateDetailAccount(listFilter[0]));
  //         if (width < 576) {
  //           dispatch(openDetailDialog());
  //         }
  //       } else {
  //         dispatch(updateDetailAccount());
  //       }
  //     }

  //     if (roles && roles?.length > 0 && roles?.includes("agent")) {
  //       const listFilter = listEndUser?.filter(
  //         (item) =>
  //           item?.account === String(searchValue)?.toLowerCase() ||
  //           item?.account?.includes(String(searchValue)?.toLowerCase())
  //       );
  //       if (listFilter && listFilter?.length > 0) {
  //         dispatch(updateDetailAccount(listFilter[0]));
  //         if (width < 576) {
  //           dispatch(openDetailDialog());
  //         }
  //       } else {
  //         dispatch(updateDetailAccount());
  //       }
  //     }
  //   }
  // };

  return (
    <Box sx={{ marginTop: "80px" }}>
      <Typography
        sx={{
          textAlign: "start",
          fontWeight: { xs: 700, sm: 600 },
          fontSize: { xs: "20px", sm: "24px" },
        }}
      >
        {width < 576
          ? `${roles?.includes("agent") ? "User Manager" : "Admin Structure"}`
          : `Welcome
            ${
              roles?.includes("master")
                ? "Master"
                : roles?.includes("distributor")
                ? "Distributor"
                : roles?.includes("sub_distributor")
                ? "Sub Distributor"
                : "Agent"
            } Account`}
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          border: { xs: "unset", sm: "2px solid #E4E4E4" },
          borderRadius: "16px",
          padding: "18px",
          marginTop: { xs: "-52px", sm: "24px" },
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: { xs: "column-reverse", sm: "row" },
          }}
        >
          <SearchBar
          // searchValue={searchValue}
          // onChange={handleChangeSearch}
          // onSubmit={handleSubmit}
          ></SearchBar>
        </Box>
        <Box sx={{ marginTop: "42px" }}>
          <Box></Box>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(6,1fr)",
              width: "61%",
              gridColumnGap: "20px",
              placeItems: "center",
              marginLeft: "90px",
            }}
          >
            {listAction?.map((item, index) => (
              <Button
                sx={{
                  fontSize: "12px",
                  textTransform: "unset",
                  borderRadius: "16px",
                  backgroundColor: "#355DFF",
                  color: "white",
                  fontWeight: 700,
                  height: "32px",
                  width: "100%",
                  ":hover": {
                    backgroundColor: "#355DFF",
                    opacity: 0.9,
                  },
                }}
              >
                {item}
              </Button>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default FilterRevenue;
