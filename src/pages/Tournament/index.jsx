import "./index.scss";
import Layout from "../../components/Layout";
import { useEffect, useState } from "react";
import _socket from "../../redux-saga-middleware/config/socket";
import { Box, Container, Grid, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { images } from "../../utils/images";
import { useNavigate } from "react-router-dom";
import { getFontSizeDependOnWidth } from "../../utils/config";
import useWindowDimensions from "../../utils/useWindowDimensions";
import moment from "moment";
import TitleHomeDesktopComponent from "../../components/Title/TitleHomeDesktopComponent";
import CreateTournament from "./CreateTournament";
export default function Tournament() {
  const [socket, setSocket] = useState(null);
  const [tournaments, setTournaments] = useState([]);
  const [fetchT, setFetchT] = useState(true);
  const { token } = useSelector((state) => state.authReducer);
  const navigate = useNavigate();
  const { width } = useWindowDimensions();

  useEffect(() => {
    setSocket(_socket);
  }, []);

  useEffect(() => {
    if (token && fetchT) {
      socket?.emit("getListTournament");
    }
  });

  useEffect(() => {
    socket?.on("createTournamentSuccess", (data) => {
      setTournaments((pre) => {
        const dt = pre?.filter((i) => i?.id !== data?.id);
        return [...dt, data];
      });
    });

    socket?.on("joinTournamentSuccess", (data) => {});

    socket?.on("getListTournamentSuccess", (data) => {
      setTournaments(data);
      setFetchT(false);
    });

    return () => {};
  }, [socket]);
  console.log("Tournament: ", tournaments);
  const renderTournamentList = tournaments?.map((item, index) => {
    return (
      <Grid
        sx={{
          padding:
            index % 2 === 1 ? "20px 0px 20px 20px" : "20px 20px 20px 20px",
        }}
        item
        md={6}
        key={index}
      >
        <Box
          className="content"
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            backgroundColor: "#2E2151",
            borderRadius: "5px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              position: "relative",
            }}
          >
            <img
              style={{ borderRadius: "5px 0px 0px 5px" }}
              src={
                item?.games && item?.games[0]
                  ? process.env.REACT_APP_SOCKET_SERVER +
                    "/" +
                    item?.games[0]?.gameAvatar
                  : images.undefinedAvatar
              }
              alt="..."
              width={200}
              height="100%"
            />
            <Box
              sx={{
                position: "absolute",
                backgroundColor: "#f7941c",
                cursor: "pointer",
                padding: "10px 10px",
                bottom: "15px",
                borderRadius: "0px 50px 50px 0px",
                display: "flex",
                alignItems: "center",
                boxShadow: "2px 8px 16px -8px rgba(0,0,0,0.71);",
              }}
            >
              <Typography
                sx={{
                  fontSize: "14px !important",
                  color: "#fff",
                  textAlign: "start",
                }}
              >
                <span style={{ fontSize: "12px" }}>Prize Pool:</span>{" "}
                <span style={{ fontSize: "15px" }}>500</span>
              </Typography>
              <img
                style={{ width: "18px", height: "18px", marginLeft: "5px" }}
                alt="..."
                src={images.goldIcon}
              />
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              flexGrow: "1",
            }}
          >
            <Box
              sx={{
                position: "relative",
                padding: "10px",
                boxSizing: "border-box",
              }}
            >
              <Typography variant="h5" sx={{ color: "white" }}>
                {item?.tournamentName}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  marginTop: "17px",
                  color: "#BEBDEC",
                }}
              >
                <Box
                  component={"img"}
                  sx={{ width: "15px", height: "15px" }}
                  src={images.personTour}
                ></Box>
                <Typography
                  style={{
                    fontSize: "12px",
                    marginLeft: "5px",
                    display: "block",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    letterSpacing: "1px",
                  }}
                >
                  {item?.users?.length}/{item?.tournamentQuantity}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  color: "#BEBDEC",
                  marginTop: "17px",
                }}
              >
                <Box
                  component={"img"}
                  sx={{
                    width: "15px",
                    height: "15px",
                    display: "flex",
                    alignItems: "center",
                  }}
                  src={images.TimeTour}
                ></Box>
                <Typography
                  style={{
                    fontWeight: "700",
                    fontSize: "12px",
                    marginLeft: "5px",
                    display: "block",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    letterSpacing: "1px",
                  }}
                >
                  {moment(item?.tournamentStartAt).format("DD/MM/YYYY")}-
                  {moment(item?.tournamentEndAt).format("DD/MM/YYYY")}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  color: "#BEBDEC",
                  marginTop: "10px",
                }}
              >
                <Box
                  component={"img"}
                  sx={{
                    width: "15px",
                    height: "15px",
                    display: "flex",
                    alignItems: "center",
                  }}
                  src={images.HouseIcon}
                ></Box>{" "}
                <Typography
                  style={{
                    fontWeight: "700",
                    fontSize: "12px",
                    marginLeft: "5px",
                    display: "block",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    letterSpacing: "1px",
                  }}
                >
                  Tournament By: {item?.tournamentUser?.userName}
                </Typography>
              </Box>
            </Box>
            <Box
              onClick={() => navigate("/tournamentDetail/" + item?.id)}
              sx={{
                width: "100%",
                boxSizing: "border-box",
                padding: "10px",
                display: "flex",
                justifyContent: "center",
                background: "linear-gradient(#7648ED,#8A3AF1)",
                color: "white",
                fontSize: getFontSizeDependOnWidth(width),
                cursor: "pointer",
                position: "relative",
                borderRadius: "0px 0px 5px 0px",
              }}
            >
              <span>View</span>
              <i
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "32%",
                  fontSize: "18px",
                }}
                className="fa-solid fa-angle-right"
              ></i>
            </Box>
          </Box>
        </Box>
      </Grid>
    );
  });
  return (
    <Layout
      children={
        <Box className="tournamentDemo mt-5">
          <Container
            maxWidth={"lg"}
            sx={{
              paddingLeft: "90px !important",
              paddingRight: "90px !important",
              color: "white",
            }}
          >
            <TitleHomeDesktopComponent
              noicon={true}
              title="TOURNAMENTS"
              noSeeAll={true}
            />
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: "36px",
              }}
            >
              <button
                style={{
                  padding: `${parseFloat(width / 170)}px ${parseFloat(
                    width / 80
                  )}px`,
                  borderRadius: "5px",
                  border: "none",
                  outline: "none",
                  background: "#5F3491",
                  color: "white",
                  fontSize: getFontSizeDependOnWidth(width),
                }}
              >
                <Typography
                  sx={{
                    fontSize: "15px",
                    marginLeft: "5px",
                    display: "block",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    letterSpacing: "0.5px",
                  }}
                >
                  {" "}
                  Create A Tournament
                </Typography>
              </button>
            </Box>
            <img
              style={{ width: "100%", marginTop: "36px" }}
              alt="..."
              src={images.BannerTour}
            />
            <Box sx={{ marginTop: "36px", display: "flex" }}>
              <Box
                sx={{ width: "33.33%", height: "200px", paddingRight: "9px" }}
              >
                <img
                  style={{ width: "100%", height: "100%" }}
                  alt="..."
                  src={images.tour1}
                />
              </Box>
              <Box sx={{ width: "33.33%", height: "200px" }}>
                <img
                  style={{
                    width: "100%",
                    height: "100%",
                    paddingLeft: "9px",
                    paddingRight: "9px",
                  }}
                  alt="..."
                  src={images.tour2}
                />
              </Box>
              <Box sx={{ width: "33.33%", height: "200px" }}>
                <img
                  style={{ width: "100%", height: "100%", paddingLeft: "9px" }}
                  alt="..."
                  src={images.tour3}
                />
              </Box>
            </Box>
            <Grid
              sx={{ marginTop: "20px" }}
              container
              rowSpacing={2}
              columnSpacing={2}
            >
              {renderTournamentList}
            </Grid>
          </Container>
          <CreateTournament />
        </Box>
      }
    />
  );
}
