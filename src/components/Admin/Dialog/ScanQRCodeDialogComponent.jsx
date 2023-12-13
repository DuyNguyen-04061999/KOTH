import CloseIcon from "@mui/icons-material/Close";
import DownloadIcon from "@mui/icons-material/Download";
import ShareIcon from "@mui/icons-material/Share";
import { Box, Dialog, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import copy from "copy-to-clipboard";
import QRCode from "qrcode.react";
import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showToastNotify } from "../../../redux-saga-middleware_admin/reducers/adminAlertReducer";
import { closeScanQRCode, openShareQrCode } from "../../../redux-saga-middleware_admin/reducers/adminDialogReducer";
import { images } from "../../../utils/images";
import useWindowDimensions from "../../../utils/useWindowDimensions";

export default function ScanQRCodeDialogComponent(props) {
    const { name } = useSelector(state => state?.adminAuthReducer)
    const location = window.location.host.replace("admin.", "");
    const urlRedirect = process.env.REACT_APP_ENV === "development" ? `http://${location}/influencers/${name}` : `https://${location}/influencers/${name}`;
    const {isOpenQRCode} = useSelector((state) => state.adminDialogReducer);
    const dispatch = useDispatch();
    const {width} = useWindowDimensions();
    const CopyIconSVG = () => {
        return (
            <Box>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={21}
                    height={21}
                    viewBox="0 0 21 21"
                    fill="none"
                >
                    <path
                        d="M0 14.8381C0.0582874 13.1841 0.613552 11.7598 1.76396 10.5757C2.74087 9.57224 3.72937 8.58036 4.72946 7.60011C7.08141 5.28321 10.5214 5.14674 13.0605 7.2615C14.1853 8.19421 14.1792 8.31837 13.2527 9.46963C12.4438 10.4752 12.1831 10.8805 10.9008 9.76001C9.70639 8.71136 8.1224 8.84783 6.98324 9.97549C6.0486 10.9003 5.12077 11.831 4.19976 12.7675C3.04424 13.9434 3.02174 15.7318 4.13636 16.8615C5.26121 18.0077 7.05687 17.9902 8.25431 16.8133C9.30758 15.7872 9.41495 15.7872 10.4549 16.8266C10.6707 17.0442 10.8977 17.2535 11.1002 17.4833C11.3998 17.824 11.4284 18.2016 11.1308 18.5494C9.55504 20.3964 7.57634 21.3281 5.15281 20.8992C2.61271 20.4497 0.960208 18.8963 0.244398 16.3988C0.102259 15.896 0.0797617 15.3583 0 14.8381Z"
                        fill="#355DFF"
                    />
                    <path
                        d="M14.0181 6.58879e-05C17.3179 -0.011221 19.5779 1.42837 20.488 3.73706C21.4512 6.17811 21.0616 8.43857 19.2701 10.383C18.3221 11.4091 17.3077 12.3798 16.3138 13.3638C13.9761 15.6766 10.5873 15.8387 8.02263 13.7681C6.84257 12.8138 6.82723 12.665 7.79357 11.4943C8.82434 10.2465 8.82434 10.2465 10.1281 11.25C11.3757 12.2094 12.9024 12.1263 14.0201 11.0233C14.967 10.0882 15.9068 9.1452 16.8394 8.19437C17.9867 7.02155 17.9918 5.21873 16.866 4.10029C15.7401 2.98186 13.9608 3.00033 12.7848 4.14955C11.7029 5.20641 11.615 5.20641 10.5484 4.13621L10.5116 4.1044C9.38676 2.97571 9.38676 2.88746 10.5505 1.75775C11.7428 0.593142 13.1673 0.00724847 14.0181 6.58879e-05Z"
                        fill="#355DFF"
                    />
                </svg>
            </Box>
        );
    };

    const handleClose = () => {
        dispatch(closeScanQRCode());
    };

    const handleCopyURL = (url) => {
        copy(url);
        dispatch(
            showToastNotify({
                type: "success",
                message: "Copy URL Redirect successfully!",
            })
        );
    };

    const qrCodeRef = useRef(null);

    const handleDownloadQrcode = () => {
        const canvas = qrCodeRef.current.querySelector('.HpQrcode > canvas');

        if (canvas) {
          const dataUrl = canvas.toDataURL('image/png');
          const link = document.createElement('a');
          link.href = dataUrl;
          link.download = `${name}_promo_qrcode.png`; // Set the desired filename
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
    }

    const handleShareQrCode = () => {
        dispatch(openShareQrCode())
    }

    return (
        <Dialog open={isOpenQRCode} onClose={handleClose}>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    padding: "24px",
                    position: "relative",
                    width: width < 576 ? "100%" : "412px",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        marginBottom: "24px",
                    }}
                >
                    <Box sx={{marginBottom: "8px"}}>
                        <Typography
                            sx={{fontSize: "24px", fonWeight: 700, lineHeight: "32px"}}
                        >
                            Scan QR Code
                        </Typography>
                    </Box>
                    <Box sx={{marginBottom: "24px"}}>
                        <Typography
                            sx={{
                                fontSize: "10px",
                                fonWeight: 700,
                                lineHeight: "16px",
                                letterSpacing: "0.9px",
                                color: "#808191",
                            }}
                        >
                            Scan this QR Code to verify device.
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            padding: "8px 8px 2px 8px",
                            backgroundColor: "#F7F7F7",
                            border: "2px solid #E4E4E4",
                            borderRadius: "16px",
                        }}
                        className='HpQrcode'
                        ref={qrCodeRef}
                    >
                        <QRCode
                            value={urlRedirect}
                            renderAs="canvas"
                            size={300}
                            bgColor={"#ffffff"}
                            fgColor={"#000000"}
                            level={"H"}
                            includeMargin={false}
                            imageSettings={{
                                src: images.adminLogo,
                                height: 100,
                                width: 100,
                                excavate: true,
                            }}
                        />
                    </Box>
                    <Box
                        sx={{
                            position: "absolute",
                            top: "20px",
                            right: "20px",
                            padding: "12px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "pointer",
                            boxShadow: "1px 20px 25px 5px #E4E4E4",
                            borderRadius: "50%",
                        }}
                        onClick={handleClose}
                    >
                        <CloseIcon/>
                    </Box>
                </Box>
                <Box
                    sx={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            width: "100%",
                            marginBottom: "24px",
                            justifyContent: "space-between",
                        }}
                    >
                        <Box
                            sx={{
                                display: "block",
                                height: "2px",
                                backgroundColor: "#E4E4E4",
                                width: "25%",
                            }}
                        ></Box>
                        <Box sx={{width: "max-content"}}>
                            <Typography
                                sx={{
                                    fontSize: "10px",
                                    fontWeight: 700,
                                    letterSpacing: "0.9px",
                                    color: "#808191",
                                }}
                            >
                                Or Enter The Link Manually
                            </Typography>
                        </Box>
                        <Box
                            sx={{
                                display: "block",
                                height: "2px",
                                backgroundColor: "#E4E4E4",
                                width: "25%",
                            }}
                        ></Box>
                    </Box>
                    <Box component={"div"} className="mb-2 d-flex">
                        <Box component={"div"} className="p-2 bg-info rounded d-flex align-items-center cursor-pointer" onClick={handleDownloadQrcode}>
                            <DownloadIcon sx={{ color: "#fff" }}/>
                            <Typography sx={{ fontSize: 12 }} className="text-white">Download QR Code</Typography>
                        </Box>
                        <Box component={"div"} className="ms-2 bg-info p-2 rounded d-flex align-items-center cursor-pointer" onClick={handleShareQrCode}>
                            <ShareIcon sx={{ color: "#fff" }}/>
                            <Typography sx={{ fontSize: 12 }} className="text-white">Share QR Code</Typography>
                        </Box>
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            width: "100%",
                            marginBottom: "16px",
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                backgroundColor: "#e7e7e7",
                                padding: "16px 24px",
                                borderRadius: "16px",
                                width: "100%",
                            }}
                        >
                            <Typography
                                sx={{
                                    color: "black",
                                    fontSize: "14px",
                                    fontWeight: "700",
                                    display: "-webkit-box",
                                    WebkitLineClamp: "1",
                                    WebkitBoxOrient: "vertical",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    textAlign: "start",
                                }}
                            >
                                {urlRedirect}
                            </Typography>
                            <Box
                                sx={{cursor: "pointer"}}
                                onClick={() => handleCopyURL(urlRedirect)}
                            >
                                <CopyIconSVG className="ms-2 me-2 cursor-pointer"/>
                            </Box>
                        </Box>
                    </Box>
                    <Box sx={{width: "100%"}}>
                        <Button
                            sx={{
                                width: "100%",
                                backgroundColor: "#355DFF",
                                padding: "12px",
                                borderRadius: "12px",
                                transition: "0.3s ease",
                                ":hover": {
                                    backgroundColor: "#355DFF",
                                    opacity: 0.9,
                                },
                            }}
                            onClick={handleClose}
                        >
                            <Typography
                                sx={{
                                    color: "white",
                                    fontWeight: 700,
                                    lineHeight: "24px",
                                    fontSize: "14px",
                                    textTransform: "none",
                                }}
                            >
                                Continue
                            </Typography>
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Dialog>
    );
}
