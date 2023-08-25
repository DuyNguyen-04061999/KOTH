import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useState } from "react";
import { Container } from "react-bootstrap";
import useWindowDimensions from "../../../utils/useWindowDimensions";
import { TabContext, TabList } from "@mui/lab";
import InspirationTTF from "../../../assets/font/CynthoNextMedium.otf";
import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import moment from "moment/moment";

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
const HelpCenterComponent = () => {
  const { tabHelpCenter, listFAQPromote } = useSelector(
    (state) => state.helpcenterReducer
  );
  const dispatch = useDispatch();
  const [listFAQ, setListFAQ] = useState([]);

  const handleChange = (event, newValue) => {
    dispatch({
      type: "SET_TAB_HELPCENTER",
      payload: newValue,
    });
  };

  const { width } = useWindowDimensions();

  useEffect(() => {
    dispatch({
      type: "GET_LIST_FAQ_PROMOTE",
    });
  }, [dispatch]);

  useEffect(() => {
    setListFAQ(listFAQPromote);
  }, [listFAQPromote]);

  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`vertical-tabpanel-${index}`}
        aria-labelledby={`vertical-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ overflowY: "auto" }}>
            <Typography
              sx={{ fontWeight: "lighter !important" }}
              style={{ textAlign: "start" }}
            >
              {children}
            </Typography>
          </Box>
        )}
      </div>
    );
  }

  if (width < 576) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline>
          <Container style={{ padding: "16px 24px 61px 24px" }}>
            <Box sx={{ margin: "16px 0px 32px 0px" }}>
              <Typography
                sx={{
                  fontSize: 36,
                  textAlign: "start",
                  color: "white",
                }}
                children="Help Center"
              />
            </Box>
            <Box sx={{ width: "100%", typography: "body1" }}>
              <TabContext value={tabHelpCenter}>
                <Box
                  sx={{
                    borderBottom: 1,
                    borderColor: "divider",
                    width: "100%",
                  }}
                >
                  <TabList
                    onChange={handleChange}
                    aria-label="lab API tabs example"
                    style={{
                      backgroundColor: "#302642",
                    }}
                    indicatorColor="unset"
                    variant="scrollable"
                    scrollButtons="auto"
                  >
                    {listFAQ?.map((item, index) => {
                      return (
                        <Tab
                          key={index}
                          label={item?.faqTitle}
                          style={{
                            color:
                              tabHelpCenter === index ? "white" : "#9B9ACF",
                            backgroundColor:
                              tabHelpCenter === index ? "#5F3491" : "unset",
                            fontSize: "10px",
                            fontStyle: "normal",
                            lineHeight: "normal",
                            transition:
                              "all 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
                            textTransform: "capitalize !important",
                          }}
                          sx={{
                            minWidth: "43px",
                            textTransform: "unset",
                            padding: "6px 12px",
                            maxHeight: "36px",
                            flexShrink: 1,
                          }}
                        />
                      );
                    })}
                  </TabList>
                </Box>
                <Box
                  sx={{
                    padding: "27px 8px",
                    backgroundColor: "#282136",
                    color: "white",
                    maxHeight: "618px",
                    overflowY: "auto",
                  }}
                >
                  {listFAQ?.map((item, index) => (
                    <TabPanel value={tabHelpCenter} key={index} index={index}>
                      {item?.FAQPromoteData?.map((item, index) => (
                        <Box key={index}>
                          <h6
                            style={{
                              margin: "20px 0px",
                              fontWeight: "bold",
                              fontSize: "16px",
                              textAlign: "start",
                            }}
                          >
                            {item?.faqQuestion}
                          </h6>
                          <p
                            style={{
                              fontSize: "10px",
                              textAlign: "start",
                              margin: "10px 0px",
                            }}
                          >
                            {item?.faqAnswer}
                          </p>
                        </Box>
                      ))}
                      <p
                        style={{
                          margin: "20px 0px",
                          fontSize: "10px",
                          textAlign: "start",
                        }}
                      >{`Last Updated: [${moment(item?.updatedAt)}]`}</p>
                    </TabPanel>
                  ))}
                </Box>
              </TabContext>
            </Box>
          </Container>
        </CssBaseline>
      </ThemeProvider>
    );
  } else {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline>
          <Container>
            <Box sx={{ margin: "40px 0" }}>
              <Typography
                sx={{
                  fontSize: 36,
                  textAlign: "start",
                  color: "white",
                }}
                children="Help Center"
              />
            </Box>
            <Box
              sx={{
                height: "70vh",
              }}
            >
              <Box
                sx={{
                  flexGrow: 1,
                  display: "flex",
                  height: "100%",
                }}
              >
                <Tabs
                  orientation="vertical"
                  variant="scrollable"
                  value={tabHelpCenter}
                  onChange={handleChange}
                  sx={{
                    bgcolor: "#302642",
                    minWidth: "142px",
                    padding: "13px 13px 13px 0px",
                  }}
                  indicatorColor="unset"
                >
                  {listFAQ?.map((item, index) => {
                    return (
                      <Tab
                        key={index}
                        sx={{ textTransform: "none" }}
                        label={item?.faqTitle}
                        style={{
                          marginBottom: "16px",
                          color: tabHelpCenter === index ? "white" : "#9B9ACF",
                          padding: "7px 10px",
                          backgroundColor:
                            tabHelpCenter === index ? "#5F3491" : "unset",
                          borderTopRightRadius: "8px",
                          borderBottomRightRadius: "8px",
                          fontSize: "16px",
                          fontStyle: "normal",
                          fontWeight: "600",
                          lineHeight: "normal",
                          transition:
                            "all 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
                        }}
                      />
                    );
                  })}
                </Tabs>
                <Box
                  sx={{
                    bgcolor: "#282136",
                    width: "100%",
                    color: "white",
                    height: "100%",
                    overflowY: "auto",
                    padding: "13px 24px",
                  }}
                >
                  {listFAQ?.map((item, index) => (
                    <TabPanel key={index} value={tabHelpCenter} index={index}>
                      {item?.FAQPromoteData?.map((item, index) => (
                        <Box key={index}>
                          <h6
                            style={{
                              fontSize: "20px",
                              textAlign: "start",
                              margin: "24px 0px",
                              fontWeight: "bold",
                            }}
                          >
                            {item?.faqQuestion}
                          </h6>
                          <p
                            style={{
                              fontSize: "14px",
                              textAlign: "start",
                              marginTop: "12px",
                            }}
                          >
                            {item?.faqAnswer}
                          </p>
                        </Box>
                      ))}
                      <p
                        style={{
                          fontSize: "14px",
                          margin: "36px 0",
                          textAlign: "start",
                        }}
                      >{`Last Updated: [${moment(item?.updatedAt)}]`}</p>
                    </TabPanel>
                  ))}
                </Box>
              </Box>
            </Box>
          </Container>
        </CssBaseline>
      </ThemeProvider>
    );
  }
};

export default HelpCenterComponent;
