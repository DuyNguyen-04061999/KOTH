import { ExpandMoreOutlined } from "@mui/icons-material";
import CopyIcon from "@mui/icons-material/CopyAll";
import {
  Box,
  Button,
  Collapse,
  Typography
} from "@mui/material";
import copy from "copy-to-clipboard";
import React, { useEffect, useRef, useState } from "react";
import { CSVLink } from "react-csv";
import { useDispatch, useSelector } from "react-redux";
import { getListEndUser } from "../../../redux-saga-middleware_admin/reducers/adminAgentReducer";
import { showToastNotify } from "../../../redux-saga-middleware_admin/reducers/adminAlertReducer";
import { getListSub } from "../../../redux-saga-middleware_admin/reducers/adminDistributorReducer";
import { getListDistributor } from "../../../redux-saga-middleware_admin/reducers/adminMasterReducer";
import { updateDetailAccount } from "../../../redux-saga-middleware_admin/reducers/adminReducer";
import { getListRef } from "../../../redux-saga-middleware_admin/reducers/adminSubDistributorReducer";
import useWindowDimensions from "../../../utils/useWindowDimensions";
import SearchBar from "../SearchBar/SearchBar";

const ResetSVG = () => {
  return (
    <Box sx={{
      marginRight: "10px"
    }}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="14"
        height="17"
        fill="none"
        viewBox="0 0 14 17"
      >
        <path
          fill="#fff"
          d="M6.265 4.903l.605 1.55c.074.166.138.335.193.508.026.099-.004.213-.008.322-.105-.024-.232-.02-.31-.078-.652-.49-1.294-.99-1.94-1.486a1333.47 1333.47 0 00-2.189-1.683c-.272-.21-.27-.294.009-.508C3.974 2.49 5.325 1.454 6.676.422c.102-.077.257-.085.386-.125-.008.138.016.288-.03.412-.243.647-.505 1.286-.787 2 2.595-.1 4.745.732 6.33 2.789.938 1.217 1.391 2.614 1.424 4.145.064 2.962-1.909 5.731-4.746 6.686a6.997 6.997 0 01-7.895-2.477c-1.8-2.454-1.705-5.607-.335-7.742l1.8 1.084c-.707 1.254-.883 2.563-.471 3.932.325 1.085.974 1.943 1.896 2.591 1.74 1.222 4.202 1.115 5.827-.245 1.736-1.45 2.275-3.801 1.334-5.807-.9-1.913-2.902-3.064-5.144-2.762z"
        ></path>
      </svg>
    </Box>
  )
}

const CheckBlueSvg = () => {
  return (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="14"
        fill="none"
        viewBox="0 0 16 14"
      >
        <path
          fill="#355DFF"
          d="M5.59 8.6l-3.2-3.2-2.4 2.4 5.6 5.6L15.99 3 13.59.6l-8 8z"
        ></path>
      </svg>
  )
}

