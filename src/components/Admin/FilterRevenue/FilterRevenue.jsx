import React, { useRef } from "react";
import SearchBar from "../SearchBar/SearchBar";
import { Box, Button, FormControl, TextField, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import useWindowDimensions from "../../../utils/useWindowDimensions";
import moment from "moment";
import { useState } from "react";
import { getListDistributor } from "../../../redux-saga-middleware_admin/reducers/adminMasterReducer";
import { trimAndCamelCase } from "../../../utils/Admin/helper";
import { getListSub } from "../../../redux-saga-middleware_admin/reducers/adminDistributorReducer";
import { getListEndUser } from "../../../redux-saga-middleware_admin/reducers/adminAgentReducer";

const FilterRevenue = () => {
  const { roles } = useSelector((state) => state.adminAuthReducer);
  const { width } = useWindowDimensions();
  const [errorSearchTime, setErrorSearchTime] = useState("");
  const [selectedType, setSelectedType] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [activeType, setActiveType] = useState(null);
  const listAction = [
    "Today",
    "Yesterday",
    "This week",
    "Last week",
    "This month",
    "Last month",
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
      setActiveType(null)
      setSelectedType(0)
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
                  startTime: startTime ? startTime.toLocaleDateString("en-US") : null,
                  endTime: endTime ? endTime.toLocaleDateString("en-US") : null,
                  account: accountInput,
                  type: 0,
                })
              );
              break;
            }
            case "distributor": {
              dispatch(getListSub({
                startTime: startTime ? startTime.toLocaleDateString("en-US") : null,
                endTime: endTime ? endTime.toLocaleDateString("en-US") : null,
                account: accountInput,
                type: 0,
              }));
              break;
            }
            case "agent": {
              dispatch(getListEndUser({
                startTime: startTime ? startTime.toLocaleDateString("en-US") : null,
                endTime: endTime ? endTime.toLocaleDateString("en-US") : null,
                account: accountInput,
                type: 0,
              }));
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
              startTime: startTime ? startTime.toLocaleDateString("en-US") : null,
              endTime: endTime ? endTime.toLocaleDateString("en-US") : null,
              account: accountInput,
              type: selectedType,
            })
          );
          break;
        }
        case "distributor": {
          dispatch(getListSub({
            startTime: startTime ? startTime.toLocaleDateString("en-US") : null,
            endTime: endTime ? endTime.toLocaleDateString("en-US") : null,
            account: accountInput,
            type: selectedType,
          }));
          break;
        }
        case "agent": {
          dispatch(getListEndUser({
            startTime: startTime ? startTime.toLocaleDateString("en-US") : null,
            endTime: endTime ? endTime.toLocaleDateString("en-US") : null,
            account: accountInput,
            type: selectedType,
          }));
          break;
        }
        default: {
          break;
        }
      }
    }
  };

  const handleActionQuery = (item, index) => {
    setSelectedType(index + 1);
    setActiveType(index);
    setStartTime('');
    setEndTime('');
    startTimeInput.current.value = '';
    endTimeInput.current.value = '';
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
          dispatch(getListSub({
            // startTime: startTime ? startTime.toLocaleDateString("en-US") : null,
            // endTime: endTime ? endTime.toLocaleDateString("en-US") : null,
            account: accountInput,
            type: index + 1,
          }));
          break;
        }
        case "agent": {
          dispatch(getListEndUser({
            // startTime: startTime ? startTime.toLocaleDateString("en-US") : null,
            // endTime: endTime ? endTime.toLocaleDateString("en-US") : null,
            account: accountInput,
            type: index + 1,
          }));
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

  return (
    <Box sx={{ marginTop: "40px" }}>
      <Typography
        sx={{
          textAlign: "start",
          fontWeight: { xs: 700, sm: 600 },
          fontSize: { xs: "20px", sm: "24px" },
        }}
      >
        {width < 576
          ? `${roles?.includes("agent") ? "User Manager" : "Admin Structure"}`
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
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          border: { xs: "unset", sm: "2px solid #E4E4E4" },
          borderRadius: "16px",
          padding: "18px",
          marginTop: { xs: "-52px", sm: "24px" },
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
          ></SearchBar>
        </Box>
        <Box sx={{ marginTop: "42px", marginLeft: width < 1024 ? "" : "90px" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "24px",
            }}
          >
            <Box sx={{ fontSize: "14px", fontWeight: 600, lineHeight: "24px" }}>
              Period:
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
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
                  width: "240px",
                  border: "2px solid #5474F1",
                }}
              ></Box>
              <Box
                sx={{
                  margin: "0px 8px",
                  color: "#5474F1",
                  fontSize: "20px",
                  fontWeight: 600,
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
                  width: "240px",
                }}
              ></Box>
            </Box>
            <Button
              sx={{
                fontSize: "12px",
                textTransform: "unset",
                borderRadius: "16px",
                backgroundColor: "#355DFF",
                color: "white",
                fontWeight: 700,
                height: "38px",
                width: "120px",
                ":hover": {
                  backgroundColor: "#355DFF",
                  opacity: 0.9,
                },
              }}
              onClick={handleSearchTime}
            >
              Search
            </Button>
            {errorSearchTime && (
              <Box sx={{ fontSize: "14px", color: "red" }}>
                {errorSearchTime}
              </Box>
            )}
          </Box>
          <Box
            sx={{
              display: width < 768 ? "flex" : "grid",
              flexDirection: "column",
              alignItems: "center",
              gridTemplateColumns: "repeat(6,1fr)",
              width: width < 1024 ? "100%" : "650px",
              gridColumnGap: "20px",
              placeItems: "center",
              marginTop: "24px",
            }}
          >
            {listAction?.map((item, index) => (
              <Button
                onClick={() => handleActionQuery(item, index)}
                key={index}
                sx={{
                  fontSize: "12px",
                  textTransform: "unset",
                  borderRadius: "16px",
                  backgroundColor: "#355DFF",
                  color: "white",
                  fontWeight: 700,
                  height: "32px",
                  width: "100%",
                  ":hover": {
                    backgroundColor: "#355DFF",
                    opacity: 0.9,
                  },
                  transform: activeType === index && "scale(1.1)",
                  border: activeType === index && "2px solid black",
                }}
              >
                {item}
              </Button>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default FilterRevenue;
