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
  console.log("home");

  return (
    <Box sx={{ display: "flex"}}>
      <Box sx={{ width: "348px" }}>
        <Box
          sx={{
            position: "fixed",
            left: "0",
            top: "0",
            bottom: "0",
            bgcolor: "white",
          }}
        >
          <span className="ms-2">
            Welcome -{" "}
            {roles && roles?.length > 0 && roles?.includes("master")
              ? "Master"
              : roles && roles?.length > 0 && roles?.includes("distributor")
              ? "Distributor"
              : "Sub-Distributor"}{" "}
            - {ref}
          </span>
          <AdminNavigation />    
        </Box>
      </Box>
      <Outlet />
    </Box>
  );
}
