import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";
import moment from "moment/moment";
import * as React from "react";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import DocumentMeta from "react-document-meta";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import ParagraphLoading from "../../../components/LoadingComponent/ParagraphLoading";
import { imageDesktop } from "../../../utils/images";
import useWindowDimensions from "../../../utils/useWindowDimensions";

const HelpCenterComponent = () => {
  const { tabHelpCenter, listFAQPromote, isFetching } = useSelector(
    (state) => state.helpcenterReducer
  );
  const { device } = useSelector((state) => state.deviceReducer);
  const dispatch = useDispatch();
  const [listFAQ, setListFAQ] = useState([]);
  const { t } = useTranslation("help_center");
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
            <Box
              sx={{ fontWeight: "lighter !important" }}
              style={{ textAlign: "start" }}
            >
              {children}
            </Box>
          </Box>
        )}
      </div>
    );
  }

  const meta = {
    title:
      process.env.REACT_APP_ENV === "production"
        ? "Play4promo help center"
        : "Play4promo staging help center",
    description:
      "Unlock exciting voucher rewards with Play4Promo's promotions and gaming thrills.",
    meta: {
      charset: "utf-8",
      name:
        process.env.REACT_APP_URL_DOMAIN === "socket.play4promote.com"
          ? {
              robots: "noindex",
              keywords: `play4promo,play,promo`,
            }
          : {
              keywords: `play4promo,play,promo`,
            },
      property: {
        "og:title":
          process.env.REACT_APP_ENV === "production"
            ? "Play4promo help center"
            : "Play4promo staging help center",
        "og:url": window.location.href,
        "og:image:secure_url":
          process.env.REACT_APP_ENV === "development"
            ? imageDesktop.logoCT
            : "https://storage.googleapis.com/web-system-files/logos/lggame.png",
        "og:image":
          process.env.REACT_APP_ENV === "development"
            ? imageDesktop.logoCT
            : "https://storage.googleapis.com/web-system-files/logos/lggame.png",
        "og:image:type": "image/png",
        "og:image:width": `144`,
        "og:image:height": `144`,
        "og:image:alt": "Play4promo Photo",
      },
    },
  };

  return (
    <DocumentMeta {...meta}>
      {device === "Mobile" || device === "Tablet" ? (
        <Container
          style={{
            padding:
              width < 576 ? "16px 24px 24px 24px" : "16px 24px 24px 50px",
            marginBottom: "75px",
          }}
        >
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
            <Tabs
              value={tabHelpCenter}
              onChange={handleChange}
              indicatorColor="unset"
              style={{ backgroundColor: "#302642" }}
            >
              {listFAQ?.length &&
                listFAQ
                  ?.sort(function (a, b) {
                    return a.id - b.id;
                  })
                  .map((item, index) => {
                    return (
                      <Tab
                        key={index}
                        label={item?.faqTitle}
                        style={{
                          color: tabHelpCenter === index ? "white" : "#9B9ACF",
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
            </Tabs>
            <Box
              sx={{
                padding: "27px 8px",
                backgroundColor: "#282136",
                color: "white",
                maxHeight: "500px",
                overflowY: "auto",
              }}
            >
              {isFetching ? (
                <ParagraphLoading lines={10} />
              ) : (
                <>
                  {" "}
                  <Box
                    style={{
                      fontSize: "16px",
                      fontWeight: "bold",
                    }}
                  >
                    {listFAQ?.length > 0 &&
                      listFAQ?.map((item) => {
                        JSON.parse(item.faqDesc)?.length > 0 &&
                          JSON.parse(item.faqDesc)?.map((title) => (
                            <p>{title}</p>
                          ));
                      })}
                    {listFAQ?.length &&
                    listFAQ[tabHelpCenter]?.faqTitle ===
                      "Privacy And Policy" ? (
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          marginTop: width < 576 ? "24px" : "",
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="100"
                          height="100"
                          fill="none"
                          viewBox="0 0 25 25"
                        >
                          <path
                            fill="#F05153"
                            d="M12.263 24.204H3.502c-2.76 0-4.356-2.843-3.025-5.401A3262.403 3262.403 0 019.31 1.938C10.67-.636 13.903-.65 15.262 1.92a2396.638 2396.638 0 018.855 16.923c1.306 2.521-.315 5.353-3.032 5.36-2.94.007-5.88 0-8.822 0zm.036-17.287c-.269 0-.537.015-.804.046-.827.143-1.32.847-1.226 1.73.195 1.807.392 3.612.59 5.416.098.89.628 1.444 1.383 1.464.797.02 1.359-.508 1.466-1.434.21-1.825.41-3.652.6-5.48.089-.858-.402-1.538-1.2-1.689a6.192 6.192 0 00-.81-.052v-.001zM12.286 20.5c.41 0 .805-.173 1.096-.481.29-.308.454-.726.454-1.162 0-.435-.163-.853-.454-1.16a1.508 1.508 0 00-1.096-.482 1.537 1.537 0 00-1.095.5c-.29.312-.452.732-.453 1.17.027.868.742 1.618 1.548 1.616V20.5z"
                          ></path>
                        </svg>
                        <Typography
                          className="ms-2"
                          sx={{
                            color: "#e75857",
                            textAlign: "left",
                            fontSize: width < 576 ? "12px" : "16px",
                          }}
                        >
                          Persons under the age of 18 should use this Website
                          only with the supervision of an Adult. Payment
                          Information must be provided by or with the permission
                          of an Adult
                        </Typography>
                      </Box>
                    ) : (
                      ""
                    )}
                  </Box>
                  <Typography
                    style={{
                      fontSize: "14px",
                      textAlign: "start",
                      marginTop: "12px",
                    }}
                  >
                    {listFAQ?.length > 0 && listFAQ[tabHelpCenter]?.faqDesc}
                  </Typography>
                  {listFAQ?.length &&
                    listFAQ?.map((item, index) => (
                      <TabPanel value={tabHelpCenter} key={index} index={index}>
                        {item?.FAQPromoteData?.map((item, index) => {
                          return (
                            <Box key={index}>
                              <Typography
                                style={{
                                  fontSize: "12px",
                                  color: "#fff",
                                  fontWeight: "bold",
                                  textAlign: "start",
                                  margin: "12px 0px",
                                }}
                              >
                                {item?.faqQuestion}
                              </Typography>
                              <Box>
                                {JSON.parse(item?.faqAnswer)?.map((e, i) => (
                                  <Typography
                                    key={i}
                                    style={{
                                      fontSize: "12px",
                                      color: "#fff",
                                      textAlign: "start",
                                      marginTop: "6px",
                                    }}
                                  >
                                    {e}
                                  </Typography>
                                ))}
                              </Box>
                            </Box>
                          );
                        })}
                        <Typography
                          style={{
                            margin: "20px 0px",
                            fontSize: "10px",
                          }}
                        >{`Last Updated: [${moment(item?.updatedAt).format(
                          "MMM Do YY"
                        )}]`}</Typography>
                      </TabPanel>
                    ))}
                </>
              )}
            </Box>
          </Box>
        </Container>
      ) : (
        <Container>
          <Box sx={{ margin: "40px 0" }}>
            <Typography
              sx={{
                fontSize: 36,
                textAlign: "start",
                color: "white",
              }}
              children={t("Help Center")}
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
                value={Number.parseInt(tabHelpCenter)}
                onChange={handleChange}
                sx={{
                  bgcolor: "#302642",
                  minWidth: "142px",
                  padding: "13px 13px 13px 0px",
                }}
                indicatorColor="unset"
              >
                {listFAQ?.length &&
                  listFAQ
                    ?.sort(function (a, b) {
                      return a.id - b.id;
                    })
                    .map((item, index) => {
                      return (
                        <Tab
                          key={index}
                          sx={{ textTransform: "none" }}
                          label={item?.faqTitle}
                          style={{
                            marginBottom: "16px",
                            color:
                              tabHelpCenter === index ? "white" : "#9B9ACF",
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
                {isFetching ? (
                  <ParagraphLoading lines={10} />
                ) : (
                  <>
                    {" "}
                    <Box style={{ fontSize: "24px", fontWeight: "bold" }}>
                      {listFAQ?.length && listFAQ[tabHelpCenter]?.faqTitle}
                      {listFAQ?.length &&
                      listFAQ[tabHelpCenter]?.faqTitle ===
                        "Privacy And Policy" ? (
                        <Box
                          sx={{
                            display: "flex",
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="30"
                            height="30"
                            fill="none"
                            viewBox="0 0 25 25"
                          >
                            <path
                              fill="#F05153"
                              d="M12.263 24.204H3.502c-2.76 0-4.356-2.843-3.025-5.401A3262.403 3262.403 0 019.31 1.938C10.67-.636 13.903-.65 15.262 1.92a2396.638 2396.638 0 018.855 16.923c1.306 2.521-.315 5.353-3.032 5.36-2.94.007-5.88 0-8.822 0zm.036-17.287c-.269 0-.537.015-.804.046-.827.143-1.32.847-1.226 1.73.195 1.807.392 3.612.59 5.416.098.89.628 1.444 1.383 1.464.797.02 1.359-.508 1.466-1.434.21-1.825.41-3.652.6-5.48.089-.858-.402-1.538-1.2-1.689a6.192 6.192 0 00-.81-.052v-.001zM12.286 20.5c.41 0 .805-.173 1.096-.481.29-.308.454-.726.454-1.162 0-.435-.163-.853-.454-1.16a1.508 1.508 0 00-1.096-.482 1.537 1.537 0 00-1.095.5c-.29.312-.452.732-.453 1.17.027.868.742 1.618 1.548 1.616V20.5z"
                            ></path>
                          </svg>
                          <Typography
                            className="ms-2"
                            sx={{ color: "#e75857", textAlign: "left" }}
                          >
                            Persons under the age of 18 should use this Website
                            only with the supervision of an Adult. Payment
                            Information must be provided by or with the
                            permission of an Adult
                          </Typography>
                        </Box>
                      ) : (
                        ""
                      )}
                    </Box>
                    <Typography
                      style={{
                        fontSize: "16px",
                        textAlign: "start",
                        marginTop: "24px",
                      }}
                    >
                      {listFAQ?.length && listFAQ[tabHelpCenter]?.faqDesc}
                    </Typography>
                    {listFAQ?.length &&
                      listFAQ?.map((item, index) => (
                        <TabPanel
                          key={index}
                          value={tabHelpCenter}
                          index={index}
                        >
                          {item?.FAQPromoteData?.map((item, index) => {
                            return (
                              <Box key={index}>
                                <Typography
                                  style={{
                                    fontSize: "20px",
                                    textAlign: "start",
                                    margin: "24px 0px",
                                    color: "#fff",
                                    fontWeight: "bold",
                                  }}
                                >
                                  {item?.faqQuestion}
                                </Typography>
                                <Box>
                                  {JSON.parse(item?.faqAnswer)?.map((e, i) => (
                                    <Typography
                                      key={i}
                                      style={{
                                        fontSize: "14px",
                                        textAlign: "start",
                                        marginTop: "12px",
                                        color: "#fff",
                                      }}
                                    >
                                      {e}
                                    </Typography>
                                  ))}
                                </Box>
                              </Box>
                            );
                          })}
                          <Typography
                            style={{
                              margin: "36px 0px",
                              fontSize: "14px",
                            }}
                          >{`Last Updated: [${moment(item?.updatedAt).format(
                            "MMM Do YY"
                          )}]`}</Typography>
                        </TabPanel>
                      ))}
                  </>
                )}
              </Box>
            </Box>
          </Box>
        </Container>
      )}
    </DocumentMeta>
  );
};

export default HelpCenterComponent;
