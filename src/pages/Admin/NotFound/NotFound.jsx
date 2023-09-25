import { Box, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import "./index.scss";

const NotFound = () => {
  return (
    <Box id="notfound">
      <Box className="notfound">
        <Box className="notfound-404">
          <Box />
          <Typography variant="h1">404</Typography>
        </Box>
        <Typography variant="h2">Page not found</Typography>
        <Typography variant="p">
          The page you are looking for might have been removed had its name
          changed or is temporarily unavailable.
        </Typography>
        <Link className="home-page" to="/">home page</Link>
      </Box>
    </Box>
  );
};

export default NotFound;
