import React from "react";
import { useState } from "react";
import AdminNavigation from "./AdminNavigation";
import MenuIcon from "@mui/icons-material/Menu";
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

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
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
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <nav>
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
                <MenuIcon />
              </IconButton>
            </Box>
          </Drawer>
        </Box>
        <Box sx={{ display: { xs: "none", sm: "block" } }}>
          <AdminNavigation />
        </Box>
      </nav>
    </Box>
  );
};

export default DrawerNavigation;
