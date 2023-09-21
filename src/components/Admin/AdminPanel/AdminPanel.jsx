import { Box, Button, Collapse, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useWindowDimensions from "../../../utils/useWindowDimensions";
import moment from "moment";
import { updateDetailAccount } from "../../../redux-saga-middleware_admin/reducers/adminReducer";
import DetailAccountDialogComponent from "../Dialog/DetailAccountDialogComponent";
import {
  openCreateDialog,
  openDetailDialog,
  openProvideDialog,
} from "../../../redux-saga-middleware_admin/reducers/adminDialogReducer";
import { activeAccount } from "../../../redux-saga-middleware_admin/reducers/adminConfigReducer";
import SearchBar from "../SearchBar/SearchBar";

const AdminPanel = () => {
  const { roles } = useSelector((state) => state.adminAuthReducer);
  const { detailAccount } = useSelector((state) => state.adminReducer_);
  const { listDistributor } = useSelector((state) => state.adminMasterReducer);
  const { listSub } = useSelector((state) => state.adminDistributorReducer);
  const { listRefs } = useSelector((state) => state.adminSubDistributorReducer);
  const { listEndUser } = useSelector((state) => state.adminAgentReducer);
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState("");
  const { width } = useWindowDimensions();

  const handleChangeSearch = (e) => {
    setSearchValue(e?.target?.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchValue) {
      if (roles && roles?.length > 0 && roles?.includes("master")) {
        const listFilter = listDistributor?.filter(
          (item) =>
            item?.account === String(searchValue)?.toLowerCase() ||
            item?.account?.includes(String(searchValue)?.toLowerCase())
        );
        if (listFilter && listFilter?.length > 0) {
          dispatch(updateDetailAccount(listFilter[0]));
          if (width < 576) {
            dispatch(openDetailDialog());
          }
        } else {
          dispatch(updateDetailAccount());
        }
      }

      if (roles && roles?.length > 0 && roles?.includes("distributor")) {
        const listFilter = listSub?.filter(
          (item) =>
            item?.account === String(searchValue)?.toLowerCase() ||
            item?.account?.includes(String(searchValue)?.toLowerCase())
        );
        if (listFilter && listFilter?.length > 0) {
          dispatch(updateDetailAccount(listFilter[0]));
          if (width < 576) {
            dispatch(openDetailDialog());
          }
        } else {
          dispatch(updateDetailAccount());
        }
      }

      if (roles && roles?.length > 0 && roles?.includes("sub_distributor")) {
        const listFilter = listRefs?.filter(
          (item) =>
            item?.account === String(searchValue)?.toLowerCase() ||
            item?.account?.includes(String(searchValue)?.toLowerCase())
        );
        if (listFilter && listFilter?.length > 0) {
          dispatch(updateDetailAccount(listFilter[0]));
          if (width < 576) {
            dispatch(openDetailDialog());
          }
        } else {
          dispatch(updateDetailAccount());
        }
      }

      if (roles && roles?.length > 0 && roles?.includes("agent")) {
        const listFilter = listEndUser?.filter(
          (item) =>
            item?.account === String(searchValue)?.toLowerCase() ||
            item?.account?.includes(String(searchValue)?.toLowerCase())
        );
        if (listFilter && listFilter?.length > 0) {
          dispatch(updateDetailAccount(listFilter[0]));
          if (width < 576) {
            dispatch(openDetailDialog());
          }
        } else {
          dispatch(updateDetailAccount());
        }
      }
    }
  };

  const ProvideTicketSVG = () => {
    return (
      <Box sx={{ marginRight: "10px" }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="15"
          height="12"
          fill="none"
          viewBox="0 0 15 12"
        >
          <path
            fill="#fff"
            d="M8.906 10.333a.844.844 0 01.076.04c1.333.895.989.766 2.651.776.302 0 .605.007.906-.005.807-.03 1.48-.674 1.485-1.48.015-2.434.015-4.869 0-7.304-.005-.819-.678-1.474-1.5-1.494-.652-.015-1.307-.031-1.957.009-.287.017-.58.141-.844.272-.285.142-.538.348-.822.537-.207-.159-.414-.317-.62-.479A1.578 1.578 0 007.28.861C5.381.86 3.481.856 1.583.863.678.868.01 1.532.005 2.433c-.007 2.377-.007 4.753 0 7.13.006.92.673 1.58 1.596 1.583 1.899.007 3.799 0 5.697 0 .354.004.698-.113.976-.33l.632-.483zm-.009-3.86a.468.468 0 11.325-.144.468.468 0 01-.325.142v.002zm-.472 1.77a.468.468 0 01.93-.08.468.468 0 01-.93.08zm.467-4.898a.468.468 0 01.464.467.468.468 0 01-.931-.003.468.468 0 01.466-.464h.001z"
          ></path>
        </svg>
      </Box>
    );
  };

  const handleActive = () => {
    if (detailAccount) {
      dispatch(
        activeAccount({
          accountName: detailAccount?.account,
          active: detailAccount?.status ? 0 : 1,
        })
      );
    }
  };

  return (
    <Box sx={{ marginTop: "60px" }}>
      <DetailAccountDialogComponent />
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
            searchValue={searchValue}
            onChange={handleChangeSearch}
            onSubmit={handleSubmit}
          ></SearchBar>
          <Box sx={{ marginLeft: "auto" }}>
            <Button
              children={"Create Account"}
              onClick={() => dispatch(openCreateDialog())}
              sx={{
                padding: { xs: "4px 14px", sm: "16px 34px" },
                backgroundColor: "#355DFF",
                borderRadius: { xs: "10px", sm: "16px" },
                color: "white",
                fontWeight: 700,
                fontSize: "14px",
                textTransform: "unset",
                ":hover": { backgroundColor: "#355DFF" },
              }}
            ></Button>
          </Box>
        </Box>
        <Collapse in={detailAccount}>
          <Grid
            container
            sx={(theme) => ({
              border: "2px solid #E4E4E4",
              borderRadius: "16px",
              marginTop: "24px",
              display: { xs: "none", sm: "grid" },
              gridTemplateColumns: "repeat(8,1fr)",
              [theme.breakpoints.down("lg")]: {
                gridTemplateColumns: "repeat(4,1fr)",
              },
            })}
          >
            <Grid
              sx={(theme) => ({
                padding: "24px",
                [theme.breakpoints.up("lg")]: {
                  borderRight: "2px solid #E4E4E4",
                },
              })}
            >
              <Typography
                sx={{
                  fontWeight: 500,
                  fontSize: "12px",
                  color: "#808191",
                  textAlign: "center",
                }}
              >
                Account
              </Typography>
              <Typography
                sx={{ fontWeight: 600, fontSize: "14px", textAlign: "center" }}
              >
                {detailAccount?.account || ""}
              </Typography>
            </Grid>
            <Grid
              sx={(theme) => ({
                padding: "24px",
                [theme.breakpoints.up("lg")]: {
                  borderRight: "2px solid #E4E4E4",
                },
              })}
            >
              <Typography
                sx={{
                  fontWeight: 500,
                  fontSize: "12px",
                  color: "#808191",
                  textAlign: "center",
                }}
              >
                Level
              </Typography>
              <Typography
                sx={{ fontWeight: 600, fontSize: "14px", textAlign: "center" }}
              >
                {detailAccount?.level || ""}
              </Typography>
            </Grid>
            <Grid
              sx={(theme) => ({
                padding: "24px",
                [theme.breakpoints.up("lg")]: {
                  borderRight: "2px solid #E4E4E4",
                },
              })}
            >
              <Typography
                sx={{
                  fontWeight: 500,
                  fontSize: "12px",
                  color: "#808191",
                  textAlign: "center",
                }}
              >
                Revenue
              </Typography>
              <Typography
                sx={{ fontWeight: 600, fontSize: "14px", textAlign: "center" }}
              >
                _
              </Typography>
            </Grid>
            <Grid
              sx={(theme) => ({
                padding: "24px",
                [theme.breakpoints.up("lg")]: {
                  borderRight: "2px solid #E4E4E4",
                },
              })}
            >
              <Typography
                sx={{
                  fontWeight: 500,
                  fontSize: "12px",
                  color: "#808191",
                  textAlign: "center",
                }}
              >
                Ticket
              </Typography>
              <Typography
                sx={{ fontWeight: 600, fontSize: "14px", textAlign: "center" }}
              >
                {detailAccount?.ticket || 0}
              </Typography>
            </Grid>
            <Grid
              sx={(theme) => ({
                padding: "24px",
                [theme.breakpoints.up("lg")]: {
                  borderRight: "2px solid #E4E4E4",
                },
              })}
            >
              <Typography
                sx={{
                  fontWeight: 500,
                  fontSize: "12px",
                  color: "#808191",
                  textAlign: "center",
                }}
              >
                RefCode
              </Typography>
              <Typography
                sx={{ fontWeight: 600, fontSize: "14px", textAlign: "center" }}
              >
                {detailAccount?.ref || ""}
              </Typography>
            </Grid>
            <Grid
              sx={(theme) => ({
                padding: "24px",
                [theme.breakpoints.up("lg")]: {
                  borderRight: "2px solid #E4E4E4",
                },
              })}
            >
              <Typography
                sx={{
                  fontWeight: 500,
                  fontSize: "12px",
                  color: "#808191",
                  textAlign: "center",
                }}
              >
                Register Date
              </Typography>
              <Typography
                sx={{ fontWeight: 600, fontSize: "14px", textAlign: "center" }}
              >
                {detailAccount?.date
                  ? moment(detailAccount?.date).format("ll")
                  : ""}
              </Typography>
            </Grid>
            <Grid
              sx={(theme) => ({
                padding: "24px",
                [theme.breakpoints.up("lg")]: {
                  borderRight: "2px solid #E4E4E4",
                },
              })}
            >
              <Typography
                sx={{
                  fontWeight: 500,
                  fontSize: "12px",
                  color: "#808191",
                  textAlign: "center",
                }}
              >
                Amount Account
              </Typography>
              <Typography
                sx={{ fontWeight: 600, fontSize: "14px", textAlign: "center" }}
              >
                {detailAccount?.amount || 0}
              </Typography>
            </Grid>
            <Grid sx={{ padding: "24px", flex: 1 }}>
              <Typography
                sx={{
                  fontWeight: 500,
                  fontSize: "12px",
                  color: "#808191",
                  textAlign: "center",
                }}
              >
                Status
              </Typography>
              <Button
                onClick={handleActive}
                children={detailAccount?.status ? "Active" : "Prohibit"}
                sx={{
                  fontSize: "14px",
                  borderRadius: "16px",
                  padding: "2px 16px",
                  bgcolor: detailAccount?.status ? "#355DFF" : "#FF4135",
                  color: "#FFF",
                  fontWeight: 700,
                  marginTop: "12px",
                  textTransform: "unset",
                  ":hover": {
                    backgroundColor: detailAccount?.status
                      ? "#355DFF"
                      : "#FF4135",
                  },
                }}
              />
            </Grid>
          </Grid>
        </Collapse>
        {detailAccount && (
          <Box sx={{ display: { xs: "none", sm: "flex" }, marginTop: "24px" }}>
            <Button
              onClick={() => dispatch(openProvideDialog())}
              sx={{
                backgroundColor: "#FF9F38",
                fontWeight: 700,
                fontSize: "14px",
                textTransform: "unset",
                color: "white",
                padding: "8px 24px",
                borderRadius: "16px",
                ":hover": { backgroundColor: "#FF9F38" },
              }}
            >
              <ProvideTicketSVG></ProvideTicketSVG>
              Provide Ticket
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default AdminPanel;
