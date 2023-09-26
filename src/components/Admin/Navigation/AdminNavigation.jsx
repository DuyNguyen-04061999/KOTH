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
import { useDispatch, useSelector } from "react-redux";
import { images, navigationImages } from "../../../utils/images";
import { makeStyles } from "@mui/styles";
import useWindowDimensions from "../../../utils/useWindowDimensions";
import { closeDrawerNav } from "../../../redux-saga-middleware_admin/reducers/adminDialogReducer";

const AdminNavigation = (props) => {
  const { width } = useWindowDimensions();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { roles, ref } = useSelector((state) => state.adminAuthReducer);
  const { isOpenDrawerNav } = useSelector((state) => state.adminDialogReducer);
  const dispatch = useDispatch();

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
      name: "Create Distributor",
      icon: navigationImages.navCreate,
      iconActive: navigationImages.navCreateActive,
      link: "/",
    },
    {
      name: "Manage Distributor",
      icon: navigationImages.navManage,
      iconActive: navigationImages.navManageActive,
      link: "/manage",
    },
    {
      name: "Revenue by Date Range",
      icon: navigationImages.navFilter,
      iconActive: navigationImages.navFilterActive,
      link: "/report",
    },
    {
      name: "Totals",
      icon: navigationImages.navTotal,
      iconActive: navigationImages.navTotalActive,
      link: "/total",
    },
    {
      name: "Setting",
      icon: navigationImages.navSetting,
      iconActive: navigationImages.navSettingActive,
      link: "/setting",
    },
    {
      name: "Logout",
      icon: navigationImages.navLogout,
      iconActive: "",
      link: "/logout",
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
      name: "Create Agent",
      icon: navigationImages.navCreate,
      iconActive: navigationImages.navCreateActive,
      link: "/",
    },
    {
      name: "Manage Agents",
      icon: navigationImages.navManage,
      iconActive: navigationImages.navManageActive,
      link: "/manage",
    },
    {
      name: "Revenue by Date Range",
      icon: navigationImages.navFilter,
      iconActive: navigationImages.navFilterActive,
      link: "/report",
    },
    {
      name: "Totals",
      icon: navigationImages.navTotal,
      iconActive: navigationImages.navTotalActive,
      link: "/total",
    },
    {
      name: "Setting",
      icon: navigationImages.navSetting,
      iconActive: navigationImages.navSettingActive,
      link: "/setting",
    },
    {
      name: "Logout",
      icon: navigationImages.navLogout,
      iconActive: "",
      link: "/logout",
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
    {
      name: "Logout",
      icon: navigationImages.navLogout,
      link: "/logout",
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
      name: "Play Management",
      icon: navigationImages.navCreate,
      iconActive: navigationImages.navCreateActive,
      link: "/",
    },
    {
      name: "Agents Management",
      icon: navigationImages.navManage,
      iconActive: navigationImages.navManageActive,
      link: "/manage",
    },
    {
      name: "Revenue by Date Range",
      icon: navigationImages.navFilter,
      iconActive: navigationImages.navFilterActive,
      link: "/report",
    },
    {
      name: "Totals",
      icon: navigationImages.navTotal,
      iconActive: navigationImages.navTotalActive,
      link: "/total",
    },
    {
      name: "Setting",
      icon: navigationImages.navSetting,
      iconActive: navigationImages.navSettingActive,
      link: "/setting",
    },
    {
      name: "Logout",
      icon: navigationImages.navLogout,
      iconActive: "",
      link: "/logout",
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

  const handleRedirectNav = (action) => {
    if (action?.link === "/logout") {
      localStorage.removeItem("token_admin");
      window.open("/", "_self");
    } else {
      navigate(action?.link);
    }
    if (isOpenDrawerNav) {
      dispatch(closeDrawerNav());
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        borderRight: "2px solid #EEE",
      }}
    >
      <Box sx={{ marginTop: "42px", display: "flex" }}>
        <Box
          className="inp-header mx-3 ps-4 cursor-pointer"
          onClick={() => {
            navigate("/");
            if (isOpenDrawerNav) {
              dispatch(closeDrawerNav());
            }
          }}
          component={"img"}
          src={images.adminLogo}
          sx={{ width: "100px" }}
        ></Box>
      </Box>
      <Box
        sx={{
          width: "100%",
          marginTop: "42px",
        }}
      >
        <nav aria-label="main mailbox folders">
          <List sx={{ padding: "0 28px 0 30px" }}>
            {listAction &&
              listAction?.length > 0 &&
              listAction?.map((action, i_action) => {
                return (
                  <ListItem
                    disablePadding
                    onClick={() => handleRedirectNav(action)}
                    key={i_action}
                    sx={{
                      borderRadius: "20px",
                      marginTop: "12px",
                      background: pathname === action?.link && "#F7F7F7",
                    }}
                  >
                    <ListItemButton
                      style={{
                        borderRadius: "20px",
                        padding: "16px",
                      }}
                    >
                      <Box
                        component={"img"}
                        src={
                          pathname === action?.link
                            ? action?.iconActive
                            : action?.icon
                        }
                        sx={{ marginRight: "16px", marginLeft: "12px" }}
                      ></Box>
                      <ListItemText
                        sx={{
                          "> span": {
                            fontSize: "16px",
                            fontWeight: 600,
                            color:
                              pathname === action?.link ? "#355DFF" : "#8C8D9B",
                            fontFamily: "Cyntho Next",
                          },
                        }}
                        primary={action?.name}
                      />
                    </ListItemButton>
                  </ListItem>
                );
              })}
          </List>
        </nav>
      </Box>
      {width > 576 && (
        <Typography
          className="ms-2"
          sx={{
            marginTop: "auto",
            color: "#000",
            fontSize: "30px",
            fontWeight: 600,
            textAlign: "start",
            paddingLeft: "43px",
            paddingBottom: "20%",
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
