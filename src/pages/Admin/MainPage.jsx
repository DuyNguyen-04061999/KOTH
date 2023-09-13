import React, { useEffect } from "react";
import {
  Box
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getConfigs } from "../../redux-saga-middleware_admin/reducers/adminConfigReducer";
import { Outlet } from "react-router-dom";
import AdminNavigation from "../../components/Admin/Navigation/AdminNavigation";
import DrawerNavigation from "../../components/Admin/Navigation/DrawerNavigation";

export default function MainPage() {
  const dispatch = useDispatch();
  const { roles, ref } = useSelector((state) => state.adminAuthReducer);

  useEffect(() => {
    dispatch(getConfigs());
  }, [dispatch]);

  return (
    <Box sx={{ display: "flex", bgcolor: "white", width: "100vw", height: "100vh"}}>
        <Box
          sx={{
            position: "fixed",
            left: "0",
            top: "0",
            bottom: "0",
            bgcolor: "white",
            width: {xs: "100vw", sm: "348px"},
            borderRight:{ sm: "solid 2px #EEE", xs:"0"},
            height: "100%"
          }}
        >
         <DrawerNavigation /> 
        </Box>
      <Outlet />
    </Box>
  );
}
