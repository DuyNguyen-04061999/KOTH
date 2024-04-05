import {Box, Button, Input, Typography} from "@mui/material";
import {useState} from "react";

export const Pagination = ({page, totalItems, changPage, itemPerPage = 9}) => {

    const totalPage = Math.ceil(totalItems / itemPerPage);
    const [statePage, setStatePage] = useState(page);
    const handleNextPage = (currentPage) => {
        if (currentPage < totalPage - 1) {
            changPage(currentPage + 1);
        }
    }

    const handlePrevPage = (currentPage) => {
        if (currentPage > 0) {
            changPage(currentPage - 1);
        }
    }

    const handleChangePage = (e) => {
        setStatePage(e.target.value);
    }


    const BackIcon = () => {
        return (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="17"
                height="12"
                fill="none"
                viewBox="0 0 17 12"
            >
                <path
                    stroke="#336AEA"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 6H1M6 1L1 6l5 5"
                ></path>
            </svg>
        );
    };

    const NextIcon = () => {
        return (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="17"
                height="12"
                fill="none"
                viewBox="0 0 17 12"
            >
                <path
                    stroke="#fff"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 6h15M11 1l5 5-5 5"
                ></path>
            </svg>
        );
    };

    return (
        <Box component={"div"} className="d-flex justify-content-between mb-2 mt-3">
            <Box component={"div"}></Box>
            <Box component={"div"}>
                <Box component={"div"} className="d-flex">
                    <Button
                        onClick={() => handlePrevPage(page)}
                        component={"div"}
                        className="rounded p-2 d-flex justify-content-center align-items-center ms-3 cursor-pointer"
                        sx={{
                            border: "1px solid #336AEA",
                            height: 30,
                            textTransform: "capitalize",
                            ":hover": {
                                background: "white",
                            },
                        }}
                    >
                        <BackIcon/>
                        {
                            page > 0 &&
                            <Typography className="me-2" sx={{fontSize: 12, color: "#336AEA", marginLeft: "8px"}}>
                                back
                            </Typography>
                        }
                    </Button>
                    <Button
                        onClick={() => handleNextPage(page)}
                        component={"div"}
                        className="rounded p-2 d-flex justify-content-center align-items-center ms-3 cursor-pointer"
                        sx={{
                            background: "#336AEA",
                            height: 30,
                            textTransform: "capitalize",
                            ":hover": {
                                background: "#336AEA",
                            },
                        }}
                    >
                        {
                            page < totalPage - 1 &&
                            <Typography className="me-2 text-white" sx={{fontSize: 12}}>
                                next
                            </Typography>
                        }
                        <NextIcon/>
                    </Button>
                </Box>
            </Box>
            <Box component={"div"}>
                {
                    !totalPage ? <></> : <Box component={"div"} className="d-flex align-items-center">
                        <Typography
                            sx={{
                                color: "#808191",
                                fontSize: 12,
                            }}
                        >
                            Page
                        </Typography>
                        <Input
                            component={"div"}
                            className="ps-2 pe-2 ms-2 me-2 rounded"
                            sx={{
                                border: "1.5px solid #C8C8C8",
                                width: "64px",
                                fontSize: "14px",
                            }}
                            onChange={handleChangePage}
                            value={page + 1}
                            disableUnderline
                            type={"number"}
                        ></Input>
                        <Typography
                            sx={{
                                color: "#808191",
                                fontSize: 12,
                            }}
                        >
                            of {totalPage}
                        </Typography>
                    </Box>
                }
            </Box>
        </Box>
    );
};
