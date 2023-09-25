import { Box, Dialog, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { closeResetPassDialog } from '../../../redux-saga-middleware_admin/reducers/adminDialogReducer'
import CloseIcon from "@mui/icons-material/Close"
import { LoadingButton } from '@mui/lab'
import { resetPassword } from '../../../redux-saga-middleware_admin/reducers/adminAuthReducer'

const bg = "rgba(228, 228, 228, 0.2967)";

export default function ResetPasswordDialogComponent() {
    const dispatch = useDispatch()
    const { isResetPassDialog } = useSelector(state => state.adminDialogReducer)
    const { detailAccount } = useSelector((state) => state.adminReducer_);
    const { isResetPassword } = useSelector(state => state.adminAuthReducer)
    
    const [errorMessage, setErrorMessage] = useState("");

    const handleClose = () => {
        dispatch(closeResetPassDialog())
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const data = new FormData(e.currentTarget);
        if(!data.get("password")) {
            setErrorMessage({
                type: "fill",
                message: "Please fill all required fields",
              });
        } else if(!data.get("cpassword")) {
            setErrorMessage({
                type: "fill",
                message: "Please fill all required fields",
              });
        } else if(data.get("password")?.length < 9 ||  data.get("cpassword")?.length < 9) {
            setErrorMessage({
                type: "fill",
                message: "Password length must be > 8",
              });
        } else if(data.get("password") !== data.get("cpassword")) {
            setErrorMessage({
                type: "fill",
                message: "Password not equal!",
              });
        } else {
            dispatch(resetPassword({
                account: detailAccount?.account,
                password: data.get("password")
            }))
        }


    }

    const [focusedPassInput, setFocusedPassInput] = useState(false);
    const onFocusPassInput = () => setFocusedPassInput(true);
    const onBlurPassInput = () => setFocusedPassInput(false);

    const [focusedCPassInput, setFocusedCPassInput] = useState(false);
    const onFocusCPassInput = () => setFocusedCPassInput(true);
    const onBlurCPassInput = () => setFocusedCPassInput(false);

    return (
        <Dialog 
            open={isResetPassDialog} onClose={handleClose} 
            sx={{
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
            }}
        >
            <Box component={"div"} className="p-2 ps-4 pe-4">
                <Box
                    component={"div"}
                    className="d-flex justify-content-between mt-4 mb-5"
                    >
                    <Typography
                        component={"h1"}
                        sx={{
                        fontWeight: 550,
                        fontSize: 24,
                        lineHeight: "32px",
                        }}
                    >
                        Reset Password
                    </Typography>
                    <Box
                        component={"div"}
                        className="rounded-circle p-2"
                        sx={{
                        boxShadow: "1px 20px 25px 5px #E4E4E4",
                        }}
                    >
                        <CloseIcon onClick={handleClose} sx={{cursor: "pointer"}} />
                    </Box>
                </Box>
                <Box component={"form"} onSubmit={handleSubmit} onChange={() => setErrorMessage("")}>
                    <Box
                        component={"div"}
                        className="rounded p-2 ps-3 pe-3 mt-3"
                        sx={{
                            backgroundColor: bg,
                        }}
                    >
                        <Box component={"div"}>
                        <Typography
                            component={"span"}
                            className=""
                            sx={{
                            color: "#808191",
                            fontSize: 10,
                            lineHeight: "16px",
                            fontWeight: "700",
                            letterSpacing: "0.9px",
                            marginLeft: "0px !important",
                            }}
                        >
                            ACCOUNT
                        </Typography>
                        </Box>
                        <Box
                            component={"input"}
                            className="pt-0 pb-2"
                            sx={{
                                width: "100%",
                                border: 0,
                                padding: 0,
                                backgroundColor: "transparent",
                                color: "#11142D",
                                fontSize: 14,
                                fontWeight: "700",
                                ":focus": {
                                outline: "none",
                                },
                                "::placeholder": {
                                fontSize: 14,
                                },
                            }}
                            placeholder="User name"
                            value={detailAccount?.account || ""}
                            disabled
                        ></Box>
                    </Box>

                    <Box
                        component={"div"}
                        className="rounded p-2 ps-3 pe-3 mt-3"
                        sx={{
                            backgroundColor: bg,
                            border: focusedPassInput
                            ? "2px solid #355DFF"
                            : "2px solid transparent",
                        }}
                    >
                        <Box component={"div"}>
                        <Typography
                            component={"span"}
                            className=""
                            sx={{
                                color: "#808191",
                                fontSize: 10,
                                lineHeight: "16px",
                                fontWeight: "700",
                                letterSpacing: "0.9px",
                                marginLeft: "0px !important",
                            }}
                        >
                            LOGIN PASSWORD
                        </Typography>
                        </Box>
                        <Box
                            component={"input"}
                            type="password"
                            className="pt-0 pb-2"
                            sx={{
                                width: "100%",
                                border: 0,
                                padding: 0,
                                backgroundColor: "transparent",
                                color: "#11142D",
                                fontSize: 14,
                                fontWeight: "700",
                                ":focus": {
                                outline: "none",
                                },
                                "::placeholder": {
                                fontSize: 14,
                                },
                            }}
                            placeholder="Login password"
                            autoComplete="Password"
                            onFocus={onFocusPassInput}
                            onBlur={onBlurPassInput}
                            name="password"
                        ></Box>
                    </Box>

                    <Box
                        component={"div"}
                        className="rounded p-2 ps-3 pe-3 mt-3"
                        sx={{
                            backgroundColor: bg,
                            border: focusedCPassInput
                            ? "2px solid #355DFF"
                            : "2px solid transparent",
                        }}
                    >
                        <Box component={"div"}>
                        <Typography
                            component={"span"}
                            className=""
                            sx={{
                            color: "#808191",
                            fontSize: 10,
                            lineHeight: "16px",
                            fontWeight: "700",
                            letterSpacing: "0.9px",
                            marginLeft: "0px !important",
                            }}
                        >
                            CONFIRM PASSWORD
                        </Typography>
                        </Box>
                        <Box
                            component={"input"}
                            type="password"
                            className="pt-0 pb-2"
                            sx={{
                                width: "100%",
                                border: 0,
                                padding: 0,
                                backgroundColor: "transparent",
                                color: "#11142D",
                                fontSize: 14,
                                fontWeight: "700",
                                ":focus": {
                                outline: "none",
                                },
                                "::placeholder": {
                                fontSize: 14,
                                },
                            }}
                            placeholder="Confirm password"
                            autoComplete="Confirm password"
                            onFocus={onFocusCPassInput}
                            onBlur={onBlurCPassInput}
                            name="cpassword"
                        ></Box>
                    </Box>

                    {errorMessage && (
                        <p style={{ color: "red", marginTop: "24px" }}>
                        {errorMessage.message}
                        </p>
                    )}
                    
                    <LoadingButton
                        loading={isResetPassword}
                        className="mt-3 rounded mb-4 pt-2 pb-2"
                        sx={{
                        "&:hover": {
                            background: "#355DFF",
                        },
                        width: "100%",
                        backgroundColor: "#355DFF",
                        color: "#fff",
                        fontSize: 14,
                        fontStyle: "normal",
                        textTransform: "none",
                        }}
                        type="submit"
                    >
                        Reset
                    </LoadingButton>
                </Box>
            </Box>
        </Dialog>
    )
}
