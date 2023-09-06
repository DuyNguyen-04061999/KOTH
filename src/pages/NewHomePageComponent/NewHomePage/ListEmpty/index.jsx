import React from "react";
import FolderOffIcon from "@mui/icons-material/FolderOff";
import { Box, Typography } from "@mui/material";
import useWindowDimensions from "../../../../utils/useWindowDimensions";

const ListEmpty = () => {
    const { width } = useWindowDimensions();
  return (
    <Box
      sx={{
        bgcolor: "rgba(255,255,255,0.01)",
        width: "100%",
        height: width < 576 ? "308px" : "360px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <FolderOffIcon sx={{ color: "white", fontSize: "56px" }}></FolderOffIcon>
      <Typography sx={{ color: "white", fontSize: "24px", marginTop: "24px" }}>
        No Data Found
      </Typography>{" "}
      <Typography sx={{ color: "white", fontSize: "14px", marginTop: "4px" }}>
        Data is empty or no data received
      </Typography>
    </Box>
  );
};

export default ListEmpty;
