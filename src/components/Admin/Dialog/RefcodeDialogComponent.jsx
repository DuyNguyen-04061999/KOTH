import { Box, Dialog, Typography } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeRefcodeNotify } from '../../../redux-saga-middleware_admin/reducers/adminDialogReducer';

const SuccessSVG = () => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="248"
            height="221"
            fill="none"
            viewBox="0 0 248 221"
            >
            <circle cx="126" cy="109" r="56" fill="#E9EAEF"></circle>
            <path
                fill="#2ED9AC"
                d="M115.191 120.417c.294-.503.629-.98 1.002-1.427a31421.485 31421.485 0 0132.904-32.918c3.076-3.076 6.002-3.076 9.081 0 .626.626 1.261 1.242 1.873 1.88 2.238 2.348 2.26 5.536-.033 7.863-3.09 3.152-6.251 6.267-9.38 9.397l-32.519 32.527c-2.237 2.237-4.099 2.237-6.353 0a25902.773 25902.773 0 01-19.47-19.473c-2.94-2.945-2.94-5.945-.02-8.882.688-.693 1.36-1.398 2.084-2.064 2.39-2.167 5.459-2.145 7.763.129 3.946 3.893 7.847 7.83 11.771 11.746.321.31.66.618 1.297 1.222z"
            ></path>
            <path
                fill="#FFE266"
                d="M90.165 36.97l-1.93.224c-.68.079-1.277.477-1.595 1.063l-.903 1.665c-.801 1.478-3.006 1.425-3.731-.088l-.818-1.707a2.073 2.073 0 00-1.538-1.138l-1.917-.316c-1.7-.28-2.33-2.324-1.066-3.459l1.426-1.279c.502-.45.743-1.11.644-1.766l-.282-1.86c-.25-1.651 1.566-2.862 3.073-2.05l1.698.916c.598.323 1.322.34 1.936.046l1.743-.834c1.546-.74 3.298.557 2.965 2.193l-.376 1.845c-.133.65.074 1.322.553 1.795l1.358 1.346c1.205 1.192.472 3.204-1.24 3.403z"
            ></path>
            <path
                fill="#8BB6EF"
                d="M31.09 61.417l1.043 1.905a.802.802 0 00.318.32l1.906 1.041a.802.802 0 010 1.408l-1.906 1.042a.802.802 0 00-.318.318l-1.042 1.906a.802.802 0 01-1.408 0l-1.042-1.906a.802.802 0 00-.319-.318l-1.905-1.042a.802.802 0 010-1.408l1.905-1.042a.802.802 0 00.32-.319l1.041-1.905a.802.802 0 011.408 0z"
            ></path>
            <path
                fill="#EF8BBD"
                d="M8.703 100.713l1.782 3.257c.125.231.315.42.545.545l3.257 1.782c.95.52.95 1.886 0 2.406l-3.258 1.782c-.23.125-.419.315-.544.545l-1.782 3.257a1.371 1.371 0 01-2.406 0l-1.782-3.257a1.36 1.36 0 00-.545-.545l-3.257-1.782a1.371 1.371 0 010-2.406l3.257-1.782c.23-.125.42-.315.545-.545l1.782-3.257c.52-.95 1.886-.95 2.406 0z"
            ></path>
            <path
                fill="#78EAC4"
                d="M244.091 155.417l1.042 1.905a.794.794 0 00.318.319l1.906 1.042a.803.803 0 010 1.408l-1.906 1.042a.798.798 0 00-.318.318l-1.042 1.906a.803.803 0 01-1.408 0l-1.042-1.906a.794.794 0 00-.319-.318l-1.905-1.042a.803.803 0 010-1.408l1.905-1.042a.79.79 0 00.319-.319l1.042-1.905a.803.803 0 011.408 0z"
            ></path>
            <path
                fill="#D0844B"
                d="M127.063 200.616a1.063 1.063 0 01-1.063-1.063v-5.49a1.063 1.063 0 012.127 0v5.49c0 .587-.476 1.063-1.064 1.063zM42.395 167.185a1.063 1.063 0 01.579-1.81l5.423-.853a1.063 1.063 0 01.33 2.101l-5.423.853a1.062 1.062 0 01-.91-.291zM55.514 180.01a1.06 1.06 0 01-.311-.902l.73-5.441a1.062 1.062 0 112.108.283l-.73 5.441a1.062 1.062 0 01-1.797.619zM42.128 72.575a1.06 1.06 0 01-.395-.076l-5.097-2.038a1.064 1.064 0 01.79-1.975l5.097 2.038a1.063 1.063 0 01-.395 2.051zM228.064 75.165a1.065 1.065 0 01-.395-2.051l5.098-2.038a1.064 1.064 0 01.789 1.975l-5.098 2.038a1.063 1.063 0 01-.394.076z"
            ></path>
            <path
                fill="#FFA585"
                d="M32.09 195.417l1.043 1.906a.8.8 0 00.318.318l1.906 1.042a.803.803 0 010 1.408l-1.906 1.042a.8.8 0 00-.318.318l-1.042 1.906a.802.802 0 01-1.408 0l-1.042-1.906a.8.8 0 00-.319-.318l-1.905-1.042a.803.803 0 010-1.408l1.905-1.042a.8.8 0 00.32-.318l1.041-1.906a.802.802 0 011.408 0z"
            ></path>
            <path
                fill="#A183E2"
                d="M80.09 207.417l1.043 1.906a.8.8 0 00.318.318l1.906 1.042a.803.803 0 010 1.408l-1.906 1.042a.8.8 0 00-.318.318l-1.042 1.906a.802.802 0 01-1.408 0l-1.042-1.906a.8.8 0 00-.319-.318l-1.905-1.042a.803.803 0 010-1.408l1.905-1.042a.8.8 0 00.32-.318l1.041-1.906a.802.802 0 011.408 0z"
            ></path>
            <path
                fill="#FFC7B6"
                d="M211.175 112.26l.873 2.456a.399.399 0 00.205.231l2.182.983c.308.139.308.63 0 .769l-2.182.983a.399.399 0 00-.205.231l-.873 2.456c-.124.347-.56.347-.683 0l-.874-2.456a.392.392 0 00-.205-.231l-2.182-.983c-.308-.139-.308-.63 0-.769l2.182-.983a.392.392 0 00.205-.231l.874-2.456c.123-.347.559-.347.683 0z"
            ></path>
            <path
                fill="#F7C4DB"
                d="M210.901 16.302l1.025 2.846a.458.458 0 00.241.267l2.562 1.14c.361.16.361.73 0 .89l-2.562 1.14a.459.459 0 00-.241.267l-1.025 2.846c-.145.402-.657.402-.802 0l-1.025-2.846a.459.459 0 00-.241-.267l-2.562-1.14c-.361-.16-.361-.73 0-.89l2.562-1.14a.459.459 0 00.241-.267l1.025-2.846c.145-.402.657-.402.802 0z"
            ></path>
            <path
                fill="#CAB4EF"
                d="M50.944 36.85l.648 1.821c.028.078.083.14.152.171l1.619.73c.228.102.228.467 0 .57l-1.619.729a.292.292 0 00-.152.171l-.648 1.822c-.091.257-.415.257-.507 0l-.647-1.822a.293.293 0 00-.152-.171l-1.619-.73c-.228-.102-.228-.466 0-.57l1.619-.729a.293.293 0 00.152-.17l.648-1.823c.091-.257.415-.257.506 0z"
            ></path>
            <path
                fill="#FEF2A8"
                d="M210.257 183.543l1.937 5.123a.843.843 0 00.454.481l4.839 2.051c.684.29.684 1.314 0 1.604l-4.839 2.051a.84.84 0 00-.454.481l-1.937 5.123a.8.8 0 01-1.515 0l-1.936-5.123a.839.839 0 00-.455-.481l-4.838-2.051c-.684-.29-.684-1.314 0-1.604l4.838-2.051a.842.842 0 00.455-.481l1.936-5.123a.8.8 0 011.515 0zM135.68 14.544l-3.215 1.702a.555.555 0 00-.279.335l-.932 3.287c-.132.464-.808.556-1.059.144l-1.777-2.918a.558.558 0 00-.358-.248l-3.553-.781a.513.513 0 01-.132-.972l3.215-1.702a.553.553 0 00.278-.335l.932-3.286c.132-.465.809-.557 1.06-.145l1.777 2.918a.553.553 0 00.357.248l3.554.781c.502.11.586.731.132.972z"
            ></path>
            <path
                fill="#FFE266"
                d="M44.212 34.255a1.908 1.908 0 10-1.446-3.532 1.908 1.908 0 001.446 3.532z"
            ></path>
            <path
                fill="#8BB6EF"
                d="M147.598 219.025a3.683 3.683 0 10-2.819-6.805 3.683 3.683 0 002.819 6.805zM188.574 51.699a2.218 2.218 0 10-1.697-4.098 2.218 2.218 0 001.697 4.098z"
            ></path>
            <path
                fill="#78EAC4"
                d="M141.5 205a1.5 1.5 0 10-.001-3.001A1.5 1.5 0 00141.5 205zM185 43a1 1 0 100-2 1 1 0 000 2z"
            ></path>
            <path
                fill="#FFA585"
                d="M194.5 180a2.5 2.5 0 100-5 2.5 2.5 0 000 5zM136.605 3.831a1.499 1.499 0 102.972-.404 1.499 1.499 0 10-2.972.404z"
            ></path>
            <path
                fill="#FFE266"
                d="M188.5 202c1.381 0 2.5-.895 2.5-2s-1.119-2-2.5-2-2.5.895-2.5 2 1.119 2 2.5 2zM121.202 1.89a1.5 1.5 0 102.973-.405 1.5 1.5 0 00-2.973.406z"
            ></path>
            </svg>
    )
}

