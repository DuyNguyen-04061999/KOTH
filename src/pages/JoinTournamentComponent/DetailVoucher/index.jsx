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
export default function DetailVoucher({ open, handleOnClose }) {
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
                  justifyContent: "space-between",
                  height: "90px",
                  boxSizing: "border-box",
                }}
              >
                <Box
                  sx={{ width: "90px", height: "90px", borderRadius: "8px" }}
                  component={"img"}
                  src={images.bannerwin}
                ></Box>
                <Box>
                  <Typography
                    sx={{
                      fontSize: "12px",
                      marginLeft: "0px !important",
                      textAlign: "start",
                    }}
                  >
                    Sponsor by
                  </Typography>
                  <Box
                    sx={{ width: "100px", height: "25px" }}
                    component={"img"}
                    src={images.samsungBrand}
                  ></Box>
                  <Typography
                    sx={{
                      fontSize: "26px",
                      marginLeft: "0px !important",
                      textAlign: "start",
                      color: "#BE48ED",
                    }}
                  >
                    Discount 10%
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
                50% Discount Voucher from Samsung : Valid for purchases of
                Samsung
              </Typography>
              <Box sx={{ marginTop: "20px" }}>
                <Typography sx={{ textAlign: "start", fontSize: "16px" }}>
                  Expiry Date:
                </Typography>
                <Typography sx={{ textAlign: "start", fontSize: "12px" }}>
                  01-08-2023 - 29-08-2023
                </Typography>
              </Box>
              <Box sx={{ marginTop: "12px" }}>
                <Typography sx={{ textAlign: "start", fontSize: "16px" }}>
                  Application
                </Typography>
                <ul>
                  <li style={{ listStyleType: "disc", fontSize: "14px" }}>
                    Redeemable at participating stores or online.
                  </li>
                  <li style={{ listStyleType: "disc", fontSize: "14px" }}>
                    Enter the voucher code during checkout for the discount.
                  </li>
                  <li style={{ listStyleType: "disc", fontSize: "14px" }}>
                    Applicable to a wide range of Samsung beverages.
                  </li>
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
                justifyContent: "space-between",
                height: "90px",
                boxSizing: "border-box",
              }}
            >
              <Box
                sx={{ width: "90px", height: "90px", borderRadius: "8px" }}
                component={"img"}
                src={images.bannerwin}
              ></Box>
              <Box>
                <Typography
                  sx={{
                    fontSize: "12px",
                    marginLeft: "0px !important",
                    textAlign: "start",
                  }}
                >
                  Sponsor by
                </Typography>
                <Box
                  sx={{ width: "100px", height: "25px" }}
                  component={"img"}
                  src={images.samsungBrand}
                ></Box>
                <Typography
                  sx={{
                    fontSize: "26px",
                    marginLeft: "0px !important",
                    textAlign: "start",
                    color: "#BE48ED",
                  }}
                >
                  Discount 10%
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
              50% Discount Voucher from Samsung : Valid for purchases of Samsung
            </Typography>
            <Box sx={{ marginTop: "20px" }}>
              <Typography sx={{ textAlign: "start", fontSize: "16px" }}>
                Expiry Date:
              </Typography>
              <Typography sx={{ textAlign: "start", fontSize: "12px" }}>
                01-08-2023 - 29-08-2023
              </Typography>
            </Box>
            <Box sx={{ marginTop: "12px" }}>
              <Typography sx={{ textAlign: "start", fontSize: "16px" }}>
                Application
              </Typography>
              <ul>
                <li style={{ listStyleType: "disc", fontSize: "14px" }}>
                  Redeemable at participating stores or online.
                </li>
                <li style={{ listStyleType: "disc", fontSize: "14px" }}>
                  Enter the voucher code during checkout for the discount.
                </li>
                <li style={{ listStyleType: "disc", fontSize: "14px" }}>
                  Applicable to a wide range of Samsung beverages.
                </li>
              </ul>
            </Box>
          </Box>
        )}
      </Dialog>
    </ThemeProvider>
  );
}
