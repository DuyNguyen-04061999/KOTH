import CopyIcon from "@mui/icons-material/CopyAll";
import { Box, Button, Collapse, Grid, Typography } from "@mui/material";
import copy from "copy-to-clipboard";
import moment from "moment";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import { getListEndUser } from "../../../redux-saga-middleware_admin/reducers/adminAgentReducer";
import { showToastNotify } from "../../../redux-saga-middleware_admin/reducers/adminAlertReducer";
import { activeAccount } from "../../../redux-saga-middleware_admin/reducers/adminConfigReducer";
import {
  openConfirmDialog,
  openCreateDialog,
  openDetailDialog,
  openProvideDialog,
  openResetPassDialog,
  openUpdateAccountDialog,
} from "../../../redux-saga-middleware_admin/reducers/adminDialogReducer";
import { getListSub } from "../../../redux-saga-middleware_admin/reducers/adminDistributorReducer";
import { getListDistributor } from "../../../redux-saga-middleware_admin/reducers/adminMasterReducer";
import { updateDetailAccount } from "../../../redux-saga-middleware_admin/reducers/adminReducer";
import { getListRef } from "../../../redux-saga-middleware_admin/reducers/adminSubDistributorReducer";
import { checkRouteIsManage } from "../../../utils/Admin/helper";
import useWindowDimensions from "../../../utils/useWindowDimensions";
import DetailAccountDialogComponent from "../Dialog/DetailAccountDialogComponent";
import SearchBar from "../SearchBar/SearchBar";

