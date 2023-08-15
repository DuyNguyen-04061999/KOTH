import React from "react";
import { images } from "../../../../utils/images";
import { Box, Dialog, Typography } from "@mui/material";
import SlickSlider from "../../../../components/SlickSlider";

export default function FullListTournament({ handleOnClose, open }) {
  return (
    <Dialog sx={{ zIndex: "1320" }} fullScreen={true} open={open}>
      <Box
        sx={{
          width: "100%",
          height: "100%",
          backgroundColor: "#211D28",
          display: "flex",
          flexDirection: "column",
          overflowY: "auto",
        }}
      >
        <Box
          sx={{
            width: "100%",
            minHeight: "44px",
            backgroundColor: "#42285B",
            display: "flex",
            alignItems: "center",
            padding: "0px 15px",
            boxSizing: "border-box",
          }}
        >
          <Box
            component={"img"}
            src={images.BackButtonLobby}
            sx={{ width: "13px" }}
            onClick={() => {
              handleOnClose();
            }}
          ></Box>
          <Typography
            sx={{
              textAlign: "start",
              color: "#ffff",
              fontWeight: "lighter !important",
              fontSize: "14px",
            }}
            onClick={() => {
              handleOnClose();
            }}
          >
            Hot tournament
          </Typography>
        </Box>
        <Box sx={{ width: "100%", height: "auto", padding: "20px" }}>
          <SlickSlider
            images={[
              images.bannerTournament,
              images.bannerTournament1,
              images.bannerTournament2,
            ]}
          />
          <Box sx={{ display: "flex", flexWrap: "wrap" }}>
            {[1, 2, 3, 2, 3, 4, 5].map((item, index) => {
              return index % 2 === 0 ? (
                <Box
                  key={index}
                  sx={{
                    width: "50%",
                    boxSizing: "border-box",
                    marginTop: "24px",
                    paddingRight: "10px",
                  }}
                >
                  <Box
                    sx={{
                      backgroundColor: "#37285C",
                      borderRadius: "10px",
                      padding: "8px",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Box
                      sx={{ borderRadius: "10px" }}
                      component={"img"}
                      src={images.GameTournament}
                    ></Box>
                    <Typography
                      sx={{
                        color: "#FFDC62",
                        fontSize: "14px",
                        fontWeight: "200 !important",
                        textAlign: "start",
                        marginTop: "5px",
                      }}
                    >
                      Get $100 gift
                    </Typography>
                    <Typography
                      sx={{
                        color: "#ffff",
                        fontSize: "12px",
                        fontWeight: "200 !important",
                        textAlign: "start",
                        marginTop: "-3px",
                      }}
                    >
                      By Mcdonald’s
                    </Typography>
                  </Box>
                </Box>
              ) : (
                <Box
                  key={index}
                  sx={{
                    width: "50%",
                    boxSizing: "border-box",
                    marginTop: "24px",
                    paddingLeft: "10px",
                  }}
                >
                  <Box
                    sx={{
                      backgroundColor: "#37285C",
                      borderRadius: "10px",
                      padding: "8px",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Box
                      sx={{ borderRadius: "10px" }}
                      component={"img"}
                      src={images.GameTournament}
                    ></Box>
                    <Typography
                      sx={{
                        color: "#FFDC62",
                        fontSize: "14px",
                        fontWeight: "200 !important",
                        textAlign: "start",
                        marginTop: "5px",
                      }}
                    >
                      Get $100 gift
                    </Typography>
                    <Typography
                      sx={{
                        color: "#ffff",
                        fontSize: "12px",
                        fontWeight: "200 !important",
                        textAlign: "start",
                        marginTop: "-3px",
                      }}
                    >
                      By Mcdonald’s
                    </Typography>
                  </Box>
                </Box>
              );
            })}
          </Box>
        </Box>
      </Box>
    </Dialog>
  );
}
