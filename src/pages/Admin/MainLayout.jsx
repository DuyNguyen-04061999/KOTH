import React, { useEffect } from "react";
import { Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getConfigs } from "../../redux-saga-middleware_admin/reducers/adminConfigReducer";
import { Outlet } from "react-router-dom";
import AdminNavigation from "../../components/Admin/Navigation/AdminNavigation";
import DrawerNavigation from "../../components/Admin/Navigation/DrawerNavigation";
import CreateAccountDialogComponent from "../../components/Admin/Dialog/CreateAccountDialogComponent";
import ProvideTicketDialogComponent from "../../components/Admin/Dialog/ProvideTicketDialogComponent";

export default function MainLayout() {
  const dispatch = useDispatch();
  const { roles, ref } = useSelector((state) => state.adminAuthReducer);

  useEffect(() => {
    dispatch(getConfigs());
  }, [dispatch]);

  return (
    <Box
      sx={{
        display: "flex",
        bgcolor: "white",
        minWidth: "100vw",
        minHeight: "100vh",
      }}
    >
      <CreateAccountDialogComponent/>
      <ProvideTicketDialogComponent/>
      <Box
        sx={{
          bgcolor: "white",
          height: "100%",
          width: "348px"
        }}
      >
        {" "}
        <Box
          sx={{
            position: "fixed",
            left: "0",
            top: "0",
            bottom: "0",
            width: { xs: "0", sm: "348px" },
            borderRight: { sm: "solid 2px #EEE", xs: "0" },
          }}
        >
          <DrawerNavigation />
        </Box>
      </Box>
      <Box sx={{ width: { xs: "100%" }}}>
        <Outlet />
      </Box>
    </Box>
  );
}
