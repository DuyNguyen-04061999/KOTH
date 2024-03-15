import { Box, Dialog } from "@mui/material";
import React from "react";
import ReactDOM from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { closeDoubleDayDialog } from "../../../redux-saga-middleware/reducers/appReducer";
import { images } from "../../../utils/images";
import useWindowDimensions from "../../../utils/useWindowDimensions";

const DoubleDayDialog = () => {
  const { width } = useWindowDimensions();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { showDoubleDayDialog, randomRender } = useSelector(
    (state) => state.appReducer
  );

  const handleClose = () => {
    dispatch(closeDoubleDayDialog());
  };
  const {
    hotTournament,
    isFetchHot,
    noDataHot,
    // noDataEnd,
  } = useSelector((state) => state.tournamentReducer);
  return ReactDOM.createPortal(
    <>
      {width < 576 ? (
        <div>
          <Dialog
            open={showDoubleDayDialog && randomRender !== null}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <Box sx={{ position: "relative", cursor: "pointer" }}>
              <Box
                sx={{ width: "100%" }}
                component={"img"}
                src={images.stackingMB}
                onClick={() => {
                  if (!isFetchHot && !noDataHot) {
                    handleClose();
                    navigate("/promotion-detail/" + hotTournament[0].id);
                  }
                }}
              ></Box>
              <Box
                onClick={handleClose}
                sx={{
                  position: "absolute",
                  top: "20px",
                  right: "20px",
                  cursor: "pointer",
                }}
                component={"img"}
                src={images.btn_back}
              ></Box>
            </Box>
          </Dialog>
        </div>
      ) : (
        <div>
          <Dialog
            open={showDoubleDayDialog && randomRender !== null}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <Box sx={{ position: "relative", cursor: "pointer" }}>
              <Box
                sx={{ width: "100%" }}
                component={"img"}
                src={images.stackingDK}
                onClick={() => {
                  if (!isFetchHot && !noDataHot) {
                    handleClose();
                    navigate("/promotion-detail/" + hotTournament[0].id);
                  }
                }}
              ></Box>
              <Box
                onClick={handleClose}
                sx={{
                  position: "absolute",
                  top: "20px",
                  right: "20px",
                  cursor: "pointer",
                }}
                component={"img"}
                src={images.btn_back}
              ></Box>
            </Box>
          </Dialog>
        </div>
      )}
    </>,
    document.body
  );
};

export default DoubleDayDialog;
