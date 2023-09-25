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
import { styled } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { closeDrawerNav, openDrawerNav } from "../../../redux-saga-middleware_admin/reducers/adminDialogReducer";

const DrawerNavigation = (props) => {
  const { window } = props;
  const { isOpenDrawerNav } = useSelector((state) => state.adminDialogReducer);
  const dispatch = useDispatch();

  const MenuIconOpenSVG = () => {
    return (
      <Box
        sx={{
          transform: isOpenDrawerNav && "rotate(180deg)",
          width: "40px",
          height: "40px",
        }}
      >
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

  const handleOpenDrawer = () => {
    dispatch(openDrawerNav());
  };

  const handleCloseDrawer = () => {
    dispatch(closeDrawerNav());
  };

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ height: "100%" }}>
      <CssBaseline />
      <AppBar
        sx={(theme) => ({
          [theme.breakpoints.up("lg")]: {
            display: "none",
          },
          boxShadow: "unset",
          backgroundColor: "transparent",
          position: "absolute",
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleOpenDrawer}
            sx={{ mr: 1 }}
          >
            <MenuIconOpenSVG />
          </IconButton>
        </Toolbar>
      </AppBar>
      <nav style={{ height: "100%" }}>
        <Box>
          <Drawer
            container={container}
            variant="temporary"
            open={isOpenDrawerNav}
            onClose={handleCloseDrawer}
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
            <Box sx={{ position: "relative", height: "100%" }}>
              <AdminNavigation />
              <IconButton
                color="#000"
                aria-label="close drawer"
                edge="start"
                onClick={handleCloseDrawer}
                style={{ position: "absolute", top: 0, right: 0 }}
              >
                <MenuIconOpenSVG />
              </IconButton>
            </Box>
          </Drawer>
        </Box>
        <Box
          sx={(theme) => ({
            [theme.breakpoints.down("lg")]: { display: "none" },
            height: "100%",
          })}
        >
          <AdminNavigation />
        </Box>
      </nav>
    </Box>
  );
};

export default DrawerNavigation;
