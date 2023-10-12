import CloseIcon from "@mui/icons-material/Close"
import { LoadingButton } from '@mui/lab'
import { Box, Dialog, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateAccount } from "../../../redux-saga-middleware_admin/reducers/adminConfigReducer"
import { closeUpdateAccountDialog } from '../../../redux-saga-middleware_admin/reducers/adminDialogReducer'
const bg = "rgba(228, 228, 228, 0.2967)";

export default function UpdateAccountDialogComponent() {
    const { isUpdateAccountDialog } = useSelector(state => state.adminDialogReducer)
    const { detailAccount } = useSelector((state) => state.adminReducer_);

    const [errorMessage, setErrorMessage] = useState("");

    const dispatch = useDispatch()

    const handleClose = () => {
        dispatch(closeUpdateAccountDialog())
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const data = new FormData(e.currentTarget);
        if(!data.get("newNickName")) {
            setErrorMessage({
                type: "fill",
                message: "Please fill all required fields",
              });
        } else if (data.get("newNickName")?.length > 25) {
            setErrorMessage({
                type: "fill",
                message: "Nick name must be exceed 25 character!",
              });
        } else {
            dispatch(updateAccount({
                account: detailAccount?.account || "",
                newNickName: data.get("newNickName")
            }))
        }
    }

    const [focusedPassInput, setFocusedPassInput] = useState(false);
    const onFocusPassInput = () => setFocusedPassInput(true);
    const onBlurPassInput = () => setFocusedPassInput(false);

    return (
        <Dialog open={isUpdateAccountDialog} onClose={handleClose} sx={{
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
                        Update Nick Name
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
                            backgroundColor: "",
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
                            Current Nick Name
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
                            value={detailAccount?.nickName || ""}
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
                            New Nick Name
                        </Typography>
                        </Box>
                        <Box
                            component={"input"}
                            type="text"
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
                            placeholder="New Nick Name"
                            onFocus={onFocusPassInput}
                            onBlur={onBlurPassInput}
                            name="newNickName"
                        ></Box>
                    </Box>

                    {errorMessage && (
                        <p style={{ color: "red", marginTop: "24px" }}>
                        {errorMessage.message}
                        </p>
                    )}
                    
                    <LoadingButton
                        loading={false}
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
                        Update
                    </LoadingButton>
                </Box>
            </Box>
        </Dialog>
    )
}
