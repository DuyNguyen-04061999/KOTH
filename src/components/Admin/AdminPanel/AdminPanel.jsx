import { Box, Button, Collapse, Grid, Typography } from "@mui/material";
import copy from "copy-to-clipboard";
import moment from "moment";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import { getListEndUser } from "../../../redux-saga-middleware_admin/reducers/adminAgentReducer";
import { showToastNotify } from "../../../redux-saga-middleware_admin/reducers/adminAlertReducer";
import { activeAccount } from "../../../redux-saga-middleware_admin/reducers/adminConfigReducer";
import {
    openConfirmDialog,
    openCreateDialog,
    openDetailDialog,
    openProvideDialog,
    openResetPassDialog, openScanQRCode,
    openUpdateAccountDialog,
} from "../../../redux-saga-middleware_admin/reducers/adminDialogReducer";
import { getListSub } from "../../../redux-saga-middleware_admin/reducers/adminDistributorReducer";
import { getListDistributor } from "../../../redux-saga-middleware_admin/reducers/adminMasterReducer";
import { updateDetailAccount } from "../../../redux-saga-middleware_admin/reducers/adminReducer";
import { getListRef } from "../../../redux-saga-middleware_admin/reducers/adminSubDistributorReducer";
import { checkRouteIsManage } from "../../../utils/Admin/helper";
import useWindowDimensions from "../../../utils/useWindowDimensions";
import DetailAccountDialogComponent from "../Dialog/DetailAccountDialogComponent";
import ScanQRCodeDialogComponent from "../Dialog/ScanQRCodeDialogComponent";
import SearchBar from "../SearchBar/SearchBar";

