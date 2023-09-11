import React from "react";
import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import InboxIcon from "@mui/icons-material/Inbox";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminNavigation = (props) => {
  const navigate = useNavigate();
  const pathname = useLocation();
  const { roles, ref } = useSelector((state) => state.adminAuthReducer);
  const masterActions = [
    {
      name: "Create Distributor",
      link: "/master/create-distributor",
    },
    {
      name: "List Distributor",
      link: "/master/list-distributor",
    },
    {
      name: "Database Manager",
      link: "/master/database-manager",
    },
    {
      name: "Templates Manager",
      link: "/master/template-manager",
    },
    {
      name: "Feedbacks Manager",
      link: "/master/feedback-manager",
    },
    {
      name: "Ticket Provider",
      link: "/master/provide-ticket",
    },
  ];
  const distributorActions = [
    {
      name: "Create Sub Distributor",
      link: "/distributor/create-sub-distributor",
    },
    {
      name: "List Sub Distributor",
      link: "/distributor/list-sub-distributor",
    },
    {
      name: "Ticket Provider",
      link: "/distributor/provide-ticket",
    },
  ];
  const subDistributorActions = [
    {
      name: "View Sub Distributor",
      link: "/sub-distributor/detail",
    },
    {
      name: "Create Agent",
      link: "/sub-distributor/create-agent",
    },
    {
      name: "View Ref User",
      link: "/sub-distributor/refs",
    },
    {
      name: "Ticket Provider",
      link: "/sub-distributor/provide-ticket",
    },
  ];

  const agentActions = [
    {
      name: "View Ref User",
      link: "/agent/refs",
    },
    {
      name: "Ticket Provider",
      link: "/agent/provide-ticket",
    },
  ];

  const listAction = roles && roles?.length > 0 && roles?.includes("master")
  ? masterActions
  : roles?.includes("distributor") && !roles?.includes("Sub")
  ? distributorActions
  : roles?.includes("sub_distributor")
  ? subDistributorActions
  : roles?.includes("sub_distributor")
  ? subDistributorActions
  : roles?.includes("agent") && agentActions;

  console.log(pathname);

  return (
    <Box>
      <Box
        sx={{
          width: "100%",
          color: "black",
        }}
      >
        <nav aria-label="main mailbox folders">
          <List>
            {listAction &&
              listAction?.length > 0 &&
              listAction?.map((action, i_action) => (
                <ListItem
                  disablePadding
                  onClick={() => navigate(action?.link)}
                  key={i_action}
                  selected={pathname === action?.link}
                >
                  <ListItemButton>
                    <ListItemIcon>
                      <InboxIcon />
                    </ListItemIcon>
                    <ListItemText primary={action?.name} />
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
              <ListItemButton>
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>
                <ListItemText primary="Logout" />
              </ListItemButton>
            </ListItem>
          </List>
        </nav>
      </Box>
    </Box>
  );
};

export default AdminNavigation;
