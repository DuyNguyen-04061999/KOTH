import {
  Box,
  CssBaseline,
  Dialog,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import React from "react";
import { images } from "../../../utils/images";
import InspirationTTF from "../../../assets/font/CynthoNextSemiBold.otf";
import useWindowDimensions from "../../../utils/useWindowDimensions";
import moment from "moment";
import { sliceString } from "../../../utils/helper";
const theme = createTheme({
  typography: {
    fontFamily: "Cyntho Next",
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        "@font-face": {
          fontFamily: "Cyntho Next",
          src: `url(${InspirationTTF}) format("truetype")`,
        },
      },
    },
  },
});

function isJson(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}

export default function DetailVoucher({ open, handleOnClose, detail }) {
  const { width } = useWindowDimensions();
  const typographyStyle = {
    textAlign: "start",
    fontWeight: "200 !important",
    marginLeft: "0px !important",
    color: "#fff",
  };
  return (
    <ThemeProvider theme={theme}>
      {" "}
      <CssBaseline />
      <Dialog
        fullScreen={width < 576 ? true : false}
        PaperProps={{
          style: {
            backgroundColor: "transparent",
            boxShadow: "none",
          },
        }}
        open={open}
        onClose={handleOnClose}
        sx={{ zIndex: "1311" }}
      >
        {width < 576 ? (
          <Box
            sx={{
              width: "100%",
              height: "100%",
              backgroundColor: "#211D28",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                backgroundColor: "#42285B",
                height: "44px",
                width: "100%",
                display: "flex",
                alignItems: "center",
                padding: "0px 18px",
              }}
            >
              <Box
                component={"img"}
                src={images.BackButtonLobby}
                sx={{ width: "13px" }}
                onClick={handleOnClose}
              ></Box>
              <Typography
                onClick={handleOnClose}
                sx={{ ...typographyStyle, marginLeft: "10px" }}
              >
                Details voucher
              </Typography>
            </Box>
            <Box
              sx={{
                backgroundImage: `url(${images.Voucher_Brand})`,
                width: "320px",
                height: "555px",
                boxSizing: "border-box",
                padding: "24px",
                position: "relative",
                marginTop: "50px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "start",
                  height: "90px",
                  boxSizing: "border-box",
                }}
              >
                <Box
                  sx={{ width: "90px", height: "90px", borderRadius: "8px" }}
                  component={"img"}
                  src={
                    detail?.tournamentInfors?.rewardInfors?.rewardAvatar
                      ? process.env.REACT_APP_SOCKET_SERVER +
                        "/" +
                        detail?.tournamentInfors?.rewardInfors?.rewardAvatar
                      : images.bannerwin
                  }
                ></Box>
                <Box className="ms-2">
                  <Typography
                    sx={{
                      fontSize: "12px",
                      marginLeft: "0px !important",
                      textAlign: "start",
                    }}
                  >
                    Sponsor by
                    <Typography
                      sx={{
                        fontSize: "16px",
                        marginLeft: "0px !important",
                        textAlign: "start",
                        textTransform: "uppercase"
                      }}
                    >
                      {" "}
                      {detail?.tournamentInfors?.owner?.brandName || ""}
                    </Typography>
                  </Typography>
                  {/* <Box
                    sx={{ width: "100px", height: "25px" }}
                    component={"img"}
                    src={images.samsungBrand}
                  ></Box> */}
                  <Typography
                    sx={{
                      fontSize: "16px",
                      marginLeft: "0px !important",
                      textAlign: "start",
                      color: "#BE48ED",
                      maxWidth: "160px",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      textTransform: "uppercase",
                      marginTop: "4px"
                    }}
                  >
                    {detail?.tournamentInfors?.rewardInfors?.rewardTicketName ||
                      "Discount 10%"}
                  </Typography>
                </Box>
              </Box>
              <Typography
                sx={{
                  fontSize: "14px",
                  fontWeight: "bolder !important",
                  margin: "20px 0px 24px 0px",
                  padding: "0px 20px",
                }}
              >
                {detail?.tournamentInfors?.rewardInfors?.rewardTicketName}{" "}
                Discount Voucher from{" "}
                {detail?.tournamentInfors?.owner?.brandName} : Valid for
                purchases of {detail?.tournamentInfors?.owner?.brandName}
              </Typography>
              <Box sx={{ marginTop: "20px" }}>
                <Typography sx={{ textAlign: "start", fontSize: "16px" }}>
                  Validity Date:
                </Typography>
                <Typography sx={{ textAlign: "start", fontSize: "12px" }}>
                  {moment(
                    detail?.tournamentInfors?.rewardInfors?.rewardValidityDate
                  )?.format("DD-MM-YYYY") || "01-08-2023 - 29-08-2023"}
                </Typography>
              </Box>
              <Box sx={{ marginTop: "12px" }}>
                <Typography sx={{ textAlign: "start", fontSize: "16px" }}>
                  Terms and Conditions
                </Typography>
                <ul
                  style={{
                    maxHeight: "120px",
                    overflow: "auto",
                    listStyleType: "none",
                  }}
                >
                  {detail?.tournamentInfors?.rewardInfors
                    ?.rewardTermAndConditions &&
                  isJson(
                    detail?.tournamentInfors?.rewardInfors
                      ?.rewardTermAndConditions
                  ) &&
                  JSON.parse(
                    detail?.tournamentInfors?.rewardInfors
                      ?.rewardTermAndConditions
                  )?.length > 0 ? (
                    JSON.parse(
                      detail?.tournamentInfors?.rewardInfors
                        ?.rewardTermAndConditions
                    )?.map((term, index) => (
                      <li
                        key={index}
                        style={{ listStyleType: "disc", fontSize: "14px" }}
                      >
                        {term}.
                      </li>
                    ))
                  ) : (
                    <>No Infors</>
                  )}
                </ul>
              </Box>
            </Box>
          </Box>
        ) : (
          <Box
            sx={{
              backgroundImage: `url(${images.Voucher_Brand})`,
              width: "320px",
              height: "555px",
              boxSizing: "border-box",
              padding: "24px",
              position: "relative",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "start",
                height: "90px",
                boxSizing: "border-box",
              }}
            >
              <Box
                sx={{ width: "90px", height: "90px", borderRadius: "8px" }}
                component={"img"}
                src={
                  detail?.tournamentInfors?.rewardInfors?.rewardAvatar
                    ? process.env.REACT_APP_SOCKET_SERVER +
                      "/" +
                      detail?.tournamentInfors?.rewardInfors?.rewardAvatar
                    : images.bannerwin
                }
              ></Box>
              <Box className="ms-2">
                <Typography
                  sx={{
                    fontSize: "12px",
                    marginLeft: "0px !important",
                    textAlign: "start",
                  }}
                >
                  Sponsor by {detail?.tournamentInfors?.owner?.brandName || ""}
                </Typography>
                {/* <Box
                  sx={{ width: "50px" }}
                  component={"img"}
                  className="img-fluid"
                  src={detail?.tournamentInfors?.owner?.brandAvatar ? process.env.REACT_APP_SOCKET_SERVER + "/" + detail?.tournamentInfors?.owner?.brandAvatar : images.samsungBrand}
                ></Box> */}
                <Typography
                  sx={{
                    fontSize: "26px",
                    marginLeft: "0px !important",
                    textAlign: "start",
                    color: "#BE48ED",
                  }}
                >
                  {sliceString(
                    detail?.tournamentInfors?.rewardInfors?.rewardTicketName
                  ) || "Discount 10%"}
                </Typography>
              </Box>
            </Box>
            <Typography
              sx={{
                fontSize: "14px",
                fontWeight: "bolder !important",
                margin: "20px 0px 24px 0px",
                padding: "0px 20px",
              }}
            >
              {detail?.tournamentInfors?.rewardInfors?.rewardTicketName}{" "}
              Discount Voucher from {detail?.tournamentInfors?.owner?.brandName}{" "}
              : Valid for purchases of{" "}
              {detail?.tournamentInfors?.owner?.brandName}
            </Typography>
            <Box sx={{ marginTop: "20px" }}>
              <Typography sx={{ textAlign: "start", fontSize: "16px" }}>
                Validity Date:
              </Typography>
              <Typography sx={{ textAlign: "start", fontSize: "12px" }}>
                {moment(
                  detail?.tournamentInfors?.rewardInfors?.rewardValidityDate
                )?.format("DD-MM-YYYY") || "01-08-2023 - 29-08-2023"}
              </Typography>
            </Box>
            <Box sx={{ marginTop: "12px" }}>
              <Typography sx={{ textAlign: "start", fontSize: "16px" }}>
                Terms And Conditions
              </Typography>
              <ul
                style={{
                  maxHeight: "120px",
                  overflow: "auto",
                  listStyleType: "none",
                }}
              >
                {detail?.tournamentInfors?.rewardInfors
                  ?.rewardTermAndConditions &&
                isJson(
                  detail?.tournamentInfors?.rewardInfors
                    ?.rewardTermAndConditions
                ) &&
                JSON.parse(
                  detail?.tournamentInfors?.rewardInfors
                    ?.rewardTermAndConditions
                )?.length > 0 ? (
                  JSON.parse(
                    detail?.tournamentInfors?.rewardInfors
                      ?.rewardTermAndConditions
                  )?.map((term, index) => (
                    <li
                      key={index}
                      style={{ listStyleType: "disc", fontSize: "14px" }}
                    >
                      {term}.
                    </li>
                  ))
                ) : (
                  <>No Infors</>
                )}
              </ul>
            </Box>
          </Box>
        )}
      </Dialog>
    </ThemeProvider>
  );
}
