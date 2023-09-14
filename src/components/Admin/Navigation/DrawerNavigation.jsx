import React from "react";
import { useState } from "react";
import AdminNavigation from "./AdminNavigation";
import {
  AppBar,
  Box,
  Button,
  CssBaseline,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";

const DrawerNavigation = (props) => {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  
  const MenuIconOpenSVG = () => {
    return (
      <Box sx={{transform: mobileOpen && "rotate(180deg)",width: "40px", height:"40px"}}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="18"
          fill="none"
          viewBox="0 0 22 18"
        >
          <path
            stroke="#11142D"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M1 9h19"
          ></path>
          <path
            stroke="#808191"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M1 1h9"
          ></path>
          <path
            stroke="#808191"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M1 17h9"
            opacity="0.301"
          ></path>
          <path
            stroke="#11142D"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M16 4l5 5-5 5"
          ></path>
        </svg>
      </Box>
    );
  };

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{height: "100%"}}>
      <CssBaseline />
      <AppBar
        sx={{ display: { sm: "none" }, boxShadow: "unset" }}
        color="transparent"
        component="nav"
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 1 }}
          >
            <MenuIconOpenSVG />
          </IconButton>
        </Toolbar>
      </AppBar>
      <nav style={{height: "100%"}}>
        <Box>
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: { xs: "100vw", sm: "348px" },
              },
            }}
          >
            <Box sx={{position: "relative", height: "100%" }}>
            <AdminNavigation />
              <IconButton
                color="#000"
                aria-label="close drawer"
                edge="start"
                onClick={handleDrawerToggle}
                style={{ position: "fixed", top: 0, right: 0}}
              >
                <MenuIconOpenSVG />
              </IconButton>
            </Box>
          </Drawer>
        </Box>
        <Box sx={{ display: { xs: "none", sm: "block", height: "100%"} }}>
          <AdminNavigation />
        </Box>
      </nav>
    </Box>
  );
};

export default DrawerNavigation;
