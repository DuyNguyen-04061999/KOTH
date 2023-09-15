import { Box, Dialog, Typography } from '@mui/material'
import React from 'react'
import BackIcon from "@mui/icons-material/ArrowBack"
import useWindowDimensions from '../../../utils/useWindowDimensions'
import { useDispatch, useSelector } from 'react-redux'
import { closeDetailDialog, openProvideDialog } from '../../../redux-saga-middleware_admin/reducers/adminDialogReducer'
import { updateDetailAccount } from '../../../redux-saga-middleware_admin/reducers/adminReducer'
import moment from 'moment'

export default function DetailAccountDialogComponent() {
    const { width } = useWindowDimensions()
    const { isDetailDialog } = useSelector((state) => state.adminDialogReducer);
    const { detailAccount } = useSelector((state) => state.adminReducer_);
    const dispatch = useDispatch()
    console.log(detailAccount);
    const handleClose = () => {
        dispatch(closeDetailDialog())
        dispatch(updateDetailAccount())
    }

    return (
        <Dialog open={isDetailDialog} onClose={handleClose} fullScreen fullWidth sx={{
            "& .MuiPaper-root-MuiDialog-paper": {
              overflowY: "hidden",
              backgroundColor: "white",
              height: "100%"
            },
                height: "100%",
            "& .MuiDialog-container": {
                height: "100%",
              "& .MuiPaper-root": {
                width: "100%",
                height: "100%",
                overflowY: "hidden",
                backgroundColor: "white",
              },
            },
          }}>
            {isDetailDialog && (
                <Box component={"div"} className='p-2 ps-4 pe-4'>
                    <Box component={"div"} className=''>
                        <BackIcon onClick={handleClose}/>
                    </Box>
                    <Box component={"div"} className='d-flex justify-content-between' sx={{
                        marginTop: "22px"
                    }}>
                        <Box component={"div"}>
                            <Typography sx={{
                                color: "#000",
                                textAlign: "center",
                                fontSize: "18px",
                                fontStyle: "normal",
                                fontWeight: 600,
                                lineHeight: "16px",
                            }}>{detailAccount?.account || ""}</Typography>
                            <Typography sx={{
                                marginTop: "11px"
                            }}><Box component={"span"} sx={{
                                color: "#808191",
                                fontSize: "14px",
                                fontStyle: "normal",
                                fontWeight: 500,
                                lineHeight: "16px"
                            }}>Level:</Box> <Box component={"span"} sx={{
                                color: "#808191",
                                fontSize: "14px",
                                fontStyle: "normal",
                                fontWeight: 700,
                                lineHeight: "16px"
                            }}>{detailAccount?.level || ""}</Box></Typography>
                        </Box>
                        <Box component={"div"} sx={{
                        }}>
                            <Typography sx={{
                                color: "#7D7E8C",
                                fontSize: "14px",
                                fontStyle: "normal",
                                fontWeight: 600,
                            }}>Revenue</Typography>
                            <Typography sx={{
                                color: "#000",
                                fontSize: "24px",
                                fontStyle: "normal",
                                fontWeight: 600,
                                letterSpacing: "-1px",
                                textAlign: "right"
                            }}>{"-"}</Typography>
                        </Box>
                    </Box>
                    <Box component={"div"} className='rounded p-3' sx={{
                        borderRadius: "16px", 
                        border: "2px solid #E6E6E6",
                        marginTop: "26px"
                    }}>
                        <Box component={"div"} className='d-flex justify-content-between'>
                            <Box component={"div"}>
                                <Typography sx={{
                                    color: " #808191",
                                    fontSize: "12px",
                                    fontStyle: "normal",
                                    fontWeight: 500,
                                    lineHeight: "16px"
                                }}>Ticket</Typography>
                                <Typography sx={{
                                    color: "#FF6955",
                                    fontSize: "14px",
                                    fontStyle: "normal",
                                    fontWeight: 600,
                                    lineHeight: "16px"
                                }}>{detailAccount?.ticket || 0}</Typography>
                            </Box>
                            <Box component={"div"}>
                                <Typography sx={{
                                    color: " #808191",
                                    fontSize: "12px",
                                    fontStyle: "normal",
                                    fontWeight: 500,
                                    lineHeight: "16px",
                                    textAlign: 'right'
                                }}>RefCode</Typography>
                                <Typography sx={{
                                    color: "#000",
                                    fontSize: "14px",
                                    fontStyle: "normal",
                                    fontWeight: 600,
                                    lineHeight: "16px",
                                    textAlign: 'right'
                                }}>{detailAccount?.ref || ""}</Typography>
                            </Box>
                        </Box>
                        <Box component={"div"} className='d-flex justify-content-between' sx={{
                            marginTop: "14px"
                        }}>
                            <Box component={"div"}>
                                <Typography sx={{
                                    color: " #808191",
                                    fontSize: "12px",
                                    fontStyle: "normal",
                                    fontWeight: 500,
                                    lineHeight: "16px"
                                }}>Register Date</Typography>
                                <Typography sx={{
                                    color: "#000",
                                    fontSize: "14px",
                                    fontStyle: "normal",
                                    fontWeight: 600,
                                    lineHeight: "16px",
                                }}> {detailAccount?.date ? moment(detailAccount?.date).format('ll') : ""}</Typography>
                            </Box>
                            <Box component={"div"}>
                                <Typography sx={{
                                    color: " #808191",
                                    fontSize: "12px",
                                    fontStyle: "normal",
                                    fontWeight: 500,
                                    lineHeight: "16px",
                                    textAlign: 'right'
                                }}>Amount Account</Typography>
                                <Typography sx={{
                                    color: "#3DBAA2",
                                    fontSize: "14px",
                                    fontStyle: "normal",
                                    fontWeight: 600,
                                    lineHeight: "16px",
                                    textAlign: 'right'
                                }}>{detailAccount?.amount || 0}</Typography>
                            </Box>
                        </Box>
                        <Box component={"div"} className='text-center p-2 text-white' sx={{
                            marginTop: "14px",
                            borderRadius: "16px", background: detailAccount?.status ? "#355DFF" : "#FF4135"
                        }}>
                            <Typography sx={{
                                color: "#FFF",
                                textAlign: "center",
                                fontSize: "14px",
                                fontStyle: "normal",
                                fontWeight: 700,
                                lineHeight: "normal"
                            }}>
                                {detailAccount?.status ? "Active" : "Prohibit"}
                            </Typography>
                        </Box>
                        
                    </Box>
                    <Box component={"div"} className='d-flex' sx={{
                        marginTop: "40px"
                    }}>
                        <Box component={"div"}
                            onClick={() => dispatch(openProvideDialog())}
                            className='d-flex flex-column align-items-center justify-content-center text-center p-2 me-2' sx={{
                            borderRadius: "7.618px",
                            maxWidth: width/4,
                            boxShadow: "1px 20px 25px 5px #E4E4E4"
                        }}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="48"
                                height="47"
                                fill="none"
                                viewBox="0 0 48 47"
                                >
                                <ellipse
                                    cx="24.301"
                                    cy="23.611"
                                    fill="url(#paint0_linear_3518_62918)"
                                    rx="23.39"
                                    ry="23.376"
                                ></ellipse>
                                <mask
                                    id="mask0_3518_62918"
                                    style={{ maskType: "luminance" }}
                                    width="48"
                                    height="47"
                                    x="0"
                                    y="0"
                                    maskUnits="userSpaceOnUse"
                                >
                                    <ellipse
                                    cx="24.301"
                                    cy="23.611"
                                    fill="#fff"
                                    rx="23.39"
                                    ry="23.376"
                                    ></ellipse>
                                </mask>
                                <g mask="url(#mask0_3518_62918)">
                                    <path
                                    fill="#fff"
                                    d="M26.307 27.906c.024.01.047.023.07.036 1.212.814.899.697 2.411.705.275 0 .55.007.824-.003.734-.028 1.346-.614 1.35-1.346.014-2.215.014-4.43 0-6.645-.004-.745-.616-1.341-1.364-1.36-.593-.013-1.188-.027-1.78.009-.261.016-.528.128-.768.247-.26.13-.49.317-.748.489-.187-.145-.376-.289-.563-.435a1.436 1.436 0 00-.91-.314c-1.728 0-3.456-.004-5.183.003-.823.003-1.43.608-1.435 1.428-.006 2.161-.006 4.323 0 6.485.005.836.612 1.437 1.452 1.44 1.727.006 3.455 0 5.182 0 .321.004.634-.103.888-.3l.574-.44zm-.008-3.511a.426.426 0 11.296-.132.425.425 0 01-.296.13v.002zm-.43 1.61a.425.425 0 01.846-.073.426.426 0 01-.845.072zm.426-4.456a.425.425 0 01.421.425.425.425 0 01-.846-.003.426.426 0 01.424-.422z"
                                    ></path>
                                </g>
                                <defs>
                                    <linearGradient
                                    id="paint0_linear_3518_62918"
                                    x1="-22.48"
                                    x2="24.272"
                                    y1="23.611"
                                    y2="70.391"
                                    gradientUnits="userSpaceOnUse"
                                    >
                                    <stop stopColor="#E2C5B5"></stop>
                                    <stop offset="1" stopColor="#FF9F38"></stop>
                                    </linearGradient>
                                </defs>
                            </svg>
                            <Typography className='mt-2' sx={{
                                color: "#11142D",
                                textAlign: "center",
                                fontSize: "12px",
                                fontStyle: "normal",
                                fontWeight: 700,
                                lineHeight: "normal"
                            }}>
                                Provide Ticket
                            </Typography>
                        </Box>
                        {/* <Box component={"div"} className='d-flex flex-column align-items-center justify-content-center text-center p-2 me-2' sx={{
                            borderRadius: "7.618px",
                            maxWidth: width/4,
                            boxShadow: "1px 20px 25px 5px #E4E4E4"
                        }}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="48"
                                height="48"
                                fill="none"
                                viewBox="0 0 48 48"
                                >
                                <ellipse
                                    cx="23.902"
                                    cy="23.865"
                                    fill="url(#paint0_linear_3518_62928)"
                                    rx="23.39"
                                    ry="23.376"
                                ></ellipse>
                                <mask
                                    id="mask0_3518_62928"
                                    style={{ maskType: "luminance" }}
                                    width="48"
                                    height="48"
                                    x="0"
                                    y="0"
                                    maskUnits="userSpaceOnUse"
                                >
                                    <ellipse
                                    cx="23.902"
                                    cy="23.865"
                                    fill="#fff"
                                    rx="23.39"
                                    ry="23.376"
                                    ></ellipse>
                                </mask>
                                <g fill="#fff" mask="url(#mask0_3518_62928)">
                                    <path d="M30.138 19.058c0-.322-.003-.568 0-.814.01-.5.357-.87.825-.874.468-.005.834.364.838.86.008.864.01 1.727 0 2.591a1.097 1.097 0 01-1.092 1.11c-.873.017-1.747.015-2.62 0a.814.814 0 01-.82-.842c.006-.467.35-.806.84-.82.253-.005.507 0 .833 0-.11-.137-.169-.223-.238-.297-1.646-1.804-3.679-2.49-6.03-1.866-2.36.628-3.85 2.222-4.317 4.63a5.906 5.906 0 006.096 7.055c2.17-.096 3.816-1.148 4.922-3.025.16-.27.347-.486.672-.53.325-.043.611.066.803.344.206.298.2.612.025.927a7.539 7.539 0 01-3.108 3.074c-4.663 2.48-10.379-.43-11.13-5.665-.606-4.236 2.474-8.217 6.704-8.639 2.62-.26 4.812.612 6.584 2.554.053.058.107.114.213.227z"></path>
                                    <path d="M24.158 27.439c-.604-.027-1.208-.045-1.811-.082-.765-.048-1.317-.553-1.363-1.316-.043-.708-.028-1.423-.007-2.134.014-.497.257-.882.68-1.158a.386.386 0 00.142-.257c.032-.326.02-.656.06-.98.091-.753.663-1.348 1.423-1.412.61-.05 1.224-.05 1.835 0 .725.06 1.295.65 1.396 1.376.044.323.034.655.06.979.007.09.03.221.09.255.634.358.766.964.782 1.603.015.595-.005 1.19-.06 1.78-.067.722-.614 1.225-1.355 1.257-.622.027-1.25.006-1.872.006v.082zm-1.23-4.945h2.517c-.015-.282-.015-.55-.045-.812-.03-.263-.193-.45-.464-.461-.493-.02-.988-.02-1.48 0-.298.011-.462.213-.49.505-.024.24-.025.489-.036.766l-.002.002z"></path>
                                </g>
                                <defs>
                                    <linearGradient
                                    id="paint0_linear_3518_62928"
                                    x1="-22.878"
                                    x2="23.873"
                                    y1="23.865"
                                    y2="70.645"
                                    gradientUnits="userSpaceOnUse"
                                    >
                                    <stop stopColor="#B5E2E0"></stop>
                                    <stop offset="1" stopColor="#3DBAA2"></stop>
                                    </linearGradient>
                                </defs>
                            </svg>
                            <Typography className='mt-2' sx={{
                                color: "#11142D",
                                textAlign: "center",
                                fontSize: "12px",
                                fontStyle: "normal",
                                fontWeight: 700,
                                lineHeight: "normal"
                            }}>
                                Reset Password
                            </Typography>
                        </Box> */}
                    </Box>
                </Box>
            )}
        </Dialog>
    )
}