const ErrorSVG = () => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="112"
            height="112"
            fill="none"
            viewBox="0 0 112 112"
            >
            <circle cx="56" cy="56" r="56" fill="#F4EAE9"></circle>
            <path
                fill="#FF7A68"
                d="M56.094 22h4.056c4.765.026 8.11 3.348 7.834 8.11-.302 5.006-.915 9.992-1.414 14.988-.701 7.046-1.414 14.087-2.138 21.123-.156 1.553-.224 3.13-.526 4.658-.856 4.347-4.039 6.53-8.963 6.261-3.721-.201-6.638-3.244-7.033-7.228a12764.063 12764.063 0 00-3.514-34.958c-.169-1.665-.36-3.332-.402-5.003-.11-4.58 3.156-7.909 7.724-7.951h4.376z"
            ></path>
            <path
                fill="#EA8284"
                d="M63.562 87.18a7.542 7.542 0 11-7.484-7.724 7.525 7.525 0 017.484 7.724z"
            ></path>
        </svg>
    )
}

export default function RefcodeDialogComponent() {
    const { isRefcodeDialog, messageRefcode = "Refcode error!", typeRefcode } = useSelector(state => state.adminDialogReducer)
    
    const dispatch = useDispatch()

    const handleClose = () => {
        dispatch(closeRefcodeNotify())
    }

    return (
        <Dialog open={isRefcodeDialog} onClose={handleClose} sx={{
            "& .MuiPaper-root-MuiDialog-paper": {
              overflowY: "hidden",
              backgroundColor: "white",
            },
            height: "100%",
            "& .MuiDialog-container": {
              "& .MuiPaper-root": {
                width: "100%",
                height: "auto",
                overflowY: "hidden",
                backgroundColor: "white",
              },
            },
          }}>
            <Box component={"div"} className=''>
                {typeRefcode && typeRefcode === "success" && (
                    <Box component={"div"} className='p-2 pe-3 ps-3 mt-2'>
                         <Box component={"div"} className='d-flex flex-column align-items-center'>
                            <SuccessSVG/>
                            <Box component={"div"}>
                                <Typography className='text-center mb-2' sx={{
                                    color: "#2ED9AC",
                                    fontSize: "24px",
                                    fontWeight: "700"
                                }}>
                                    {"Successfully"?.toUpperCase()}
                                </Typography>
                                <Typography className='text-center mb-4' sx={{
                                    color: "#8C8D9B",
                                    fontSize: "16px"
                                }}>
                                    Refcode has been changed successfully.
                                </Typography>
                            </Box>
                        </Box>
                        <Box component={"div"} className='rounded p-2 text-white text-center mb-4' sx={{
                            background: "#355DFF"
                        }} onClick={handleClose}>
                            Confirm
                        </Box>
                    </Box>
                )}
                {typeRefcode && typeRefcode === "error" && (
                     <Box component={"div"} className='p-2 pe-3 ps-3 mt-2'>
                        <Box component={"div"} className='d-flex flex-column align-items-center'>
                            <ErrorSVG/>
                            <Box component={"div"}>
                                <Typography className='text-center mb-2 mt-4' sx={{
                                    color: "#FF7A68",
                                    fontSize: "24px",
                                    fontWeight: "700"
                                }}>
                                    {"Oops!"?.toUpperCase()}
                                </Typography>
                                <Typography className='text-center mb-4' sx={{
                                    color: "#8C8D9B",
                                    fontSize: "16px"
                                }}>
                                    {messageRefcode || "This refcode already exists. Please choose a new refcode"}
                                </Typography>
                            </Box>
                        </Box>
                        <Box component={"div"} className='rounded p-2 text-white text-center mb-4' sx={{
                            background: "#FF7A68"
                        }} onClick={handleClose}>
                            Try Again
                        </Box>
                    </Box>
                )}
            </Box>
        </Dialog>
    )
}