const AdminPanel = () => {
  const { roles, ref } = useSelector((state) => state.adminAuthReducer);
  const { detailAccount } = useSelector((state) => state.adminReducer_);
  const { listDistributor } = useSelector((state) => state.adminMasterReducer);
  const { listSub } = useSelector((state) => state.adminDistributorReducer);
  const { listRefs } = useSelector((state) => state.adminSubDistributorReducer);
  const { listEndUser } = useSelector((state) => state.adminAgentReducer);
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState("");
  const { width } = useWindowDimensions();
  const { pathname } = useLocation();

  const handleChangeSearch = (e) => {
    setSearchValue(e?.target?.value);
    dispatch(updateDetailAccount(null))
    if(e?.target?.value === "") {
      if (roles && roles?.length && roles[0]) {
        switch (roles[0]) {
          case "master": {
            dispatch(getListDistributor());
            break;
          }
          case "distributor": {
            dispatch(getListSub());
            break;
          }
          case "sub_distributor": {
            dispatch(getListRef());
            break;
          }
          case "agent": {
            dispatch(getListEndUser());
            break;
          }
          default: {
            break;
          }
        }
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchValue) {
      if (roles && roles?.length > 0 && roles?.includes("master")) {
        dispatch(
          getListDistributor({
            account: searchValue,
          })
        );
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
        dispatch(
          getListSub({
            account: searchValue,
          })
        );
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
        dispatch(
          getListEndUser({
            account: searchValue,
          })
        );
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

  const ResetPasswordSVG = () => {
    return (
      <Box sx={{ marginRight: "10px" }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="15"
          height="15"
          fill="none"
          viewBox="0 0 15 15"
        >
          <path
            fill="#fff"
            d="M12.516 3.09c0-.296-.003-.522 0-.748.01-.46.329-.8.758-.804.43-.004.767.335.77.79.008.795.01 1.589 0 2.383a1.01 1.01 0 01-.616.942 1.005 1.005 0 01-.388.078c-.802.016-1.605.014-2.407 0a.749.749 0 01-.754-.774c.005-.43.32-.741.771-.753.233-.006.467 0 .766 0-.1-.127-.155-.206-.219-.274-1.513-1.658-3.38-2.288-5.542-1.715-2.17.577-3.54 2.043-3.969 4.256a5.43 5.43 0 005.604 6.486c1.995-.09 3.508-1.056 4.524-2.782.147-.248.32-.447.618-.487.299-.04.562.061.738.316.19.274.183.563.024.853a6.93 6.93 0 01-2.858 2.826C6.05 15.963.796 13.287.105 8.475-.452 4.581 2.379.921 6.268.534c2.408-.24 4.423.563 6.052 2.348l.196.208z"
          ></path>
          <path
            fill="#fff"
            d="M7.019 10.794c-.555-.024-1.111-.04-1.665-.075-.703-.044-1.21-.508-1.253-1.21a21.929 21.929 0 01-.006-1.961c.013-.457.236-.811.624-1.065a.355.355 0 00.131-.236c.03-.3.018-.603.055-.9.084-.693.61-1.24 1.308-1.298a10.208 10.208 0 011.687 0c.667.054 1.19.597 1.283 1.264.04.297.032.602.055.9.007.082.028.203.084.235.582.328.703.885.718 1.473.014.546-.004 1.093-.055 1.637-.061.663-.564 1.125-1.245 1.155-.572.025-1.149.005-1.72.005l-.001.076zm-1.13-4.545h2.313c-.013-.26-.013-.505-.041-.747-.028-.241-.178-.414-.427-.423-.453-.018-.908-.02-1.36 0-.274.01-.425.196-.451.463-.022.222-.023.45-.033.705l-.002.002z"
          ></path>
        </svg>
      </Box>
    );
  };

  const EditSVG = () => {
    return <Box sx={{
      marginRight: "10px"
    }}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="15"
        height="15"
        fill="none"
        viewBox="0 0 15 15"
      >
        <path
          fill="#fff"
          d="M7.454 3.244l3.898 3.953c-.062.03-.18.061-.256.14a2244.487 2244.487 0 00-6.23 6.24c-.407.41-.856.66-1.436.703-.669.05-1.332.162-2 .21-.951.066-1.472-.498-1.366-1.44.083-.728.137-1.459.262-2.178.055-.314.188-.672.405-.89C2.95 7.73 5.196 5.501 7.454 3.244zM12.03 6.371L8.19 2.533c.535-.542 1.06-1.125 1.64-1.65.6-.54 1.462-.488 2.043.076.582.564 1.16 1.141 1.725 1.724.564.584.618 1.466.065 2.068-.52.57-1.095 1.09-1.633 1.62z"
        ></path>
      </svg>
    </Box>
  }

  const DeleteSVG = () => {
    return (
      <Box sx={{
        marginRight: "10px"
      }}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="14"
        height="15"
        fill="none"
        viewBox="0 0 14 15"
      >
        <path
          fill="#fff"
          d="M7.88 14.498H4.351c-.77 0-1.54.004-2.312 0-1.209-.01-2.11-1.062-1.976-2.266.118-1.074.219-2.151.295-3.23.098-1.353 1.276-2.508 2.606-2.495.16 0 .37.063.468.178.424.487.971.723 1.582.788.989.104 1.937.015 2.661-.803a.598.598 0 01.414-.163c.812.01 1.48.338 2.046.992-1.671.284-2.852 1.163-3.375 2.752-.534 1.6-.086 3.003 1.118 4.247zM5.562 6.5c-1.77 0-3.012-1.24-3.012-3.005C2.55 1.75 3.792.5 5.537.5c1.77 0 3.013 1.235 3.013 3 0 1.75-1.243 2.996-2.988 3z"
        ></path>
        <path
          fill="#fff"
          d="M10.545 14.498A2.998 2.998 0 019.42 8.723a3 3 0 011.149-.224c1.64.003 2.984 1.36 2.98 3.01a3.003 3.003 0 01-3.003 2.99zm0-3.5c-.312 0-.625-.003-.937 0-.342.006-.56.2-.563.493-.003.293.215.503.55.506.633.006 1.267.006 1.901 0 .334-.003.554-.215.549-.507-.005-.293-.225-.486-.566-.491-.305-.006-.617 0-.93 0h-.004z"
        ></path>
      </svg>
      </Box>
    )
  }

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

  const handleDeleteAccount = () => {
    dispatch(openConfirmDialog("delete-account"))
  }

  const handleUpdateNickName = () => {
    dispatch(openUpdateAccountDialog())
  }

  const handleCopyRef = () => {
    copy(ref)
    dispatch(showToastNotify({ type: "success", message: "Copy ref code successfully!" }))
  }

  return (
    <Box sx={{ marginTop: "56px" }}>
      <DetailAccountDialogComponent />
      <Box component={"div"} className="d-flex justify-content-between">
        <Typography
          sx={{
            textAlign: "start",
            fontWeight: { xs: 700, sm: 600 },
            fontSize: { xs: "20px", sm: "24px" },
          }}
        >
          {width < 576
            ? `${
                roles?.includes("agent")
                  ? "Play Management"
                  : roles?.includes("master")
                  ? "Create Distributor"
                  : roles?.includes("distributor")
                  ? "Create Agent" : ""
              }`
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
          {roles?.includes("agent") ? (
            <Typography>
              <CopyIcon className="ms-2 me-2" onClick={handleCopyRef}/>
              {ref}
            </Typography>
          ) : ""}
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          border: { xs: "unset", sm: "2px solid #E4E4E4" },
          borderRadius: "16px",
          padding: {
            xs: "0px",
            sm: "18px",
          },
          marginTop: {
            xs:
              checkRouteIsManage(pathname) || roles.includes("agent")
                ? "0px"
                : "-32px",
            sm: "24px",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: { xs: "column-reverse", sm: "row" },
          }}
        >
          <Box sx={{ marginTop: "12px" }}>
            <SearchBar
              searchValue={searchValue}
              onChange={handleChangeSearch}
              onSubmit={handleSubmit}
              width={width < 576 ? "100%" : "365px"}
            ></SearchBar>
          </Box>
          <Box
            sx={{
              marginLeft: "auto",
              display:
                (checkRouteIsManage(pathname) && "none") ||
                (roles?.includes("agent") && "none"),
            }}
          >
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
        <Collapse in={detailAccount !== null}>
          <Grid
            container
            sx={(theme) => ({
              border: "2px solid #E4E4E4",
              borderRadius: "16px",
              marginTop: "24px",
              display: { xs: "none", sm: "grid" },
              gridTemplateColumns: checkRouteIsManage(pathname)
                ? "repeat(8,1fr)"
                : "repeat(7,1fr)",
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
                sx={{
                  fontWeight: 600,
                  fontSize: "14px",
                  textAlign: "center",
                }}
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
                sx={{
                  fontWeight: 600,
                  fontSize: "14px",
                  textAlign: "center",
                }}
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
                sx={{
                  fontWeight: 600,
                  fontSize: "14px",
                  textAlign: "center",
                }}
              >
                {detailAccount?.revenue || 0}
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
                sx={{
                  fontWeight: 600,
                  fontSize: "14px",
                  textAlign: "center",
                  color: "#FF7A68",
                }}
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
                sx={{
                  fontWeight: 600,
                  fontSize: "14px",
                  textAlign: "center",
                }}
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
                sx={{
                  fontWeight: 600,
                  fontSize: "14px",
                  textAlign: "center",
                }}
              >
                {detailAccount?.date
                  ? moment(detailAccount?.date).format("MM/DD/YYYY HH:mm")
                  : ""}
              </Typography>
            </Grid>
            <Grid
              sx={(theme) => ({
                padding: "24px",
                [theme.breakpoints.up("lg")]: {
                  borderRight:
                    checkRouteIsManage(pathname) && "2px solid #E4E4E4",
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
                sx={{
                  fontWeight: 600,
                  fontSize: "14px",
                  textAlign: "center",
                  color: "#3DBAA2",
                }}
              >
                {detailAccount?.amount || 0}
              </Typography>
            </Grid>
            {checkRouteIsManage(pathname) && (
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
            )}
          </Grid>
        </Collapse>
        {detailAccount && checkRouteIsManage(pathname) && (
          <Box sx={{ display: { xs: "none", sm: "flex" }, marginTop: "24px" }}>
            <Button
              onClick={() => dispatch(openProvideDialog())}
              sx={{
                backgroundColor: "#FF9F38",
                fontWeight: 700,
                fontSize: "14px",
                textTransform: "unset",
                color: "white",
                padding: "8px 30px",
                borderRadius: "16px",
                ":hover": { backgroundColor: "#FF9F38" },
              }}
            >
              <ProvideTicketSVG></ProvideTicketSVG>
              Provide Ticket
            </Button>
            {!roles?.includes("agent") && (
              <Button
                onClick={() => dispatch(openResetPassDialog())}
                sx={{
                  backgroundColor: "#3DBAA2",
                  fontWeight: 700,
                  fontSize: "14px",
                  textTransform: "unset",
                  color: "white",
                  padding: "8px 30px",
                  borderRadius: "16px",
                  ":hover": { backgroundColor: "#3DBAA2" },
                }}
                className="ms-4"
              >
                <ResetPasswordSVG></ResetPasswordSVG>
                Reset Password
              </Button>
            )}
            {!roles?.includes("agent") && (
              <Button
                onClick={handleUpdateNickName}
                sx={{
                  backgroundColor: "#4FBF67",
                  fontWeight: 700,
                  fontSize: "14px",
                  textTransform: "unset",
                  color: "white",
                  padding: "8px 30px",
                  borderRadius: "16px",
                  ":hover": { backgroundColor: "#4FBF67" },
                }}
                className="ms-4"
              >
                <EditSVG/>
                Edit Nick Name
              </Button>
            )}
            {!roles?.includes("agent") && (
              <Button
                onClick={handleDeleteAccount}
                sx={{
                  backgroundColor: "#FF7A68",
                  fontWeight: 700,
                  fontSize: "14px",
                  textTransform: "unset",
                  color: "white",
                  padding: "8px 30px",
                  borderRadius: "16px",
                  ":hover": { backgroundColor: "#FF7A68" },
                }}
                className="ms-4"
              >
                <DeleteSVG/>
                Delete
              </Button>
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default AdminPanel;
