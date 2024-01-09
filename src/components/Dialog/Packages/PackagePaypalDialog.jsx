import { Box, Dialog } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Package } from "../../../pages/PackagePage/component";
import { closePaypalPackageDialog } from "../../../redux-saga-middleware/reducers/appReducer";

export default function PackagePaypalDialog() {
  const { isPaypalPackageDialog } = useSelector((state) => state.appReducer);
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(closePaypalPackageDialog());
    window.close();
  };

  useEffect(() => {
    const handlePopState = (event) => {
      // Handle popstate event here
      window.close();
    };

    // Add event listener for popstate
    window.addEventListener("popstate", handlePopState);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  });

  return (
    <Dialog
      open={isPaypalPackageDialog}
      onClose={handleClose}
      maxWidth={"lg"}
      sx={{}}
      fullWidth
    >
      <Box
        component={"div"}
        sx={{
          height: "100%",
          width: "100%",
          background: "#211d28",
        }}
      >
        <Package type="game_revive" />
      </Box>
    </Dialog>
  );
}
