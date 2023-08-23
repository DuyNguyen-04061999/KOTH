import "./index.scss";
import Layout from "../../components/Layout";
import { useEffect, useState } from "react";
import _socket from "../../redux-saga-middleware/config/socket";
import { Box, Container, Dialog, Grid, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { images } from "../../utils/images";
import { useNavigate } from "react-router-dom";
import { getFontSizeDependOnWidth } from "../../utils/config";
import useWindowDimensions from "../../utils/useWindowDimensions";
import moment from "moment";
import TitleHomeDesktopComponent from "../../components/Title/TitleHomeDesktopComponent";
import CreateTournament from "./CreateTournament";
import TournamentMobile from "./TournamentMobile";
export default function Tournament() {
  const { width } = useWindowDimensions();
  const MarginTop = parseFloat(width / 100);
  const [socket, setSocket] = useState(null);
  const [tournaments, setTournaments] = useState([]);
  const [fetchT, setFetchT] = useState(true);
  const { token, userRole } = useSelector((state) => state.authReducer);
  const navigate = useNavigate();
  const [createTour, setCreateTour] = useState(false);
  const [tourType, setTourType] = useState(false);
  const [agree, setAgree] = useState(false);
  const [type, setType] = useState("");
  useEffect(() => {
    setSocket(_socket);
  }, []);

  useEffect(() => {
    if (token && fetchT) {
      socket?.emit("getListTournament");
    }
  });

  console.log(tournaments);

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
  console.log(tournaments);
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
              paddingLeft: width < 576 ? "24px !important" : "90px !important",
              paddingRight: width < 576 ? "24px !important" : "90px !important",
              color: "white",
            }}
          >
            <TitleHomeDesktopComponent
              noicon={true}
              title="TOURNAMENTS"
              noSeeAll={true}
            />
            {userRole === "Merchant" && (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  marginTop: "36px",
                }}
              >
                <button
                  onClick={() => {
                    setTourType(true);
                  }}
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
                    Create A Tournament
                  </Typography>
                </button>
              </Box>
            )}

            {/* <img
              style={{ width: "100%", marginTop: "36px" }}
              alt="..."
              src={images.BannerTour}
            /> */}
            {/* <Box sx={{ marginTop: "36px", display: "flex" }}>
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
            </Box> */}
            {width < 576 ? (
              <TournamentMobile />
            ) : (
              <Grid
                sx={{ marginTop: "20px" }}
                container
                rowSpacing={2}
                columnSpacing={2}
              >
                {renderTournamentList}
              </Grid>
            )}
          </Container>
          <CreateTournament
            handleOnClose={() => {
              setCreateTour(false);
            }}
            createTour={createTour}
            type={type}
          />
          <Dialog
            onClose={() => {
              setTourType(false);
            }}
            open={tourType}
          >
            <Box
              sx={{
                backgroundColor: "#37285C",
                display: "flex",
                flexDirection: "column",
                width: "300px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "10px",
                  backgroundColor: "#37285C",
                }}
              >
                <Typography
                  sx={{
                    textAlign: "start",
                    fontSize: "14px",
                    fontWeight: "500 !important",
                    marginLeft: "0px !important",
                    color: "#fff",
                    letterSpacing: "0.5px",
                  }}
                >
                  Choose Tournament Type
                </Typography>
                <img
                  onClick={() => {
                    setTourType(false);
                  }}
                  src={images.closeButton}
                  alt="..."
                  style={{ width: "20px", height: "20px" }}
                />
              </Box>
              <Box
                sx={{
                  padding: `${MarginTop}px`,
                  backgroundColor: "#2E233D",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {/* <button
                  onClick={() => {
                    setAgree(true);
                    setTourType(false);
                    setType("personal");
                  }}
                  style={{
                    width: "79%",
                    padding: "8px",
                    border: "none",
                    outline: "none",
                    background: "linear-gradient(#8A3AF1,#7648ED)",
                    color: "white",
                    letterSpacing: "0.7px",
                    borderRadius: "5px",
                  }}
                >
                  Personal Tournament
                </button> */}
                <Box sx={{ marginTop: `${MarginTop / 2}px`, display: "flex" }}>
                  <button
                    onClick={() => {
                      setAgree(true);
                      setTourType(false);
                      setType("brand");
                    }}
                    style={{
                      width: "80%",
                      padding: "8px",
                      border: "none",
                      outline: "none",
                      background: "linear-gradient(#8A3AF1,#7648ED)",
                      color: "white",
                      letterSpacing: "0.7px",
                      borderRadius: "5px",
                    }}
                  >
                    Brand Tournament
                  </button>
                  <button
                    style={{
                      border: "none",
                      outline: "none",
                      padding: "5px 20px",
                      marginLeft: `${MarginTop / 2}px`,
                      borderRadius: "5px",
                      fontSize: "20px",
                      backgroundColor: "#68399E",
                      color: "white",
                    }}
                  >
                    i
                  </button>
                </Box>
              </Box>
            </Box>
          </Dialog>
          <Dialog
            onClose={() => {
              setAgree(false);
            }}
            open={agree}
          >
            <Box
              sx={{
                backgroundColor: "#37285C",
                display: "flex",
                flexDirection: "column",
                width: "600px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "10px",
                  backgroundColor: "#37285C",
                }}
              >
                <Typography
                  sx={{
                    textAlign: "start",
                    fontSize: "20px",
                    fontWeight: "500 !important",
                    color: "#fff",
                    letterSpacing: "0.5px",
                  }}
                >
                  Agreement
                </Typography>
                <img
                  onClick={() => {
                    setAgree(false);
                  }}
                  src={images.closeButton}
                  alt="..."
                  style={{ width: "20px", height: "20px" }}
                />
              </Box>
              <Box
                sx={{
                  padding: `${MarginTop}px`,
                  backgroundColor: "#2E233D",
                  maxHeight: "500px",
                  overflowY: "auto",
                }}
              >
                <Typography
                  sx={{
                    textAlign: "start",
                    fontSize: "14px",
                    fontWeight: "500 !important",
                    marginLeft: "0px !important",
                    color: "#566EE7",
                    letterSpacing: "0.5px",
                  }}
                >
                  This Agreement ("Agreement") is made between Kingofthehill
                  Website ("Platform") and the User ("User") who wishes to
                  create and organize tournaments on the Platform. By using the
                  Platform and creating tournaments, the User agrees to be bound
                  by the terms and conditions set forth in this Agreement.
                  <br />
                  1. Tournament Creation
                  <br />
                  1.1 The User may create and organize tournaments on the
                  Platform.
                  <br />
                  1.2 The User shall provide accurate and complete information
                  during the tournament creation process, including but not
                  limited to email address, phone number, and physical address.
                  <br />
                  1.3 The User shall comply with all applicable laws and
                  regulations while creating and organizing tournaments on the
                  Platform.
                  <br />
                  2. Tournament Guidelines and Rules
                  <br />
                  2.1 The User shall adhere to the tournament guidelines and
                  rules set forth by the Platform.
                  <br />
                  2.2 The User shall ensure that the tournaments created do not
                  violate any intellectual property rights or infringe upon the
                  rights of any third party.
                  <br />
                  2.3 The User shall not create tournaments that promote or
                  encourage any form of illegal activity, violence, hatred, or
                  discrimination.
                  <br />
                  2.4 The User shall not create tournaments that involve
                  gambling or any other activity that may be considered illegal
                  or unethical.
                  <br />
                  3. Tournament Promotion and Marketing
                  <br />
                  3.1 The User may promote and market their tournaments within
                  the guidelines and rules set forth by the Platform.
                  <br />
                  3.2 The User shall ensure that any promotional or marketing
                  materials used for the tournaments comply with all applicable
                  laws and regulations.
                  <br />
                  3.3 The User shall not engage in any deceptive, misleading, or
                  fraudulent practices while promoting or marketing their
                  tournaments.
                  <br />
                  4. Privacy and Data Protection
                  <br />
                  4.1 The User acknowledges that the Platform may collect and
                  process personal information provided during the tournament
                  creation process.
                  <br />
                  4.2 The User shall comply with all applicable data protection
                  and privacy laws while collecting, using, and storing personal
                  information of participants.
                  <br />
                  4.3 The User shall not misuse or disclose any personal
                  information obtained from participants without their consent.
                  <br />
                  5. Liability and Indemnification
                  <br />
                  5.1 The User acknowledges that the Platform does not assume
                  any responsibility or liability for the tournaments created by
                  the User.
                  <br />
                  5.2 The User shall indemnify and hold the Platform harmless
                  from any claims, damages, or liabilities arising out of the
                  User's creation and organization of tournaments.
                  <br />
                  6. Termination
                  <br />
                  6.1 The Platform reserves the right to terminate or suspend
                  the User's access to the Platform and their ability to create
                  tournaments if the User breaches any terms or conditions of
                  this Agreement.
                  <br />
                  7. Governing Law and Dispute Resolution
                  <br />
                  7.1 This Agreement shall be governed by and construed in
                  accordance with the laws of the jurisdiction in which the
                  Platform operates.
                  <br />
                  7.2 Any disputes arising out of or in connection with this
                  Agreement shall be resolved through amicable negotiations. If
                  no resolution can be reached, the parties agree to submit to
                  the exclusive jurisdiction of the courts in the applicable
                  jurisdiction.
                  <br />
                  By creating tournaments on the Platform, the User acknowledges
                  that they have read, understood, and agreed to the terms and
                  conditions of this Agreement.
                  <br />
                  This Agreement is effective as of the date of the User's
                  acceptance and shall remain in effect until terminated by
                  either party
                </Typography>
              </Box>
              <Box sx={{ padding: `${MarginTop}px` }}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <img
                    style={{ width: "15px", height: "15px" }}
                    alt="..."
                    src={images.Checked}
                  />
                  <Typography
                    sx={{
                      textAlign: "start",
                      fontSize: "14px",
                      fontWeight: "500 !important",
                      marginLeft: `${MarginTop / 2}px !important`,
                      color: "#9484A9",
                      letterSpacing: "0.5px",
                    }}
                  >
                    I have read and agree to the terms and conditions
                  </Typography>
                </Box>
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: `${MarginTop}px`,
                  }}
                >
                  <button
                    onClick={() => {
                      setAgree(false);
                      setCreateTour(true);
                    }}
                    style={{
                      padding: "10px 30px",
                      border: "none",
                      outline: "none",
                      background: "linear-gradient(#8A3AF1,#7648ED)",
                      color: "white",
                      letterSpacing: "0.7px",
                      borderRadius: "5px",
                    }}
                  >
                    Continue
                  </button>
                </Box>
              </Box>
            </Box>
          </Dialog>
        </Box>
      }
    />
  );
}
