import React from "react";
import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import InboxIcon from "@mui/icons-material/Inbox";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { images } from "../../../utils/images";
import { makeStyles } from "@mui/styles";
import useWindowDimensions from "../../../utils/useWindowDimensions";

const AdminNavigation = (props) => {
  const { width } = useWindowDimensions()
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { roles, ref } = useSelector((state) => state.adminAuthReducer);
  const masterActions = [
    // {
    //   name: "Create Distributor",
    //   link: "/master/create-distributor",
    // },
    // {
    //   name: "List Distributor",
    //   link: "/master/list-distributor",
    // },
    // {
    //   name: "Database Manager",
    //   link: "/master/database-manager",
    // },
    // {
    //   name: "Templates Manager",
    //   link: "/master/template-manager",
    // },
    // {
    //   name: "Feedbacks Manager",
    //   link: "/master/feedback-manager",
    // },
    // {
    //   name: "Ticket Provider",
    //   link: "/master/provide-ticket",
    // },
    {
      name: "Admin Structure",
      icon: "",
      link: "/",
    },
  ];
  const distributorActions = [
    // {
    //   name: "Create Sub Distributor",
    //   link: "/distributor/create-sub-distributor",
    // },
    // {
    //   name: "List Sub Distributor",
    //   link: "/distributor/list-sub-distributor",
    // },
    // {
    //   name: "Ticket Provider",
    //   link: "/distributor/provide-ticket",
    // },
    {
      name: "Admin Structure",
      icon: "",
      link: "/",
    },
  ];
  const subDistributorActions = [
    // {
    //   name: "View Sub Distributor",
    //   link: "/sub-distributor/detail",
    // },
    // {
    //   name: "Create Agent",
    //   link: "/sub-distributor/create-agent",
    // },
    // {
    //   name: "View Ref User",
    //   link: "/sub-distributor/refs",
    // },
    // {
    //   name: "Ticket Provider",
    //   link: "/sub-distributor/provide-ticket",
    // },
    {
      name: "Admin Structure",
      icon: "",
      link: "/",
    },
  ];

  const agentActions = [
    // {
    //   name: "User Manager",
    //   link: "/agent/create-end-user",
    // },
    // {
    //   name: "Ticket Provider",
    //   link: "/agent/provide-ticket",
    // },
    {
      name: "User Manager",
      icon: "",
      link: "/",
    },
  ];

  const listAction =
    roles && roles?.length > 0 && roles?.includes("master")
      ? masterActions
      : roles?.includes("distributor") && !roles?.includes("Sub")
      ? distributorActions
      : roles?.includes("sub_distributor")
      ? subDistributorActions
      : roles?.includes("sub_distributor")
      ? subDistributorActions
      : roles?.includes("agent") && agentActions;

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <Box sx={{ marginTop: "47px", display: "flex", marginLeft: "46px" }}>
        <Box
          className="inp-header mx-3 ps-4 cursor-pointer"
          onClick={() => {
            navigate("/");
          }}
          component={"img"}
          src={images.adminLogo}
          sx={{ width: "150px" }}
        ></Box>
      </Box>
      <Box
        sx={{
          width: "100%",
          marginTop: "42px",
        }}
      >
        <nav aria-label="main mailbox folders">
          <List sx={{ padding: "0 30px" }}>
            {listAction &&
              listAction?.length > 0 &&
              listAction?.map((action, i_action) => (
                <ListItem
                  disablePadding
                  onClick={() => navigate(action?.link)}
                  key={i_action}
                  selected={
                    pathname === "/" || pathname === ""
                      ? action?.link === "/"
                      : pathname === action?.link
                  }
                  style={{ borderRadius: "20px" }}
                >
                  <ListItemButton
                    style={{
                      borderRadius: "20px", padding: "12px"
                    }}
                  >
                    <ListItemIcon>
                      <InboxIcon />
                    </ListItemIcon>
                    <ListItemText
                      sx={{
                        "> span": {
                          fontSize: "16px",
                          fontWeight: 600,
                          color: "#8C8D9B",
                        },
                      }}
                      primary={action?.name}
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            <Divider />
            <ListItem
              disablePadding
              onClick={() => {
                localStorage.removeItem("token_admin");
                window.open("/", "_self");
              }}
            >
              <ListItemButton style={{ borderRadius: "20px" }}>
                <ListItemIcon>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="17"
                    height="18"
                    viewBox="0 0 17 18"
                    fill="none"
                  >
                    <path
                      d="M0.00721627 8.50255C0.00721627 6.59826 -9.0022e-05 4.69397 0.00721627 2.79035C0.0145226 1.32909 0.899913 0.26636 2.28346 0.0358797C2.47059 0.00870975 2.65964 -0.00306408 2.8487 0.000676657C4.95291 0.000676657 7.05624 0.000676657 9.15868 0.000676657C10.8856 0.000676657 11.9988 1.11655 12.0028 2.84814C12.0028 3.21345 12.0095 3.57877 12.0028 3.94408C11.9922 4.3705 11.7119 4.65545 11.3273 4.64814C10.9547 4.64084 10.687 4.3632 10.6777 3.95139C10.6684 3.53958 10.6777 3.13176 10.6737 2.7226C10.6605 1.89898 10.1165 1.3364 9.29883 1.33308C7.10694 1.32511 4.91505 1.32511 2.72317 1.33308C1.92611 1.33308 1.39475 1.8505 1.34892 2.6502C1.33231 2.94777 1.34161 3.24799 1.34161 3.54622C1.34161 7.07804 1.34161 10.6094 1.34161 14.1403C1.34161 14.9719 1.71755 15.5033 2.40435 15.6468C2.54593 15.6718 2.68971 15.6823 2.83342 15.678C4.94826 15.678 7.06332 15.678 9.17861 15.678C10.1437 15.678 10.6704 15.1466 10.6737 14.1736C10.6737 13.8082 10.6684 13.4429 10.6737 13.0776C10.683 12.6465 10.9534 12.3603 11.3379 12.3609C11.7225 12.3616 12.0022 12.6472 12.0022 13.0776C11.9975 13.6754 12.0307 14.2805 11.9357 14.865C11.7365 16.0898 10.6591 16.9905 9.41174 17.0011C7.14237 17.0179 4.87254 17.0179 2.60228 17.0011C1.23002 16.9898 0.0862571 15.9171 0.0331204 14.5435C-0.0233373 13.0955 0.0105373 11.6443 0.00588785 10.1943C0.00588785 9.6317 0.00721627 9.06447 0.00721627 8.50255Z"
                      fill="#808191"
                    />
                    <path
                      d="M15.0948 7.76781C14.7846 7.46892 14.4671 7.17667 14.1649 6.86914C13.8481 6.547 13.8374 6.14249 14.1217 5.87282C14.406 5.60316 14.7859 5.62773 15.0988 5.93194C15.5803 6.40486 16.0499 6.89039 16.5334 7.36198C17.1571 7.97106 17.1571 9.11815 16.5241 9.73055C16.0472 10.1922 15.5863 10.6711 15.1134 11.1373C14.7892 11.4562 14.3907 11.4768 14.1124 11.1998C13.8341 10.9228 13.856 10.5296 14.1729 10.2001C14.4644 9.89726 14.762 9.60236 15.0562 9.30014C15.0622 9.29416 15.0609 9.28021 15.0748 9.20782H14.6956C12.2934 9.20782 9.8907 9.20782 7.48759 9.20782C7.35447 9.2117 7.22125 9.20548 7.08907 9.18922C6.93211 9.16688 6.78863 9.08825 6.68534 8.96798C6.58205 8.8477 6.526 8.69399 6.52762 8.53546C6.52925 8.37693 6.58844 8.2244 6.69417 8.10627C6.79991 7.98814 6.94497 7.91247 7.10235 7.89335C7.23464 7.87842 7.36781 7.87287 7.50088 7.87674H15.0589L15.0948 7.76781Z"
                      fill="#C0C0C8"
                    />
                  </svg>
                </ListItemIcon>
                <ListItemText
                  sx={{
                    "> span": {
                      fontSize: "16px",
                      fontWeight: 600,
                      color: "#8C8D9B",
                    },
                  }}
                  primary="Logout"
                />
              </ListItemButton>
            </ListItem>
          </List>
        </nav>
      </Box>
      {width < 576 && (
        <Typography
          className="ms-2"
          sx={{
            marginTop: "auto",
            color: "#000",
            fontSize: "30px",
            fontWeight: 600,
            textAlign: "start",
            paddingLeft: "43px",
            paddingBottom: "130px"
          }}
        >
          {roles && roles?.length > 0 && roles?.includes("master")
            ? "Master"
            : roles && roles?.length > 0 && roles?.includes("distributor")
            ? "Distributor"
            : roles && roles?.length > 0 && roles?.includes("sub_distributor")
            ? "Sub-Distributor"
            : "Agent"}
        </Typography>
      )}
    </Box>
  );
};

export default AdminNavigation;
