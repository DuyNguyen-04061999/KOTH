import { ExpandMoreOutlined } from "@mui/icons-material";
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
import { openScanQRCode } from "../../../redux-saga-middleware_admin/reducers/adminDialogReducer";
import { getListSub } from "../../../redux-saga-middleware_admin/reducers/adminDistributorReducer";
import { getListDistributor } from "../../../redux-saga-middleware_admin/reducers/adminMasterReducer";
import { updateDetailAccount } from "../../../redux-saga-middleware_admin/reducers/adminReducer";
import { getListRef } from "../../../redux-saga-middleware_admin/reducers/adminSubDistributorReducer";
import useWindowDimensions from "../../../utils/useWindowDimensions";
import { ScanQRCodeDialogComponent } from "../Dialog";
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
    const {roles, ref} = useSelector((state) => state.adminAuthReducer);
    const {listDistributor} = useSelector((state) => state.adminMasterReducer);
    const {listSub} = useSelector((state) => state.adminDistributorReducer);
    const {listRefs} = useSelector((state) => state.adminSubDistributorReducer);
    const {listEndUser} = useSelector((state) => state.adminAgentReducer);
    const [data, setData] = useState([]);
    const { name } = useSelector(state => state?.adminAuthReducer)
    const location = window.location.host.replace("admin.", "");
    const urlRedirect = process.env.REACT_APP_ENV === "development" ? `http://${location}/influencers/${name}` : `https://${location}/influencers/${name}`;

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

        setCSVData([["ID", "Account", "Nick Name", "Manager", "Agents", "Players", "Revenue"], ...csvData])
    }, [data])

    const {width} = useWindowDimensions();
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
        if (item === "Reset") {
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
        if (e?.target?.value === "") {
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

    const CopyIconSVG = () => {
        return <Box sx={{
            cursor: "pointer"
        }}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
            >
                <path
                    d="M4.77082 4.82705C4.81347 4.32421 4.80786 3.873 4.89316 3.44087C5.29611 1.40593 6.88432 0.0433247 8.95742 0.0253661C12.5839 -0.00493906 16.2116 -0.0105511 19.8381 0.0253661C22.1817 0.0500592 23.9506 1.82123 23.9719 4.16707C24.0094 8.1868 24.0094 12.2062 23.9719 16.2252C23.9517 18.617 22.1503 20.359 19.7404 20.3837C19.3038 20.3837 19.113 20.4813 18.9884 20.9449C18.4957 22.7699 16.9445 23.9676 15.0241 23.9822C11.4166 24.0091 7.80844 24.0091 4.19951 23.9822C1.80652 23.9608 0.0319888 22.1638 0.0173974 19.7686C-0.00579913 16.1971 -0.00579913 12.6263 0.0173974 9.0563C0.0308664 6.59934 1.83009 4.83603 4.28257 4.82144C4.43073 4.82031 4.58001 4.82705 4.77082 4.82705ZM7.25808 4.82705H7.89225C10.2291 4.82705 12.566 4.82705 14.9028 4.82705C17.3867 4.82705 19.177 6.61505 19.1781 9.09222C19.1781 11.8399 19.1781 14.5876 19.1781 17.3352V17.9256C20.8 18.1198 21.5576 17.4688 21.5588 15.9356C21.5588 12.1037 21.5588 8.27173 21.5588 4.43982C21.5588 3.07945 20.9313 2.44417 19.5855 2.44304C16.1274 2.44304 12.6681 2.48008 9.21108 2.42284C7.75531 2.39702 6.97524 3.55648 7.25808 4.82705Z"
                    fill="#355DFF"
                />
            </svg>
        </Box>
    }

    const QRCodeIconSVG = () => {
        return <Box sx={{
            cursor: "pointer"
        }}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width={width < 576 ? 32 : 40}
                height={width < 576 ? 32 : 40}
                viewBox="0 0 40 40"
                fill="none"
            >
                <path
                    d="M18.1668 12.743C18.1668 13.9344 18.1824 15.1274 18.1668 16.3251C18.145 17.5493 17.5656 18.1567 16.3585 18.1676C13.9496 18.1894 11.5396 18.1894 9.12858 18.1676C7.96201 18.1567 7.35614 17.5633 7.34212 16.3827C7.31304 13.9739 7.31304 11.564 7.34212 9.15305C7.35769 7.9616 7.93241 7.3651 9.11301 7.34796C11.5469 7.3137 13.9823 7.3137 16.4193 7.34796C17.589 7.3651 18.145 7.9834 18.1668 9.17174C18.1886 10.3601 18.1653 11.55 18.1668 12.743ZM11.0023 10.9846V14.5029H14.502V10.9846H11.0023Z"
                    fill="#355DFF"
                />
                <path
                    d="M21.8359 12.7617C21.8359 11.5438 21.8156 10.3243 21.8359 9.10796C21.8592 7.9757 22.4246 7.3605 23.5616 7.34493C26.0225 7.30755 28.4838 7.30755 30.9457 7.34493C32.0485 7.36206 32.6341 7.95078 32.6497 9.04722C32.685 11.508 32.685 13.9698 32.6497 16.4327C32.6341 17.5618 32.0173 18.1458 30.8866 18.1583C28.4527 18.1801 26.0173 18.1801 23.5803 18.1583C22.4558 18.1458 21.8592 17.5353 21.8359 16.4155C21.8141 15.1976 21.8359 13.9797 21.8359 12.7617ZM25.4976 10.9831V14.503H28.9911V10.9831H25.4976Z"
                    fill="#355DFF"
                />
                <path
                    d="M12.7558 21.8355C13.9473 21.8355 15.1404 21.8184 16.3381 21.8355C17.5561 21.8589 18.1557 22.4429 18.1651 23.6577C18.1848 26.0686 18.1848 28.4785 18.1651 30.8874C18.1542 32.0197 17.5763 32.638 16.4425 32.6551C13.9816 32.6925 11.5202 32.6925 9.0583 32.6551C7.95558 32.638 7.36684 32.0477 7.34503 30.9544C7.31077 28.4936 7.31077 26.0323 7.34503 23.5705C7.35905 22.4398 7.96804 21.8651 9.10502 21.8417C10.3183 21.8168 11.5379 21.8371 12.7558 21.8355ZM14.5283 25.5002H11.0083V28.992H14.5283V25.5002Z"
                    fill="#355DFF"
                />
                <path
                    d="M0 8.93199C0.0685305 7.37454 0 5.80619 0.238299 4.283C0.623004 1.86896 2.80352 0.110594 5.23324 0.0778877C7.72526 0.0436238 10.2173 0.0607558 12.7093 0.0778877C13.8759 0.0778877 14.5596 0.778741 14.5487 1.90945C14.5394 2.99032 13.8618 3.64289 12.7186 3.66625C12.147 3.67871 11.5708 3.61797 11.0054 3.67871C8.74387 3.92012 6.40449 3.09467 4.20528 4.18021C3.08231 6.39491 3.92493 8.76223 3.67573 11.047C3.62121 11.5594 3.67573 12.0827 3.66638 12.6045C3.64925 13.8613 3.01067 14.5559 1.86901 14.5513C0.727358 14.5466 0.073203 13.8411 0.066973 12.592C0.066973 11.3725 0.066973 10.153 0.066973 8.93355L0 8.93199Z"
                    fill="#355DFF"
                />
                <path
                    d="M31.1096 0C32.6671 0.0716427 34.234 0 35.7572 0.247635C38.1246 0.62298 39.8831 2.80341 39.922 5.19877C39.9625 7.71405 39.9422 10.2309 39.922 12.7477C39.922 13.8675 39.2118 14.5466 38.1231 14.5513C37.0344 14.5559 36.3413 13.8909 36.3319 12.7571C36.3148 10.5517 36.3319 8.34793 36.3241 6.14258C36.3241 4.21913 35.7852 3.67091 33.8898 3.67091C31.7373 3.67091 29.5832 3.67091 27.4308 3.67091C26.1489 3.67091 25.4543 3.04793 25.4434 1.91255C25.4403 0.725772 26.1427 0.0747576 27.4479 0.0700853C28.6674 0.0700853 29.8869 0.0700853 31.1065 0.0700853L31.1096 0Z"
                    fill="#355DFF"
                />
                <path
                    d="M8.93236 39.9999C7.37485 39.9314 5.80799 39.9999 4.28474 39.7616C1.84101 39.3707 0.0950394 37.1716 0.0794643 34.6906C0.0638892 32.2095 0.0654467 29.7612 0.0794643 27.2973C0.0794643 26.1277 0.783459 25.4424 1.91265 25.4518C3.00291 25.4595 3.6633 26.1308 3.67108 27.2786C3.68666 29.5369 3.67108 31.7953 3.67108 34.0504C3.67108 35.7325 4.28007 36.3305 5.98243 36.3321C8.18787 36.3321 10.3933 36.3321 12.5987 36.3321C13.865 36.3321 14.555 36.9831 14.5519 38.1247C14.5487 39.2663 13.8432 39.9236 12.5941 39.9298C11.3761 39.9298 10.1566 39.9298 8.93703 39.9298L8.93236 39.9999Z"
                    fill="#355DFF"
                />
                <path
                    d="M39.9995 31.1366C39.931 32.6613 39.9995 34.2094 39.7628 35.7077C39.3672 38.156 37.1773 39.9035 34.6977 39.9284C32.2182 39.9533 29.7682 39.9424 27.3042 39.9284C26.1283 39.9284 25.4446 39.2291 25.4492 38.1015C25.4492 37.0113 26.1252 36.3432 27.2684 36.3354C29.5517 36.3214 31.835 36.3354 34.1215 36.3354C35.6961 36.3354 36.3285 35.6937 36.3331 34.1082C36.3331 31.8764 36.3331 29.6461 36.3331 27.4112C36.3331 26.1403 36.9779 25.4519 38.118 25.4519C39.2581 25.4519 39.9248 26.1512 39.931 27.3987C39.9372 28.6462 39.931 29.8906 39.931 31.1366H39.9995Z"
                    fill="#355DFF"
                />
                <path
                    d="M28.1524 32.6674C27.2179 32.6674 26.2834 32.7001 25.3489 32.6581C24.2664 32.6098 23.6029 31.8965 23.6045 30.8717C23.6061 29.8469 24.2914 29.0884 25.3489 29.0635C27.2179 29.0199 29.0838 29.0199 30.9466 29.0635C32.026 29.0884 32.6599 29.8157 32.6599 30.8748C32.6599 31.965 32.0696 32.6082 30.9466 32.6596C30.0199 32.7063 29.0854 32.6674 28.1524 32.6674Z"
                    fill="#355DFF"
                />
                <path
                    d="M25.4455 24.5112C25.4455 24.8227 25.4564 25.1342 25.4455 25.4457C25.4003 26.553 24.6979 27.2477 23.631 27.2492C22.5641 27.2508 21.8772 26.5935 21.8414 25.4504C21.8227 24.804 21.8196 24.1561 21.8414 23.5113C21.8865 22.4803 22.4987 21.8838 23.5017 21.8449C24.5919 21.8028 25.3224 22.3962 25.4268 23.4272C25.4626 23.7855 25.4268 24.1515 25.4268 24.5175L25.4455 24.5112Z"
                    fill="#355DFF"
                />
                <path
                    d="M30.0087 21.8355C30.2937 21.8355 30.5772 21.8261 30.8622 21.8355C32.035 21.8791 32.658 22.4943 32.6643 23.6078C32.6705 24.7214 31.9852 25.4129 30.8186 25.4425C30.2252 25.4565 29.6287 25.4628 29.0337 25.4425C27.9294 25.4005 27.2613 24.6934 27.2706 23.6063C27.2799 22.5192 27.8936 21.8931 28.9994 21.8417C29.3359 21.8261 29.6723 21.8417 30.0087 21.8417V21.8355Z"
                    fill="#355DFF"
                />
            </svg>
        </Box>
    }

    const handleCopyRef = () => {
        copy(urlRedirect || ref)
        dispatch(showToastNotify({type: "success", message: "Copy promo code successfully!"}))
    }

    return (
        <Box sx={{marginTop: "56px"}}>
            <Box component={"div"} className="d-flex justify-content-between">
                <Typography
                    sx={{
                        textAlign: "start",
                        fontWeight: {xs: 700, sm: 600},
                        fontSize: {xs: "20px", sm: "24px"},
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
                    <Box sx={{
                        display: "flex",
                        alignItems: "center",
                    }}>
                        <Box sx={{
                            display: width < 576 ? "none" : "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            backgroundColor: "#F7F7F7",
                            border: "2px solid #E6E6E6",
                            padding: "10px 15px",
                            minWidth: "300px",
                            borderRadius: "16px",
                            marginRight: "24px",
                        }}>
                            <Typography sx={{
                                color: "#8F909E",
                                fontSize: "14px",
                                fontWeight: "700",
                            }}>{urlRedirect || ref}</Typography>
                            <Box onClick={() => handleCopyRef()}>
                                <CopyIconSVG className="ms-2 me-2"/>
                            </Box>
                        </Box>
                        <Box onClick={() => dispatch(openScanQRCode())}>
                            <QRCodeIconSVG/>
                        </Box>
                    </Box>
                ) : ""}
            </Box>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    border: {xs: "unset", sm: "2px solid #E4E4E4"},
                    borderRadius: "16px",
                    padding: "18px",
                    marginTop: {xs: "0px", sm: "24px"},
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        flexDirection: {xs: "column-reverse", sm: "row"},
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
                                    <ExpandMoreOutlined/>
                                </Button>
                                <Collapse sx={{position: "relative"}} in={isDropDownPeriod}>
                                    <Box sx={{
                                        position: "absolute",
                                        zIndex: 10,
                                        backgroundColor: "white",
                                        width: "100%", marginTop: "",
                                        boxShadow: "1px 20px 25px 5px #E4E4E4"
                                    }} className="rounded">
                                        {listAction && listAction?.map((action, i_action) => (
                                            <Box component={"div"} className="p-2 ps-4 d-flex" key={i_action}
                                                 onClick={() => {
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

                            <CSVLink data={csvData}
                                     filename={roles && roles?.length && roles[0] ? `revenue_${roles[0]}_${new Date().getTime()}` : `revenue_${new Date().getTime()}`}>
                                {roles && 
                                // {roles && !roles?.includes("agent") && 
                                <Button
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
                        <Box sx={{fontSize: "14px", color: "red", marginTop: "24px"}}>
                            {errorSearchTime}
                        </Box>
                    )}
                    {width > 576 ? (
                        <Box
                            component={"div"}
                            className="d-flex justify-content-between p-2 rounded mt-3 flex-wrap"
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
            <ScanQRCodeDialogComponent refCode={ref}/>
        </Box>
    );
};

export default FilterRevenue;
