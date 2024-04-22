import { Box, CircularProgress, Dialog } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

export default function LoadingDialogComponent() {
  const { isFetchDistributor } = useSelector(
    (state) => state.adminMasterReducer
  );
  const { isFetchSub } = useSelector((state) => state.adminDistributorReducer);
  const { isFetchEndUser } = useSelector((state) => state.adminAgentReducer);
  const { isFetchTotal } = useSelector((state) => state.adminRevenueReducer);

  return (
    <Dialog
      open={isFetchDistributor || isFetchSub || isFetchEndUser || isFetchTotal}
      PaperProps={{
        style: {
          backgroundColor: "transparent",
          boxShadow: "none",
        },
      }}
    >
      <Box component={"div"} className="d-flex justify-content-center">
        <CircularProgress />
      </Box>
    </Dialog>
  );
}