const FilterRevenue = () => {
  const { roles, ref } = useSelector((state) => state.adminAuthReducer);
  const { listDistributor } = useSelector((state) => state.adminMasterReducer);
  const { listSub } = useSelector((state) => state.adminDistributorReducer);
  const { listRefs } = useSelector((state) => state.adminSubDistributorReducer);
  const { listEndUser } = useSelector((state) => state.adminAgentReducer);
  const [data, setData] = useState([]);

  useEffect(() => {
    if (roles && roles?.length && roles[0]) {
      switch (roles[0]) {
        case "master": {
          setData([...listDistributor]);
          break;
        }
        case "distributor": {
          setData([...listSub]);
          break;
        }
        case "sub_distributor": {
          setData([...listRefs]);
          break;
        }
        case "agent": {
          setData([...listEndUser]);
          break;
        }
        default: {
          break;
        }
      }
    }
  }, [roles, listDistributor, listEndUser, listSub, listRefs]);

  const [csvData, setCSVData] = useState([
    ["firstname", "lastname", "email"],
    ["Ahmed", "Tomi", "ah@smthing.co.com"],
    ["Raed", "Labes", "rl@smthing.co.com"],
    ["Yezzi", "Min l3b", "ymin@cocococo.com"]
  ])
  useEffect(() => {
    const csvData = data?.map((item) => {
      return [
        item?.id,
        item?.account,
        item?.nickName,
        item?.manager,
        item?.agents,
        item?.players,
        item?.revenue,
      ]
    })

    setCSVData([["ID", "Account", "Nick Name", "Manager", "Agents", "Players", "Revenue"],...csvData])
  }, [data])

  const { width } = useWindowDimensions();
  const [errorSearchTime, setErrorSearchTime] = useState("");
  const [selectedType, setSelectedType] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [activeType, setActiveType] = useState(null);
  const [isDropDownPeriod, setIsDropdownPeriod] = useState(false)

  const listAction = [
    "Today",
    "Yesterday",
    "This week",
    "Last week",
    "This month",
    "Last month",
    // "Reset"
  ];
  const [accountInput, setAccountInput] = useState("");
  const startTimeInput = useRef(null);
  const endTimeInput = useRef(null);
  const dispatch = useDispatch();

  const handleSearchTime = (e) => {
    let startTime = "";
    let endTime = "";
    if (!startTimeInput.current.value || !endTimeInput.current.value) {
      setErrorSearchTime("Please fill all required fields");
    } else {
      startTime = new Date(startTimeInput.current.value);
      endTime = new Date(endTimeInput.current.value);
      setActiveType(null);
      setSelectedType(0);
      setStartTime(startTime);
      setEndTime(endTime);
      if (startTime > endTime) {
        setErrorSearchTime("End Date must be greater than Start Date");
      } else {
        setErrorSearchTime("");
        if (roles && roles?.length && roles[0]) {
          switch (roles[0]) {
            case "master": {
              dispatch(
                getListDistributor({
                  startTime: startTime
                    ? startTime.toLocaleDateString("en-US")
                    : null,
                  endTime: endTime ? endTime.toLocaleDateString("en-US") : null,
                  account: accountInput,
                  type: 0,
                })
              );
              break;
            }
            case "distributor": {
              dispatch(
                getListSub({
                  startTime: startTime
                    ? startTime.toLocaleDateString("en-US")
                    : null,
                  endTime: endTime ? endTime.toLocaleDateString("en-US") : null,
                  account: accountInput,
                  type: 0,
                })
              );
              break;
            }
            case "agent": {
              dispatch(
                getListEndUser({
                  startTime: startTime
                    ? startTime.toLocaleDateString("en-US")
                    : null,
                  endTime: endTime ? endTime.toLocaleDateString("en-US") : null,
                  account: accountInput,
                  type: 0,
                })
              );
              break;
            }
            default: {
              break;
            }
          }
        }
      }
    }
  };

  const handleClickSearchName = (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (roles && roles?.length && roles[0]) {
      switch (roles[0]) {
        case "master": {
          dispatch(
            getListDistributor({
              startTime: startTime
                ? startTime.toLocaleDateString("en-US")
                : null,
              endTime: endTime ? endTime.toLocaleDateString("en-US") : null,
              account: accountInput,
              type: selectedType,
            })
          );
          break;
        }
        case "distributor": {
          dispatch(
            getListSub({
              startTime: startTime
                ? startTime.toLocaleDateString("en-US")
                : null,
              endTime: endTime ? endTime.toLocaleDateString("en-US") : null,
              account: accountInput,
              type: selectedType,
            })
          );
          break;
        }
        case "agent": {
          dispatch(
            getListEndUser({
              startTime: startTime
                ? startTime.toLocaleDateString("en-US")
                : null,
              endTime: endTime ? endTime.toLocaleDateString("en-US") : null,
              account: accountInput,
              type: selectedType,
            })
          );
          break;
        }
        default: {
          break;
        }
      }
    }
  };

  const handleActionQuery = (item, index) => {
    if(item === "Reset") {
      setActiveType(null)
      setSelectedType(0)
      setStartTime(null)
      setEndTime(null)
      setAccountInput("")
      startTimeInput.current.value = ""
      endTimeInput.current.value = ""
      if (roles && roles?.length && roles[0]) {
        switch (roles[0]) {
          case "master": {
            dispatch(
              getListDistributor()
            );
            break;
          }
          case "distributor": {
            dispatch(
              getListSub()
            );
            break;
          }
          case "agent": {
            dispatch(
              getListEndUser()
            );
            break;
          }
          default: {
            break;
          }
        }
      }
      return
    }
    setSelectedType(index + 1);
    setActiveType(index);
    setStartTime("");
    setEndTime("");
    startTimeInput.current.value = "";
    endTimeInput.current.value = "";
    if (roles && roles?.length && roles[0]) {
      switch (roles[0]) {
        case "master": {
          dispatch(
            getListDistributor({
              // startTime: startTime ? startTime.toLocaleDateString("en-US") : null,
              // endTime: endTime ? endTime.toLocaleDateString("en-US") : null,
              account: accountInput,
              type: index + 1,
            })
          );
          break;
        }
        case "distributor": {
          dispatch(
            getListSub({
              // startTime: startTime ? startTime.toLocaleDateString("en-US") : null,
              // endTime: endTime ? endTime.toLocaleDateString("en-US") : null,
              account: accountInput,
              type: index + 1,
            })
          );
          break;
        }
        case "agent": {
          dispatch(
            getListEndUser({
              // startTime: startTime ? startTime.toLocaleDateString("en-US") : null,
              // endTime: endTime ? endTime.toLocaleDateString("en-US") : null,
              account: accountInput,
              type: index + 1,
            })
          );
          break;
        }
        default: {
          break;
        }
      }
    }
  };

  const handleChangeSearch = (e) => {
    setAccountInput(e?.target?.value);
    dispatch(updateDetailAccount(null))
    if(e?.target?.value === "") {
      if (roles && roles?.length && roles[0]) {
        switch (roles[0]) {
          case "master": {
            dispatch(getListDistributor());
            break;
          }
          case "distributor": {
            dispatch(getListSub());
            break;
          }
          case "sub_distributor": {
            dispatch(getListRef());
            break;
          }
          case "agent": {
            dispatch(getListEndUser());
            break;
          }
          default: {
            break;
          }
        }
      }
    }
  };

  // const handleChangeSearch = (e) => {
  //   setSearchValue(e?.target?.value);
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (searchValue) {
  //     if (roles && roles?.length > 0 && roles?.includes("master")) {
  //       const listFilter = listDistributor?.filter(
  //         (item) =>
  //           item?.account === String(searchValue)?.toLowerCase() ||
  //           item?.account?.includes(String(searchValue)?.toLowerCase())
  //       );
  //       if (listFilter && listFilter?.length > 0) {
  //         dispatch(updateDetailAccount(listFilter[0]));
  //         if (width < 576) {
  //           dispatch(openDetailDialog());
  //         }
  //       } else {
  //         dispatch(updateDetailAccount());
  //       }
  //     }

  //     if (roles && roles?.length > 0 && roles?.includes("distributor")) {
  //       const listFilter = listSub?.filter(
  //         (item) =>
  //           item?.account === String(searchValue)?.toLowerCase() ||
  //           item?.account?.includes(String(searchValue)?.toLowerCase())
  //       );
  //       if (listFilter && listFilter?.length > 0) {
  //         dispatch(updateDetailAccount(listFilter[0]));
  //         if (width < 576) {
  //           dispatch(openDetailDialog());
  //         }
  //       } else {
  //         dispatch(updateDetailAccount());
  //       }
  //     }

  //     if (roles && roles?.length > 0 && roles?.includes("sub_distributor")) {
  //       const listFilter = listRefs?.filter(
  //         (item) =>
  //           item?.account === String(searchValue)?.toLowerCase() ||
  //           item?.account?.includes(String(searchValue)?.toLowerCase())
  //       );
  //       if (listFilter && listFilter?.length > 0) {
  //         dispatch(updateDetailAccount(listFilter[0]));
  //         if (width < 576) {
  //           dispatch(openDetailDialog());
  //         }
  //       } else {
  //         dispatch(updateDetailAccount());
  //       }
  //     }

  //     if (roles && roles?.length > 0 && roles?.includes("agent")) {
  //       const listFilter = listEndUser?.filter(
  //         (item) =>
  //           item?.account === String(searchValue)?.toLowerCase() ||
  //           item?.account?.includes(String(searchValue)?.toLowerCase())
  //       );
  //       if (listFilter && listFilter?.length > 0) {
  //         dispatch(updateDetailAccount(listFilter[0]));
  //         if (width < 576) {
  //           dispatch(openDetailDialog());
  //         }
  //       } else {
  //         dispatch(updateDetailAccount());
  //       }
  //     }
  //   }
  // };
  
  const handleCopyRef = () => {
    copy(ref)
    dispatch(showToastNotify({ type: "success", message: "Copy ref code successfully!" }))
  }

  return (
    <Box sx={{ marginTop: "56px" }}>
      <Box component={"div"} className="d-flex justify-content-between">
        <Typography
          sx={{
            textAlign: "start",
            fontWeight: { xs: 700, sm: 600 },
            fontSize: { xs: "20px", sm: "24px" },
          }}
        >
          {width < 576
            ? `Revenue By Date Range`
            : `Welcome
              ${
                roles?.includes("master")
                  ? "Master"
                  : roles?.includes("distributor")
                  ? "Distributor"
                  : roles?.includes("sub_distributor")
                  ? "Sub Distributor"
                  : "Agent"
              } Account`}
        </Typography>
        {roles?.includes("agent") ? (
            <Typography>
              <CopyIcon className="ms-2 me-2" onClick={handleCopyRef}/>
              {ref}
            </Typography>
          ) : ""}
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          border: { xs: "unset", sm: "2px solid #E4E4E4" },
          borderRadius: "16px",
          padding: "18px",
          marginTop: { xs: "0px", sm: "24px" },
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: { xs: "column-reverse", sm: "row" },
          }}
        >
          <SearchBar
            searchValue={accountInput}
            onChange={handleChangeSearch}
            onSubmit={handleClickSearchName}
            width={width < 576 ? "100%" : "365px"}
          ></SearchBar>
        </Box>
        <Box
          sx={(theme) => ({
            marginTop: width < 576 ? "12px" : "42px",
            marginLeft: width < 1024 ? "" : "90px",
          })}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "24px",
              flexDirection: width < 768 ? "column" : "row",
            }}
          >
            <Box
              sx={{
                fontSize: "14px",
                alignSelf: "flex-start",
                fontWeight: 600,
                lineHeight: "24px",
              }}
            >
              Period:
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: width < 576 ? "column" : "row",
                width: width < 576 ? "100%" : "50%",
                marginTop: "-12px",
              }}
            >
              <Box
                component={"input"}
                ref={startTimeInput}
                type="date"
                placeholder="2022-03-22 15:39:06"
                style={{
                  fontSize: "14px",
                  fontWeight: 600,
                  lineHeight: "24px",
                  padding: "7px 17px",
                  outline: "none",
                  borderRadius: "16px",
                  width: width < 576 ? "100%" : "50%",
                  border: "2px solid #5474F1",
                }}
              ></Box>
              <Box
                sx={{
                  margin: "0px 8px",
                  color: "#5474F1",
                  fontSize: "24px",
                  fontWeight: 600,
                  transform: width < 576 && "rotate(-90deg)",
                }}
              >
                -
              </Box>
              <Box
                ref={endTimeInput}
                component={"input"}
                type="date"
                placeholder="2022-03-22 15:39:06"
                style={{
                  fontSize: "14px",
                  fontWeight: 600,
                  lineHeight: "24px",
                  padding: "7px 17px",
                  outline: "none",
                  borderRadius: "16px",
                  border: "2px solid #5474F1",
                  width: width < 576 ? "100%" : "50%",
                }}
              ></Box>
              <Box
                sx={{
                  marginTop: "12px",
                  display: width < 576 ? "block" : "none",
                  width: "100%",
                }}
              >
                <Button
                  sx={{
                    width: "100%",
                    backgroundColor: "#355DFF",
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "8px 24px",
                    borderRadius: "16px",
                    textTransform: "unset",
                    ":hover": {
                      backgroundColor: "#355DFF",
                    },
                  }}
                  onClick={() => setIsDropdownPeriod(!isDropDownPeriod)}
                >
                  <Box
                    sx={{
                      fontSize: "14px",
                      fontWeight: 600,
                      lineHeight: "24px",
                    }}
                  >
                    {listAction[activeType] || "Select period"}
                  </Box>
                  <ExpandMoreOutlined />
                </Button>
                <Collapse sx={{position:"relative"}} in={isDropDownPeriod}>
                  <Box sx={{ 
                    position: "absolute", 
                    zIndex: 10, 
                    backgroundColor: "white", 
                    width: "100%", marginTop:"",
                    boxShadow: "1px 20px 25px 5px #E4E4E4"
                  }} className="rounded">
                    {listAction && listAction?.map((action, i_action) => (
                      <Box component={"div"} className="p-2 ps-4 d-flex" key={i_action} onClick={() => {
                        handleActionQuery(action, i_action)
                        setIsDropdownPeriod(false)
                      }}>
                        <Box sx={{ 
                          minWidth: "25px"
                         }}>{listAction[activeType] === action ? <CheckBlueSvg/> : ""}</Box> 
                        <Typography>{action}</Typography>
                      </Box>
                    ))}
                  </Box>
                </Collapse>
              </Box>
            </Box>
            <Box
              sx={{
                marginTop: width < 576 ? "-10px" : "",
                display: "flex",
                width: width < 576 ? "100%" : "30%",
                alignItems: "center",
                gap: "16px",
              }}
            >
              <Button
                sx={{
                  fontSize: "12px",
                  textTransform: "unset",
                  borderRadius: "16px",
                  backgroundColor: "#355DFF",
                  color: "white",
                  fontWeight: 700,
                  height: "38px",
                  width: "50%",
                  ":hover": {
                    backgroundColor: "#355DFF",
                    opacity: 0.9,
                  },
                }}
                onClick={handleSearchTime}
              >
                Search
              </Button>
             
              <CSVLink data={csvData} filename={roles && roles?.length && roles[0] ? `revenue_${roles[0]}_${new Date().getTime()}` : `revenue_${new Date().getTime()}`}> 
                {roles && !roles?.includes("agent") && <Button
                  sx={{
                    fontSize: "12px",
                    textTransform: "unset",
                    borderRadius: "16px",
                    backgroundColor: "#6C5DD3",
                    color: "white",
                    fontWeight: 700,
                    height: "38px",
                    width: "50%",
                    ":hover": {
                      backgroundColor: "#6C5DD3",
                      opacity: 0.9,
                    },
                  }}
                >
                  Excel
                </Button>
              }
              </CSVLink>;
                {width < 576 && (
                  <Button
                    onClick={() => handleActionQuery("Reset", 0)}
                    sx={{
                      fontSize: "12px",
                      textTransform: "unset",
                      borderRadius: "16px",
                      backgroundColor: "#3DBAA2",
                      color: "white",
                      fontWeight: 700,
                      height: "32px",
                      ":hover": {
                        backgroundColor: "#3DBAA2",
                        opacity: 0.9,
                      },
                      transform: "scale(1.1)",
                    }}
                  >
                    <Box className="d-flex ps-1 pe-2">
                      <ResetSVG/>
                      Reset
                    </Box>
                  </Button>
                )}
            </Box>
          </Box>
          {errorSearchTime && (
            <Box sx={{ fontSize: "14px", color: "red", marginTop: "24px" }}>
              {errorSearchTime}
            </Box>
          )}
          {width > 576 ? (
            <Box
              component={"div"}
              className="d-flex justify-content-between p-2 rounded mt-3 flex-wrap"
              sx={{
                background: "#F7F7F7"
              }}
              
            >
              <Box component={"div"} sx={{
                display: "grid",
                flexDirection: "column",
                alignItems: "center",
                gridTemplateColumns:
                  width < 576 ? "repeat(2,1fr)" : "repeat(6,1fr)",
                width: width < 1024 ? "100%" : "650px",
                gridColumnGap: "20px",
                gridRowGap: "20px",
                placeItems: "center",
               
                
              }} className="mb-2">
                {listAction?.map((item, index) => (
                  <Button
                    onClick={() => handleActionQuery(item, index)}
                    key={index}
                    sx={{
                      fontSize: "12px",
                      textTransform: "unset",
                      borderRadius: "16px",
                      backgroundColor: item === "Reset" ? "#3DBAA2" : "#355DFF",
                      color: "white",
                      fontWeight: 700,
                      height: "32px",
                      width: "100%",
                      ":hover": {
                        backgroundColor: item === "Reset" ? "#3DBAA2" : "#355DFF",
                        opacity: 0.9,
                      },
                      transform: activeType === index && "scale(1.1)",
                      border: activeType === index && "2px solid black",
                    }}
                  >
                    {item === "Reset" ? <Box className="d-flex">
                    <ResetSVG/>
                      Reset
                    </Box> : item}
                  </Button>
                ))}
              </Box>
              <Box component={"div"} className="d-flex justify-content-center align-items-center">
                <Button
                    onClick={() => handleActionQuery('Reset', 0)}
                    sx={{
                      fontSize: "12px",
                      textTransform: "unset",
                      borderRadius: "16px",
                      backgroundColor: "#3DBAA2",
                      color: "white",
                      fontWeight: 700,
                      height: "32px",
                      width: "100%",
                      ":hover": {
                        backgroundColor: "#3DBAA2",
                        opacity: 0.9,
                      },
                      transform: "scale(1.1)",
                    }}
                  >
                    <Box className="d-flex ps-3 pe-3">
                      <ResetSVG/>
                      Reset
                    </Box>
                </Button>
              </Box>
            </Box>
          ) : (
            <>
              {/* <Button
                  onClick={() => handleActionQuery("Reset", 0)}
                  className="mt-2"
                  sx={{
                    fontSize: "12px",
                    textTransform: "unset",
                    borderRadius: "16px",
                    backgroundColor: "#fc3c3c",
                    color: "white",
                    fontWeight: 700,
                    height: "32px",
                    ":hover": {
                      backgroundColor: "#fc3c3c",
                      opacity: 0.9,
                    },
                    transform: "scale(1.1)",
                  }}
                >
                  Reset
                </Button> */}
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default FilterRevenue;
