import {
  AppBar,
  Box,
  CssBaseline,
  Drawer,
  IconButton,
  Toolbar
} from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  closeDrawerNav,
  openDrawerNav,
} from "../../../redux-saga-middleware_admin/reducers/adminDialogReducer";
import AdminNavigation from "./AdminNavigation";

const DrawerNavigation = (props) => {
  const { window } = props;
  const { isOpenDrawerNav } = useSelector((state) => state.adminDialogReducer);
  const dispatch = useDispatch();

  const MenuIconOpenSVG = () => {
    return (
      <Box sx={{ width: "40px", height: "40px" }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="21"
          viewBox="0 0 24 21"
          fill="none"
        >
          <path
            d="M12.0198 8.2413C15.1883 8.2413 18.3569 8.2413 21.5254 8.2413C22.8929 8.2413 23.9531 9.19027 23.9878 10.4141C24.0243 11.6788 22.9987 12.7176 21.6519 12.7521C20.8408 12.7729 20.0287 12.7521 19.2167 12.7521C13.6594 12.7521 8.10222 12.7521 2.54499 12.7521C1.10916 12.7521 0.0376787 11.8158 0.0161366 10.5557C-0.0110252 9.25559 1.04641 8.2413 2.46912 8.23768C5.65173 8.23586 8.83621 8.2413 12.0198 8.2413Z"
            fill="black"
          />
          <path
            d="M11.9734 4.50987C8.82079 4.50987 5.66753 4.50987 2.51365 4.50987C1.08625 4.50896 0.0260048 3.56543 0.0138289 2.28895C-0.00115689 0.997959 1.05815 0.00725788 2.50053 0.00544341C8.83702 -0.00181447 15.1748 -0.00181447 21.5138 0.00544341C22.9543 0.00544341 24.0079 1.0034 23.992 2.29712C23.977 3.56725 22.9159 4.50896 21.4828 4.50987C18.3109 4.51168 15.141 4.51168 11.9734 4.50987Z"
            fill="#808191"
          />
          <path
            d="M12.002 16.4908C15.2174 16.4908 18.4328 16.4862 21.6491 16.4908C22.7824 16.4908 23.6909 17.2311 23.9522 18.3234C24.1733 19.2515 23.6216 20.3356 22.656 20.7466C22.2856 20.9016 21.8868 20.983 21.4833 20.9861C15.1631 20.9994 8.84252 21.0025 2.52164 20.9952C1.47825 20.9952 0.672766 20.577 0.226939 19.6461C-0.182361 18.7988 -0.0240734 17.9904 0.589407 17.2828C1.06708 16.7312 1.70678 16.489 2.45139 16.4899C5.63462 16.4929 8.81817 16.4932 12.002 16.4908Z"
            fill="#D9D9DE"
          />
        </svg>
      </Box>
    );
  };

  const MenuIconCloseSVG = () => {
    return (
      <Box
        sx={{
          transform: "rotate(180deg)",
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
                <MenuIconCloseSVG />
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
