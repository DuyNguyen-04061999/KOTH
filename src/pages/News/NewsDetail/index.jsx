import React, {useEffect, Suspense, useState} from "react";
import {Container, Typography, Box, Skeleton} from "@mui/material";

import {useDispatch, useSelector} from "react-redux";

import {Routes, Route, useParams} from "react-router-dom";
import MainLayout from "../../../components/MainLayout/MainLayout";
import {getListNewsDetail} from "../../../redux-saga-middleware/reducers/news";
import ParagraphLoading from "../../../components/LoadingComponent/ParagraphLoading";
import NewFooter from "../../NewFooter";
import "react-quill/dist/quill.core.css";

export default function NewsDetail() {
    const {listNewDetail, isNewsDetail} = useSelector(
        (state) => state.newsReducer
    );
    const {device} = useSelector((state) => state.deviceReducer);
    const [dataNewsDetail, setDataNewsDetail] = useState({});
    const {id} = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(
            getListNewsDetail({
                id: id,
            })
        );
    }, [id]);

    useEffect(() => {
        if (listNewDetail) {
            setDataNewsDetail(listNewDetail);
        }
    }, [listNewDetail]);

    return (
        <>
            <MainLayout
                children={
                    <Container maxWidth="lg">
                        {isNewsDetail ? (
                            <Box className="pt-4">
                                <ParagraphLoading/>
                            </Box>
                        ) : (
                            <Box className="body-desc">
                                <Box
                                    className="desc-title"
                                    sx={{
                                        padding: device === "Mobile" ? "20px 0" : "40px 0",
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            color: "white",
                                            fontSize: device === "Mobile" ? "24px" : "36px",
                                            textAlign: "left",
                                            fontWeight: 800
                                        }}
                                    >
                                        {dataNewsDetail?.title}
                                    </Typography>
                                </Box>
                                <Box
                                    className="view ql-editor desc-body"
                                    dangerouslySetInnerHTML={{__html: dataNewsDetail?.body}}
                                    sx={{
                                        color: "white",
                                        fontSize: device === "Mobile" ? "13px" : "15px",
                                        textAlign: "left",
                                    }}
                                ></Box>
                            </Box>
                        )}
                        <Box className="footer">
                            <Suspense fallback="loading..." children={<NewFooter/>}/>
                        </Box>
                    </Container>
                }
                type="Home"
            />
        </>
    );
}