const AdminPanel = () => {
    const {roles, ref} = useSelector((state) => state.adminAuthReducer);
    const {detailAccount} = useSelector((state) => state.adminReducer_);
    const {listDistributor} = useSelector((state) => state.adminMasterReducer);
    const {listSub} = useSelector((state) => state.adminDistributorReducer);
    const {listRefs} = useSelector((state) => state.adminSubDistributorReducer);
    const {listEndUser} = useSelector((state) => state.adminAgentReducer);
    const dispatch = useDispatch();
    const [searchValue, setSearchValue] = useState("");
    const {width} = useWindowDimensions();
    const {pathname} = useLocation();

    const handleChangeSearch = (e) => {
        setSearchValue(e?.target?.value);
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

    const handleSubmit = (e) => {
        e.preventDefault();
        if (searchValue) {
            if (roles && roles?.length > 0 && roles?.includes("master")) {
                dispatch(
                    getListDistributor({
                        account: searchValue,
                    })
                );
                const listFilter = listDistributor?.filter(
                    (item) =>
                        item?.account === String(searchValue)?.toLowerCase() ||
                        item?.account?.includes(String(searchValue)?.toLowerCase())
                );
                if (listFilter && listFilter?.length > 0) {
                    dispatch(updateDetailAccount(listFilter[0]));
                    if (width < 576) {
                        dispatch(openDetailDialog());
                    }
                } else {
                    dispatch(updateDetailAccount());
                }
            }

            if (roles && roles?.length > 0 && roles?.includes("distributor")) {
                dispatch(
                    getListSub({
                        account: searchValue,
                    })
                );
                const listFilter = listSub?.filter(
                    (item) =>
                        item?.account === String(searchValue)?.toLowerCase() ||
                        item?.account?.includes(String(searchValue)?.toLowerCase())
                );
                if (listFilter && listFilter?.length > 0) {
                    dispatch(updateDetailAccount(listFilter[0]));
                    if (width < 576) {
                        dispatch(openDetailDialog());
                    }
                } else {
                    dispatch(updateDetailAccount());
                }
            }

            if (roles && roles?.length > 0 && roles?.includes("sub_distributor")) {
                const listFilter = listRefs?.filter(
                    (item) =>
                        item?.account === String(searchValue)?.toLowerCase() ||
                        item?.account?.includes(String(searchValue)?.toLowerCase())
                );
                if (listFilter && listFilter?.length > 0) {
                    dispatch(updateDetailAccount(listFilter[0]));
                    if (width < 576) {
                        dispatch(openDetailDialog());
                    }
                } else {
                    dispatch(updateDetailAccount());
                }
            }

            if (roles && roles?.length > 0 && roles?.includes("agent")) {
                dispatch(
                    getListEndUser({
                        account: searchValue,
                    })
                );
                const listFilter = listEndUser?.filter(
                    (item) =>
                        item?.account === String(searchValue)?.toLowerCase() ||
                        item?.account?.includes(String(searchValue)?.toLowerCase())
                );
                if (listFilter && listFilter?.length > 0) {
                    dispatch(updateDetailAccount(listFilter[0]));
                    if (width < 576) {
                        dispatch(openDetailDialog());
                    }
                } else {
                    dispatch(updateDetailAccount());
                }
            }
        }
    };

    const ProvideTicketSVG = () => {
        return (
            <Box sx={{marginRight: "10px"}}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="15"
                    height="12"
                    fill="none"
                    viewBox="0 0 15 12"
                >
                    <path
                        fill="#fff"
                        d="M8.906 10.333a.844.844 0 01.076.04c1.333.895.989.766 2.651.776.302 0 .605.007.906-.005.807-.03 1.48-.674 1.485-1.48.015-2.434.015-4.869 0-7.304-.005-.819-.678-1.474-1.5-1.494-.652-.015-1.307-.031-1.957.009-.287.017-.58.141-.844.272-.285.142-.538.348-.822.537-.207-.159-.414-.317-.62-.479A1.578 1.578 0 007.28.861C5.381.86 3.481.856 1.583.863.678.868.01 1.532.005 2.433c-.007 2.377-.007 4.753 0 7.13.006.92.673 1.58 1.596 1.583 1.899.007 3.799 0 5.697 0 .354.004.698-.113.976-.33l.632-.483zm-.009-3.86a.468.468 0 11.325-.144.468.468 0 01-.325.142v.002zm-.472 1.77a.468.468 0 01.93-.08.468.468 0 01-.93.08zm.467-4.898a.468.468 0 01.464.467.468.468 0 01-.931-.003.468.468 0 01.466-.464h.001z"
                    ></path>
                </svg>
            </Box>
        );
    };

    const ResetPasswordSVG = () => {
        return (
            <Box sx={{marginRight: "10px"}}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="15"
                    height="15"
                    fill="none"
                    viewBox="0 0 15 15"
                >
                    <path
                        fill="#fff"
                        d="M12.516 3.09c0-.296-.003-.522 0-.748.01-.46.329-.8.758-.804.43-.004.767.335.77.79.008.795.01 1.589 0 2.383a1.01 1.01 0 01-.616.942 1.005 1.005 0 01-.388.078c-.802.016-1.605.014-2.407 0a.749.749 0 01-.754-.774c.005-.43.32-.741.771-.753.233-.006.467 0 .766 0-.1-.127-.155-.206-.219-.274-1.513-1.658-3.38-2.288-5.542-1.715-2.17.577-3.54 2.043-3.969 4.256a5.43 5.43 0 005.604 6.486c1.995-.09 3.508-1.056 4.524-2.782.147-.248.32-.447.618-.487.299-.04.562.061.738.316.19.274.183.563.024.853a6.93 6.93 0 01-2.858 2.826C6.05 15.963.796 13.287.105 8.475-.452 4.581 2.379.921 6.268.534c2.408-.24 4.423.563 6.052 2.348l.196.208z"
                    ></path>
                    <path
                        fill="#fff"
                        d="M7.019 10.794c-.555-.024-1.111-.04-1.665-.075-.703-.044-1.21-.508-1.253-1.21a21.929 21.929 0 01-.006-1.961c.013-.457.236-.811.624-1.065a.355.355 0 00.131-.236c.03-.3.018-.603.055-.9.084-.693.61-1.24 1.308-1.298a10.208 10.208 0 011.687 0c.667.054 1.19.597 1.283 1.264.04.297.032.602.055.9.007.082.028.203.084.235.582.328.703.885.718 1.473.014.546-.004 1.093-.055 1.637-.061.663-.564 1.125-1.245 1.155-.572.025-1.149.005-1.72.005l-.001.076zm-1.13-4.545h2.313c-.013-.26-.013-.505-.041-.747-.028-.241-.178-.414-.427-.423-.453-.018-.908-.02-1.36 0-.274.01-.425.196-.451.463-.022.222-.023.45-.033.705l-.002.002z"
                    ></path>
                </svg>
            </Box>
        );
    };

    const EditSVG = () => {
        return <Box sx={{
            marginRight: "10px"
        }}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="15"
                fill="none"
                viewBox="0 0 15 15"
            >
                <path
                    fill="#fff"
                    d="M7.454 3.244l3.898 3.953c-.062.03-.18.061-.256.14a2244.487 2244.487 0 00-6.23 6.24c-.407.41-.856.66-1.436.703-.669.05-1.332.162-2 .21-.951.066-1.472-.498-1.366-1.44.083-.728.137-1.459.262-2.178.055-.314.188-.672.405-.89C2.95 7.73 5.196 5.501 7.454 3.244zM12.03 6.371L8.19 2.533c.535-.542 1.06-1.125 1.64-1.65.6-.54 1.462-.488 2.043.076.582.564 1.16 1.141 1.725 1.724.564.584.618 1.466.065 2.068-.52.57-1.095 1.09-1.633 1.62z"
                ></path>
            </svg>
        </Box>
    }

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

    const DeleteSVG = () => {
        return (
            <Box sx={{
                marginRight: "10px"
            }}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="15"
                    fill="none"
                    viewBox="0 0 14 15"
                >
                    <path
                        fill="#fff"
                        d="M7.88 14.498H4.351c-.77 0-1.54.004-2.312 0-1.209-.01-2.11-1.062-1.976-2.266.118-1.074.219-2.151.295-3.23.098-1.353 1.276-2.508 2.606-2.495.16 0 .37.063.468.178.424.487.971.723 1.582.788.989.104 1.937.015 2.661-.803a.598.598 0 01.414-.163c.812.01 1.48.338 2.046.992-1.671.284-2.852 1.163-3.375 2.752-.534 1.6-.086 3.003 1.118 4.247zM5.562 6.5c-1.77 0-3.012-1.24-3.012-3.005C2.55 1.75 3.792.5 5.537.5c1.77 0 3.013 1.235 3.013 3 0 1.75-1.243 2.996-2.988 3z"
                    ></path>
                    <path
                        fill="#fff"
                        d="M10.545 14.498A2.998 2.998 0 019.42 8.723a3 3 0 011.149-.224c1.64.003 2.984 1.36 2.98 3.01a3.003 3.003 0 01-3.003 2.99zm0-3.5c-.312 0-.625-.003-.937 0-.342.006-.56.2-.563.493-.003.293.215.503.55.506.633.006 1.267.006 1.901 0 .334-.003.554-.215.549-.507-.005-.293-.225-.486-.566-.491-.305-.006-.617 0-.93 0h-.004z"
                    ></path>
                </svg>
            </Box>
        )
    }

    const handleActive = () => {
        if (detailAccount) {
            dispatch(
                activeAccount({
                    accountName: detailAccount?.account,
                    active: detailAccount?.status ? 0 : 1,
                })
            );
        }
    };

    const handleDeleteAccount = () => {
        dispatch(openConfirmDialog("delete-account"))
    }

    const handleUpdateNickName = () => {
        dispatch(openUpdateAccountDialog())
    }

    const handleCopyRef = () => {
        copy(ref)
        dispatch(showToastNotify({type: "success", message: "Copy ref code successfully!"}))
    }

    return (
        <Box sx={{marginTop: "56px"}}>
            <DetailAccountDialogComponent/>
            <Box component={"div"} className="d-flex justify-content-between">
                <Typography
                    sx={{
                        textAlign: "start",
                        fontWeight: {xs: 700, sm: 600},
                        fontSize: {xs: "20px", sm: "24px"},
                    }}
                >
                    {width < 576
                        ? `${
                            roles?.includes("agent")
                                ? "Play Management"
                                : roles?.includes("master")
                                    ? "Create Distributor"
                                    : roles?.includes("distributor")
                                        ? "Create Agent" : ""
                        }`
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
                            }}>{ref}</Typography>
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
                    padding: {
                        xs: "0px",
                        sm: "18px",
                    },
                    marginTop: {
                        xs:
                            checkRouteIsManage(pathname) || roles.includes("agent")
                                ? "0px"
                                : "-32px",
                        sm: "24px",
                    },
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        flexDirection: {xs: "column-reverse", sm: "row"},
                    }}
                >
                    <Box sx={{marginTop: "12px"}}>
                        <SearchBar
                            searchValue={searchValue}
                            onChange={handleChangeSearch}
                            onSubmit={handleSubmit}
                            width={width < 576 ? "100%" : "365px"}
                        ></SearchBar>
                    </Box>
                    <Box
                        sx={{
                            marginLeft: "auto",
                            display:
                                (checkRouteIsManage(pathname) && "none") ||
                                (roles?.includes("agent") && "none"),
                        }}
                    >
                        <Button
                            children={"Create Account"}
                            onClick={() => dispatch(openCreateDialog())}
                            sx={{
                                padding: {xs: "4px 14px", sm: "16px 34px"},
                                backgroundColor: "#355DFF",
                                borderRadius: {xs: "10px", sm: "16px"},
                                color: "white",
                                fontWeight: 700,
                                fontSize: "14px",
                                textTransform: "unset",
                                ":hover": {backgroundColor: "#355DFF"},
                            }}
                        ></Button>
                    </Box>
                </Box>
                <Collapse in={detailAccount !== null}>
                    <Grid
                        container
                        sx={(theme) => ({
                            border: "2px solid #E4E4E4",
                            borderRadius: "16px",
                            marginTop: "24px",
                            display: {xs: "none", sm: "grid"},
                            gridTemplateColumns: checkRouteIsManage(pathname)
                                ? "repeat(8,1fr)"
                                : "repeat(7,1fr)",
                            [theme.breakpoints.down("lg")]: {
                                gridTemplateColumns: "repeat(4,1fr)",
                            },
                        })}
                    >
                        <Grid
                            sx={(theme) => ({
                                padding: "24px",
                                [theme.breakpoints.up("lg")]: {
                                    borderRight: "2px solid #E4E4E4",
                                },
                            })}
                        >
                            <Typography
                                sx={{
                                    fontWeight: 500,
                                    fontSize: "12px",
                                    color: "#808191",
                                    textAlign: "center",
                                }}
                            >
                                Account
                            </Typography>
                            <Typography
                                sx={{
                                    fontWeight: 600,
                                    fontSize: "14px",
                                    textAlign: "center",
                                }}
                            >
                                {detailAccount?.account || ""}
                            </Typography>
                        </Grid>
                        <Grid
                            sx={(theme) => ({
                                padding: "24px",
                                [theme.breakpoints.up("lg")]: {
                                    borderRight: "2px solid #E4E4E4",
                                },
                            })}
                        >
                            <Typography
                                sx={{
                                    fontWeight: 500,
                                    fontSize: "12px",
                                    color: "#808191",
                                    textAlign: "center",
                                }}
                            >
                                Level
                            </Typography>
                            <Typography
                                sx={{
                                    fontWeight: 600,
                                    fontSize: "14px",
                                    textAlign: "center",
                                }}
                            >
                                {detailAccount?.level || ""}
                            </Typography>
                        </Grid>
                        <Grid
                            sx={(theme) => ({
                                padding: "24px",
                                [theme.breakpoints.up("lg")]: {
                                    borderRight: "2px solid #E4E4E4",
                                },
                            })}
                        >
                            <Typography
                                sx={{
                                    fontWeight: 500,
                                    fontSize: "12px",
                                    color: "#808191",
                                    textAlign: "center",
                                }}
                            >
                                Revenue
                            </Typography>
                            <Typography
                                sx={{
                                    fontWeight: 600,
                                    fontSize: "14px",
                                    textAlign: "center",
                                }}
                            >
                                {detailAccount?.revenue || 0}
                            </Typography>
                        </Grid>
                        <Grid
                            sx={(theme) => ({
                                padding: "24px",
                                [theme.breakpoints.up("lg")]: {
                                    borderRight: "2px solid #E4E4E4",
                                },
                            })}
                        >
                            <Typography
                                sx={{
                                    fontWeight: 500,
                                    fontSize: "12px",
                                    color: "#808191",
                                    textAlign: "center",
                                }}
                            >
                                Ticket
                            </Typography>
                            <Typography
                                sx={{
                                    fontWeight: 600,
                                    fontSize: "14px",
                                    textAlign: "center",
                                    color: "#FF7A68",
                                }}
                            >
                                {detailAccount?.ticket || 0}
                            </Typography>
                        </Grid>
                        <Grid
                            sx={(theme) => ({
                                padding: "24px",
                                [theme.breakpoints.up("lg")]: {
                                    borderRight: "2px solid #E4E4E4",
                                },
                            })}
                        >
                            <Typography
                                sx={{
                                    fontWeight: 500,
                                    fontSize: "12px",
                                    color: "#808191",
                                    textAlign: "center",
                                }}
                            >
                                RefCode
                            </Typography>
                            <Typography
                                sx={{
                                    fontWeight: 600,
                                    fontSize: "14px",
                                    textAlign: "center",
                                }}
                            >
                                {detailAccount?.ref || ""}
                            </Typography>
                        </Grid>
                        <Grid
                            sx={(theme) => ({
                                padding: "24px",
                                [theme.breakpoints.up("lg")]: {
                                    borderRight: "2px solid #E4E4E4",
                                },
                            })}
                        >
                            <Typography
                                sx={{
                                    fontWeight: 500,
                                    fontSize: "12px",
                                    color: "#808191",
                                    textAlign: "center",
                                }}
                            >
                                Register Date
                            </Typography>
                            <Typography
                                sx={{
                                    fontWeight: 600,
                                    fontSize: "14px",
                                    textAlign: "center",
                                }}
                            >
                                {detailAccount?.date
                                    ? moment(detailAccount?.date).format("MM/DD/YYYY HH:mm")
                                    : ""}
                            </Typography>
                        </Grid>
                        <Grid
                            sx={(theme) => ({
                                padding: "24px",
                                [theme.breakpoints.up("lg")]: {
                                    borderRight:
                                        checkRouteIsManage(pathname) && "2px solid #E4E4E4",
                                },
                            })}
                        >
                            <Typography
                                sx={{
                                    fontWeight: 500,
                                    fontSize: "12px",
                                    color: "#808191",
                                    textAlign: "center",
                                }}
                            >
                                Amount Account
                            </Typography>
                            <Typography
                                sx={{
                                    fontWeight: 600,
                                    fontSize: "14px",
                                    textAlign: "center",
                                    color: "#3DBAA2",
                                }}
                            >
                                {detailAccount?.amount || 0}
                            </Typography>
                        </Grid>
                        {checkRouteIsManage(pathname) && (
                            <Grid sx={{padding: "24px", flex: 1}}>
                                <Typography
                                    sx={{
                                        fontWeight: 500,
                                        fontSize: "12px",
                                        color: "#808191",
                                        textAlign: "center",
                                    }}
                                >
                                    Status
                                </Typography>
                                <Button
                                    onClick={handleActive}
                                    children={detailAccount?.status ? "Active" : "Prohibit"}
                                    sx={{
                                        fontSize: "14px",
                                        borderRadius: "16px",
                                        padding: "2px 16px",
                                        bgcolor: detailAccount?.status ? "#355DFF" : "#FF4135",
                                        color: "#FFF",
                                        fontWeight: 700,
                                        marginTop: "12px",
                                        textTransform: "unset",
                                        ":hover": {
                                            backgroundColor: detailAccount?.status
                                                ? "#355DFF"
                                                : "#FF4135",
                                        },
                                    }}
                                />
                            </Grid>
                        )}
                    </Grid>
                </Collapse>
                {detailAccount && checkRouteIsManage(pathname) && (
                    <Box sx={{display: {xs: "none", sm: "flex"}, marginTop: "24px"}}>
                        <Button
                            onClick={() => dispatch(openProvideDialog())}
                            sx={{
                                backgroundColor: "#FF9F38",
                                fontWeight: 700,
                                fontSize: "14px",
                                textTransform: "unset",
                                color: "white",
                                padding: "8px 30px",
                                borderRadius: "16px",
                                ":hover": {backgroundColor: "#FF9F38"},
                            }}
                        >
                            <ProvideTicketSVG></ProvideTicketSVG>
                            Provide Ticket
                        </Button>
                        {!roles?.includes("agent") && (
                            <Button
                                onClick={() => dispatch(openResetPassDialog())}
                                sx={{
                                    backgroundColor: "#3DBAA2",
                                    fontWeight: 700,
                                    fontSize: "14px",
                                    textTransform: "unset",
                                    color: "white",
                                    padding: "8px 30px",
                                    borderRadius: "16px",
                                    ":hover": {backgroundColor: "#3DBAA2"},
                                }}
                                className="ms-4"
                            >
                                <ResetPasswordSVG></ResetPasswordSVG>
                                Reset Password
                            </Button>
                        )}
                        {!roles?.includes("agent") && (
                            <Button
                                onClick={handleUpdateNickName}
                                sx={{
                                    backgroundColor: "#4FBF67",
                                    fontWeight: 700,
                                    fontSize: "14px",
                                    textTransform: "unset",
                                    color: "white",
                                    padding: "8px 30px",
                                    borderRadius: "16px",
                                    ":hover": {backgroundColor: "#4FBF67"},
                                }}
                                className="ms-4"
                            >
                                <EditSVG/>
                                Edit Nick Name
                            </Button>
                        )}
                        {!roles?.includes("agent") && (
                            <Button
                                onClick={handleDeleteAccount}
                                sx={{
                                    backgroundColor: "#FF7A68",
                                    fontWeight: 700,
                                    fontSize: "14px",
                                    textTransform: "unset",
                                    color: "white",
                                    padding: "8px 30px",
                                    borderRadius: "16px",
                                    ":hover": {backgroundColor: "#FF7A68"},
                                }}
                                className="ms-4"
                            >
                                <DeleteSVG/>
                                Delete
                            </Button>
                        )}
                    </Box>
                )}
            </Box>
            <ScanQRCodeDialogComponent refCode={ref}/>
        </Box>
    );
};

export default AdminPanel;
