import { Box } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import { getConfigs } from "../../redux-saga-middleware_admin/reducers/adminConfigReducer";
// import AdminNavigation from "../../components/Admin/Navigation/AdminNavigation";
import { ConfirmDialogComponent, GivePermissionDialogComponent, ResetPasswordDialogComponent, UpdateAccountDialogComponent } from "../../components/Admin/Dialog";
import CreateAccountDialogComponent from "../../components/Admin/Dialog/CreateAccountDialogComponent";
import ProvideTicketDialogComponent from "../../components/Admin/Dialog/ProvideTicketDialogComponent";
import DrawerNavigation from "../../components/Admin/Navigation/DrawerNavigation";

// const MainContentRoot = styled("div")(({ theme }) => ({
//   [theme.breakpoints.up("md")]: {
//     display: "none",
//   },
//   boxShadow: "unset",
// }));

export default function MainLayout() {
  const dispatch = useDispatch();

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
      <CreateAccountDialogComponent />
      <ProvideTicketDialogComponent />
      <ResetPasswordDialogComponent/>
      <GivePermissionDialogComponent/>
      <UpdateAccountDialogComponent/>
      <ConfirmDialogComponent/>
      <Box sx={{height: "100vh"}}>
        {" "}
        <Box
          sx={{
            width: { xs: "0", lg: "348px" },
          }}
        >
          <DrawerNavigation />
        </Box>
      </Box>
      <Box sx={{ width: "100%"}}>
        <Outlet />
      </Box>
    </Box>
  );
}
