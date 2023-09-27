import {
  Box,
  Button,
  Container,
  List,
  ListItem,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useRef } from "react";
import { styled } from "@mui/material/styles";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import { useState } from "react";
import { ExpandMoreOutlined } from "@mui/icons-material";
import useWindowDimensions from "../../../utils/useWindowDimensions";
import SearchBar from "../../../components/Admin/SearchBar/SearchBar";
import { useDispatch, useSelector } from "react-redux";
import { changePassword } from "../../../redux-saga-middleware_admin/reducers/adminAuthReducer";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `2px solid #E4E4E4`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
  borderRadius: "16px",
  overflow: "hidden",
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ExpandMoreOutlined sx={{ fontSize: "24px" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark" ? "rgba(255, 255, 255, .05)" : "#F7F7F7",
  flexDirection: "row",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(180deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
  padding: "11px 24px",
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "2px solid rgba(0, 0, 0, .125)",
}));

const Setting = () => {
  const [expanded, setExpanded] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(1);
  const [americanTimeZones, setAmericanTimeZones] = useState([
    "UTC -10: HST Hawaii Standard Time",
    "UTC -9	HDT	Hawaii-Aleutian Daylight Time",
    "UTC -8	AKDT	Alaska Daylight Time",
    "UTC -7	PDT	Pacific Daylight Time",
    "UTC -7	MST	Mountain Standard Time",
    "UTC -6	MDT	Mountain Daylight Time",
    "UTC -5	CDT	Central Daylight Time",
    "UTC -4	EDT	Eastern Daylight Time",
  ]);
  const [passwordError, setPasswordError] = useState("");
  const { width } = useWindowDimensions();
  const currentPassInput = useRef("");
  const newPassInput = useRef("");
  const rePassInput = useRef("");
  const dispatch = useDispatch();
  const { errorChangePassword } = useSelector(
    (state) => state.adminAuthReducer
  );

  useEffect(() => {
    setPasswordError(errorChangePassword);
  }, [errorChangePassword]);

  const handleListItemClick = (index) => {
    setSelectedIndex(index);
  };
  const handleChange = () => {
    setExpanded((prevState) => !prevState);
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    const currentPass = currentPassInput.current.value;
    const newPass = newPassInput.current.value;
    const rePass = rePassInput.current.value;
    if (currentPass === "" || newPass === "" || rePass === "") {
      setPasswordError("Please fill all required fields !");
    } else if (rePass !== newPass) {
      setPasswordError("Re-enter password and password is not match !");
    } else if (newPass?.length < 9) {
      setPasswordError("Password must be more than 9 character !");
    } else {
      dispatch(
        changePassword({
          currentPass: currentPass,
          password: newPass,
        })
      );
      setPasswordError("");
    }
  };

  const handleConfirmTimeZone = (e) => {
    e.preventDefault();
    console.log(americanTimeZones[selectedIndex]);
  };

  const handleSearchTimeZone = (e) => {
    e.preventDefault();
  };

  const handleChangeSearch = (e) => {
    e.preventDefault();
  };

  return (
    <Container>
      <Box>
        <Box
          sx={{
            fontSize: "24px",
            fontWeight: 600,
            lineHeight: "16px",
            marginTop: "40px",
          }}
        >
          Settings
        </Box>
        <Box sx={{ marginTop: "60px" }}>
          <Accordion expanded={expanded}>
            <AccordionSummary
              onClick={handleChange}
              aria-controls="panel1d-content"
              id="panel1d-header"
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "18px",
                    fontWeight: 500,
                    lineHeight: "24px",
                    color: "#11142D",
                  }}
                >
                  Time Zone
                </Typography>
                <Box
                  sx={{
                    marginLeft: "32px",
                    width: "336px",
                    display: width < 768 && "none",
                  }}
                >
                  <SearchBar
                    placeholder="Search"
                    onChange={handleChangeSearch}
                    onSubmit={handleSearchTimeZone}
                  />
                </Box>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <List sx={{ maxHeight: "220px", overflow: "scroll" }}>
                {americanTimeZones?.map((item, index) => (
                  <ListItem
                    disablePadding
                    key={index}
                    onClick={() => handleListItemClick(index)}
                    sx={{
                      borderRadius: "6px",
                      overflow: "hidden",
                      backgroundColor:
                        selectedIndex === index
                          ? "#355DFF"
                          : index % 2 !== 0 && "#F7F7F7",
                      fontSize: "14px",
                      fontWeight: 500,
                      color: selectedIndex === index ? "#fff" : "#000",
                      lineHeight: "24px",
                      fontFamily: "Cyntho Next",
                      cursor: "pointer",
                      ":hover": {
                        backgroundColor:
                          selectedIndex === index ? "#355DFF" : "#F8F8F8",
                      },
                      padding: "10px 16px",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "14px",
                        fontWeight: 500,
                        lineHeight: "24px",
                        fontFamily: "Cyntho Next",
                      }}
                    >
                      {item}
                    </Typography>
                  </ListItem>
                ))}
              </List>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3,1fr)",
                  gridColumnGap: "36px",
                  marginTop: "42px",
                }}
              >
                <Button
                  sx={{
                    backgroundColor: "#355DFF",
                    color: "white",
                    borderRadius: "12px",
                    fontSize: "14px",
                    fontFamily: "Cyntho Next",
                    fontWeight: 700,
                    textTransform: "unset",
                    gridColumnStart: 3,
                    gridColumnEnd: 4,
                    ":hover": {
                      backgroundColor: "#355DFF",
                      opacity: 0.9,
                    },
                    padding: "12px 0",
                  }}
                  onClick={handleConfirmTimeZone}
                >
                  Confirm
                </Button>
              </Box>
            </AccordionDetails>
          </Accordion>
        </Box>
        <Box
          sx={{
            marginTop: "60px",
            borderRadius: "16px",
            overflow: "hidden",
            border: `2px solid #E4E4E4`,
          }}
        >
          <Box
            sx={{
              fontSize: "18px",
              fontWeight: 500,
              lineHeight: "24px",
              padding: "23px 37px",
              backgroundColor: "#F7F7F7",
            }}
          >
            Change Password
          </Box>
          <Box
            component={"form"}
            sx={{ padding: "28px", borderTop: "2px solid #E4E4E4" }}
          >
            <Box
              sx={{
                display: width < 1024 ? "flex" : "grid",
                flexDirection: "column",
                gridTemplateColumns: "repeat(3,1fr)",
                gridRowGap: "36px",
                gridColumnGap: "48px",
              }}
            >
              <Box
                sx={{
                  border: "2px solid #355DFF",
                  borderRadius: "12px",
                  backgroundColor: "#fff",
                  padding: "14px 18px",
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Box
                  sx={{
                    color: "#808191",
                    fontFeatureSettings: "'clig' off, 'liga' off",
                    fontFamily: "Cyntho Next",
                    fontSize: "10px",
                    fontWeight: 700,
                    lineHeight: "16px",
                    textTransform: "uppercase",
                    position: "absolute",
                    top: "16px",
                    left: "20px",
                    letterSpacing: "0.9px",
                  }}
                >
                  Current Password
                </Box>
                <Box
                  component={"input"}
                  variant="standard"
                  sx={{
                    fontSize: "16px",
                    width: "100%",
                    border: "none",
                    outline: "none",
                    marginTop: "20px",
                    letterSpacing: "0.3em",
                  }}
                  type="password"
                  ref={currentPassInput}
                />
              </Box>
              <Box
                sx={{
                  border: "2px solid #355DFF",
                  borderRadius: "12px",
                  backgroundColor: "#fff",
                  padding: "14px 18px",
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Box
                  sx={{
                    color: "#808191",
                    fontFeatureSettings: "'clig' off, 'liga' off",
                    fontFamily: "Cyntho Next",
                    fontSize: "10px",
                    fontWeight: 700,
                    lineHeight: "16px",
                    textTransform: "uppercase",
                    position: "absolute",
                    top: "16px",
                    left: "20px",
                    letterSpacing: "0.9px",
                  }}
                >
                  New Password
                </Box>
                <Box
                  component={"input"}
                  variant="standard"
                  sx={{
                    fontSize: "16px",
                    width: "100%",
                    border: "none",
                    outline: "none",
                    marginTop: "20px",
                    letterSpacing: "0.3em",
                  }}
                  type="password"
                  ref={newPassInput}
                />
              </Box>
              <Box
                sx={{
                  border: "2px solid #355DFF",
                  borderRadius: "12px",
                  backgroundColor: "#fff",
                  padding: "14px 18px",
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Box
                  sx={{
                    color: "#808191",
                    fontFeatureSettings: "'clig' off, 'liga' off",
                    fontFamily: "Cyntho Next",
                    fontSize: "10px",
                    fontWeight: 700,
                    lineHeight: "16px",
                    textTransform: "uppercase",
                    position: "absolute",
                    top: "16px",
                    left: "20px",
                    letterSpacing: "0.9px",
                  }}
                >
                  Password
                </Box>
                <Box
                  component={"input"}
                  variant="standard"
                  sx={{
                    fontSize: "16px",
                    width: "100%",
                    border: "none",
                    outline: "none",
                    marginTop: "20px",
                    letterSpacing: "0.3em",
                  }}
                  type="password"
                  ref={rePassInput}
                />
              </Box>
              <Box>
                <p style={{ color: "red" }}>{passwordError}</p>
              </Box>
              <Button
                type="submit"
                sx={{
                  backgroundColor: "#355DFF",
                  color: "white",
                  borderRadius: "12px",
                  fontSize: "14px",
                  fontFamily: "Cyntho Next",
                  fontWeight: 700,
                  textTransform: "unset",
                  gridColumnStart: 3,
                  gridColumnEnd: 4,
                  ":hover": {
                    backgroundColor: "#355DFF",
                    opacity: 0.9,
                  },
                  padding: "12px 0",
                }}
                onClick={handleChangePassword}
              >
                Change Password
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default Setting;
