import React, { useEffect } from "react";
import {
  Box
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getConfigs } from "../../redux-saga-middleware_admin/reducers/adminConfigReducer";
import { Outlet } from "react-router-dom";
import AdminNavigation from "../../components/Admin/Navigation/AdminNavigation";

export default function MainPage() {
  const dispatch = useDispatch();
  const { roles, ref } = useSelector((state) => state.adminAuthReducer);

  useEffect(() => {
    dispatch(getConfigs());
  }, [dispatch]);

  return (
    <Box sx={{ display: "flex", bgcolor: "white", width: "100vw", height: "100vh"}}>
      <Box sx={{ width: "348px" }}>
        <Box
          sx={{
            position: "fixed",
            left: "0",
            top: "0",
            bottom: "0",
            bgcolor: "white",
            padding: "47px 29px",
            borderRight: "solid 2px #EEE"
          }}
        >
          <AdminNavigation />    
        </Box>
      </Box>
      <Outlet />
    </Box>
  );
}
