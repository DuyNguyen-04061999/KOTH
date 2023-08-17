import React from "react";
import { imageHome, images } from "../../../../utils/images";
import { Box, Dialog, Typography } from "@mui/material";
import SlickSlider from "../../../../components/SlickSlider";
import useWindowDimensions from "../../../../utils/useWindowDimensions";
import { useState } from "react";
import SliderTime from "../../../../components/SliderTime";
import CountDownTournament from "../../CountDownTournament";

export default function FullListTournament({ handleOnClose, open, type }) {
  const [hourList, setHourList] = useState([
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
    "21:00",
    "22:00",
    "23:00",
    "24:00",
    "25:00",
    "00:00",
  ]);
  const [selectedHour, setSeHour] = useState(0);
  const [dayList, setDayList] = useState([
    "Mon",
    "Tus",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
    "Sun",
  ]);
  const [selectedDay, setSeDay] = useState(0);
  const { width } = useWindowDimensions();
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
            {type === "hot"
              ? "Hot Tournaments"
              : type === "hourly"
              ? "Hourly Tournament"
              : type === "daily"
              ? "Daily Tournament"
              : "Week Long Tournaments"}
          </Typography>
        </Box>
        <Box sx={{ width: "100%", height: "auto", padding: "20px" }}>
          {type === "hot" && (
            <Box sx={{ marginBottom: width < 576 ? "24px" : "32px" }}>
              {" "}
              <SlickSlider
                appendDot={true}
                images={
                  width < 576
                    ? [
                        images.bannerTournament,
                        images.bannerTournament1,
                        images.bannerTournament2,
                      ]
                    : [
                        images.BannerHomePageDesktop,
                        images.BannerHomePageDesktop,
                        images.BannerHomePageDesktop,
                      ]
                }
              />
            </Box>
          )}
          {type === "week-long" && (
            <Box
              sx={{
                marginTop: width < 576 ? "24px" : "32px",
                marginBottom: width < 576 ? "24px" : "32px",
                backgroundImage: `url(${imageHome.bannerTop1Mobile})`,
                width: "100%",
                height: "210px",
                backgroundSize: "cover",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxSizing: "border-box",
              }}
            >
              <Box
                sx={{
                  width: "80px",
                  height: "80px",
                  borderRadius: "50%",
                  backgroundColor: "#0687C9",
                  position: "relative",
                }}
              >
                <Box
                  sx={{
                    borderRadius: "50%",
                    width: "80px",
                    height: "80px",
                    position: "absolute",
                    top: "-3px",
                    left: "-2px",
                  }}
                  src={images.pool}
                  component={"img"}
                ></Box>{" "}
                <Box
                  sx={{
                    width: "60px",
                    height: "auto",
                    position: "absolute",
                    top: "-40px",
                    left: "-19px",
                  }}
                  component={"img"}
                  src={imageHome.top1Icon}
                ></Box>
              </Box>
              <Box sx={{ paddingLeft: "20px" }}>
                <Typography
                  sx={{
                    color: "#FFDC62",
                    textAlign: "start",
                    fontSize: "10px",
                    marginLeft: "0px !important",
                  }}
                >
                  TOURNAMENT OF THE WEEK
                </Typography>
                <Box
                  component={"img"}
                  src={imageHome.titleImage}
                  sx={{ width: "197.541px", margin: "10px 0px 10px 0px" }}
                ></Box>
                <Box sx={{ display: "flex" }}>
                  <Box
                    sx={{ width: "23px", height: "auto" }}
                    component={"img"}
                    src={imageHome.brandAvatar}
                  ></Box>
                  <Box
                    sx={{
                      width: "0.729px",
                      backgroundColor: "#371972",
                      margin: "0px 12px 0px 12px",
                    }}
                  ></Box>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Box
                      sx={{
                        width: "20px",
                        height: "20px",
                        borderRadius: "5px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        background: "rgba(139, 31, 207, 0.3)",
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: "10px",
                          color: "#00CBEF",
                          marginLeft: "0px !important",
                        }}
                      >
                        2d
                      </Typography>
                    </Box>
                    <Typography
                      sx={{
                        fontSize: "4.695px",
                        color: "#00CBEF",
                        margin: "0px 6px !important",
                      }}
                    >
                      :
                    </Typography>
                    <Box
                      sx={{
                        width: "20px",
                        height: "20px",
                        borderRadius: "5px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        background: "rgba(139, 31, 207, 0.3)",
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: "10px",
                          color: "#00CBEF",
                          marginLeft: "0px !important",
                        }}
                      >
                        1h
                      </Typography>{" "}
                    </Box>{" "}
                    <Typography
                      sx={{
                        fontSize: "4.695px",
                        color: "#00CBEF",
                        margin: "0px 6px !important",
                      }}
                    >
                      :
                    </Typography>
                    <Box
                      sx={{
                        width: "30px",
                        height: "20px",
                        borderRadius: "5px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        background: "rgba(139, 31, 207, 0.3)",
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: "10px",
                          color: "#00CBEF",
                          marginLeft: "0px !important",
                        }}
                      >
                        35m
                      </Typography>{" "}
                    </Box>{" "}
                  </Box>
                </Box>
                <Box
                  sx={{
                    backgroundColor: "rgba(139, 31, 207, 0.30)",
                    borderRadius: "5px",
                    marginTop: "15px",
                    padding: "4px 5px",
                    width: `${width / 2.1}px`,
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Typography
                      sx={{
                        color: "#00CBEF",
                        textAlign: "start",
                        fontSize: "8px",
                        marginLeft: "0px !important",
                        marginRight: "5px",
                      }}
                    >
                      Get
                    </Typography>
                    <Typography
                      sx={{
                        color: "#FAA515",
                        textAlign: "start",
                        fontSize: "10.062px",
                        marginLeft: "0px !important",
                        marginRight: "5px",
                      }}
                    >
                      $100
                    </Typography>
                    <Typography
                      sx={{
                        color: "#00CBEF",
                        textAlign: "start",
                        fontSize: "8px",
                        marginLeft: "0px !important",
                      }}
                    >
                      gift
                    </Typography>
                  </Box>
                  <button
                    style={{
                      background:
                        "linear-gradient(270deg, #4AA1EC 0%, #5840E9 100%)",
                      outline: "none",
                      border: "none",
                      borderRadius: "5px",
                      color: "#fff",
                      padding: `2.683px ${width / 16}px`,
                      fontSize: "10px",
                      cursor: "pointer",
                    }}
                  >
                    Play now
                  </button>
                </Box>
              </Box>
            </Box>
          )}
          {type === "hourly" && (
            <>
              {" "}
              <Box>
                <SliderTime
                  updateSelectedIndex={(index) => {
                    setSeHour(index);
                  }}
                  selectedItem={selectedHour}
                  list={hourList}
                />
              </Box>
              <Box
                sx={{
                  marginTop: width < 576 ? "12px" : "16px",
                  marginBottom: width < 576 ? "12px" : "16px",
                }}
              >
                <CountDownTournament />
              </Box>
            </>
          )}
          {type === "daily" && (
            <Box>
              <SliderTime
                updateSelectedIndex={(index) => {
                  setSeDay(index);
                }}
                selectedItem={selectedDay}
                list={dayList}
                type={"day"}
              />
            </Box>
          )}
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
