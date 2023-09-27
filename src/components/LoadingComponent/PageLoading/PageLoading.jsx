import { Box, CircularProgress } from "@mui/material";
import React from "react";

const PageLoading = () => {
  return (
    <Box sx={{ position: "absolute", top:"50%",left:"50%",transform:"translate(-50%,-50%)" }}>
      <CircularProgress size={42} thickness={7} sx={{color:"#723d9f"}} />
    </Box>
  );
};

export default PageLoading;
