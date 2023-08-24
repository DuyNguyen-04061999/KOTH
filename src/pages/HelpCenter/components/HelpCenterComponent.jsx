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
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const { width } = useWindowDimensions();

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

  const labelTab = [
    "Privacy And Policy",
    "Term of Service",
    "Fairness",
    "Design Resources",
    "FAQ",
  ];

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
              <TabContext value={value}>
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
                    {labelTab?.map((item, index) => {
                      return (
                        <Tab
                          key={index}
                          label={item}
                          style={{
                            color: value === index ? "white" : "#9B9ACF",
                            backgroundColor:
                              value === index ? "#5F3491" : "unset",
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
                  <TabPanel value={value} index={0}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Porro sapiente aspernatur accusantium, consectetur earum
                    ipsam! Consequuntur soluta suscipit id! Dolorum recusandae
                    exercitationem fuga officia. Laboriosam rerum quisquam hic
                    consequatur atque! Lorem ipsum dolor sit amet consectetur
                    adipisicing elit. Porro sapiente aspernatur accusantium,
                    consectetur earum ipsam! Consequuntur soluta suscipit id!
                    Dolorum recusandae exercitationem fuga officia. Laboriosam
                    rerum quisquam hic consequatur atque! Lorem ipsum dolor sit
                    amet consectetur adipisicing elit. Porro sapiente aspernatur
                    accusantium, consectetur earum ipsam! Consequuntur soluta
                    suscipit id! Dolorum recusandae exercitationem fuga officia.
                    Laboriosam rerum quisquam hic consequatur atque! Lorem ipsum
                    dolor sit amet consectetur adipisicing elit. Porro sapiente
                    aspernatur accusantium, consectetur earum ipsam!
                    Consequuntur soluta suscipit id! Dolorum recusandae
                    exercitationem fuga officia. Laboriosam rerum quisquam hic
                    consequatur atque! Lorem ipsum dolor sit amet consectetur
                    adipisicing elit. Porro sapiente aspernatur accusantium,
                    consectetur earum ipsam! Consequuntur soluta suscipit id!
                    Dolorum recusandae exercitationem fuga officia. Laboriosam
                    rerum quisquam hic consequatur atque! Lorem ipsum dolor sit
                    amet consectetur adipisicing elit. Porro sapiente aspernatur
                    accusantium, consectetur earum ipsam! Consequuntur soluta
                    suscipit id! Dolorum recusandae exercitationem fuga officia.
                    Laboriosam rerum quisquam hic consequatur atque! Lorem ipsum
                    dolor sit amet consectetur adipisicing elit. Porro sapiente
                    aspernatur accusantium, consectetur earum ipsam!
                    Consequuntur soluta suscipit id! Dolorum recusandae
                    exercitationem fuga officia. Laboriosam rerum quisquam hic
                    consequatur atque! Lorem ipsum dolor sit amet consectetur
                    adipisicing elit. Porro sapiente aspernatur accusantium,
                    consectetur earum ipsam! Consequuntur soluta suscipit id!
                    Dolorum recusandae exercitationem fuga officia. Laboriosam
                    rerum quisquam hic consequatur atque! Lorem ipsum dolor sit
                    amet consectetur adipisicing elit. Porro sapiente aspernatur
                    accusantium, consectetur earum ipsam! Consequuntur soluta
                    suscipit id! Dolorum recusandae exercitationem fuga officia.
                    Laboriosam rerum quisquam hic consequatur atque! Lorem ipsum
                    dolor sit amet consectetur adipisicing elit. Porro sapiente
                    aspernatur accusantium, consectetur earum ipsam!
                    Consequuntur soluta suscipit id! Dolorum recusandae
                    exercitationem fuga officia. Laboriosam rerum quisquam hic
                    consequatur atque! Lorem ipsum dolor sit amet consectetur
                    adipisicing elit. Porro sapiente aspernatur accusantium,
                    consectetur earum ipsam! Consequuntur soluta suscipit id!
                    Dolorum recusandae exercitationem fuga officia. Laboriosam
                    rerum quisquam hi
                  </TabPanel>
                  <TabPanel value={value} index={1}>
                    Item Two
                  </TabPanel>
                  <TabPanel value={value} index={2}>
                    Item Three
                  </TabPanel>
                  <TabPanel value={value} index={3}>
                    Item Two
                  </TabPanel>
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
                  value={value}
                  onChange={handleChange}
                  sx={{
                    bgcolor: "#302642",
                    minWidth: "142px",
                    padding: "13px 13px 13px 0px",
                  }}
                  indicatorColor="unset"
                >
                  {labelTab?.map((item, index) => {
                    return (
                      <Tab
                        key={index}
                        sx={{ textTransform: "none" }}
                        label={item}
                        style={{
                          marginBottom: "16px",
                          color: value === index ? "white" : "#9B9ACF",
                          padding: "7px 10px",
                          backgroundColor:
                            value === index ? "#5F3491" : "unset",
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
                  <TabPanel value={value} index={0}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Porro sapiente aspernatur accusantium, consectetur earum
                    ipsam! Consequuntur soluta suscipit id! Dolorum recusandae
                    exercitationem fuga officia. Laboriosam rerum quisquam hic
                    consequatur atque! Lorem ipsum dolor sit amet consectetur
                    adipisicing elit. Porro sapiente aspernatur accusantium,
                    consectetur earum ipsam! Consequuntur soluta suscipit id!
                    Dolorum recusandae exercitationem fuga officia. Laboriosam
                    rerum quisquam hic consequatur atque! Lorem ipsum dolor sit
                    amet consectetur adipisicing elit. Porro sapiente aspernatur
                    accusantium, consectetur earum ipsam! Consequuntur soluta
                    suscipit id! Dolorum recusandae exercitationem fuga officia.
                    Laboriosam rerum quisquam hic consequatur atque! Lorem ipsum
                    dolor sit amet consectetur adipisicing elit. Porro sapiente
                    aspernatur accusantium, consectetur earum ipsam!
                    Consequuntur soluta suscipit id! Dolorum recusandae
                    exercitationem fuga officia. Laboriosam rerum quisquam hic
                    consequatur atque! Lorem ipsum dolor sit amet consectetur
                    adipisicing elit. Porro sapiente aspernatur accusantium,
                    consectetur earum ipsam! Consequuntur soluta suscipit id!
                    Dolorum recusandae exercitationem fuga officia. Laboriosam
                    rerum quisquam hic consequatur atque! Lorem ipsum dolor sit
                    amet consectetur adipisicing elit. Porro sapiente aspernatur
                    accusantium, consectetur earum ipsam! Consequuntur soluta
                    suscipit id! Dolorum recusandae exercitationem fuga officia.
                    Laboriosam rerum quisquam hic consequatur atque! Lorem ipsum
                    dolor sit amet consectetur adipisicing elit. Porro sapiente
                    aspernatur accusantium, consectetur earum ipsam!
                    Consequuntur soluta suscipit id! Dolorum recusandae
                    exercitationem fuga officia. Laboriosam rerum quisquam hic
                    consequatur atque! Lorem ipsum dolor sit amet consectetur
                    adipisicing elit. Porro sapiente aspernatur accusantium,
                    consectetur earum ipsam! Consequuntur soluta suscipit id!
                    Dolorum recusandae exercitationem fuga officia. Laboriosam
                    rerum quisquam hic consequatur atque! Lorem ipsum dolor sit
                    amet consectetur adipisicing elit. Porro sapiente aspernatur
                    accusantium, consectetur earum ipsam! Consequuntur soluta
                    suscipit id! Dolorum recusandae exercitationem fuga officia.
                    Laboriosam rerum quisquam hic consequatur atque! Lorem ipsum
                    dolor sit amet consectetur adipisicing elit. Porro sapiente
                    aspernatur accusantium, consectetur earum ipsam!
                    Consequuntur soluta suscipit id! Dolorum recusandae
                    exercitationem fuga officia. Laboriosam rerum quisquam hic
                    consequatur atque! Lorem ipsum dolor sit amet consectetur
                    adipisicing elit. Porro sapiente aspernatur accusantium,
                    consectetur earum ipsam! Consequuntur soluta suscipit id!
                    Dolorum recusandae exercitationem fuga officia. Laboriosam
                    rerum quisquam hi
                  </TabPanel>
                  <TabPanel value={value} index={1}>
                    Item Two
                  </TabPanel>
                  <TabPanel value={value} index={2}>
                    Item Three
                  </TabPanel>
                  <TabPanel value={value} index={3}>
                    Item Four
                  </TabPanel>
                  <TabPanel value={value} index={4}>
                    Item Five
                  </TabPanel>
                  <TabPanel value={value} index={5}>
                    Item Six
                  </TabPanel>
                  <TabPanel value={value} index={6}>
                    Item Seven
                  </TabPanel>
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
