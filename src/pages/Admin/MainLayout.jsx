import React, { useEffect } from "react";
import { Box } from "@mui/material";
import { useDispatch } from "react-redux";
import { getConfigs } from "../../redux-saga-middleware_admin/reducers/adminConfigReducer";
import { Outlet } from "react-router-dom";
// import AdminNavigation from "../../components/Admin/Navigation/AdminNavigation";
import DrawerNavigation from "../../components/Admin/Navigation/DrawerNavigation";
import CreateAccountDialogComponent from "../../components/Admin/Dialog/CreateAccountDialogComponent";
import ProvideTicketDialogComponent from "../../components/Admin/Dialog/ProvideTicketDialogComponent";
import { GivePermissionDialogComponent, ResetPasswordDialogComponent } from "../../components/Admin/Dialog";

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
