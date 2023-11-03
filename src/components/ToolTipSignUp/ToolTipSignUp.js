import { Box, Tooltip, Typography } from "@mui/material";
import { withStyles } from "@mui/styles";
import React from "react";
const BgWithTooltip = withStyles({
  tooltip: {
    color: "black",
    backgroundColor: "white",
    padding: "10px",
  },
})(Tooltip);
export default function ToolTipSignUp({ children }) {
  return (
    <BgWithTooltip
      title={
        <Box>
          {" "}
          <Typography sx={{ textAlign: "start", fontSize: "12px" }}>
            Username should be 3-10 characters long and include at least 1
            uppercase or lowercase letter. You can use number or underscore but
            no spaces. Username are case sensitive.
          </Typography>
          <Typography
            sx={{ textAlign: "start", fontSize: "12px", marginTop: "10px" }}
          >
            Correct example: Superman0_
          </Typography>
        </Box>
      }
      placement="right"
      sx={{
        backgroundColor: "white",
        color: "red",
      }}
    >
      {children}
    </BgWithTooltip>
  );
}
