import React, { useEffect, Suspense, useState } from "react";
import { Container, Typography, Box } from "@mui/material";

import { useDispatch, useSelector } from "react-redux";

import { Routes, Route, useParams } from "react-router-dom";
import MainLayout from "../../../components/MainLayout/MainLayout";
import { getListNewsDetail } from "../../../redux-saga-middleware/reducers/news";
import { images } from "../../../utils/images";
import NewFooter from "../../NewFooter";

export default function NewsDetail() {
  const { listNewDetail } = useSelector((state) => state.newsReducer);
  const { device } = useSelector((state) => state.deviceReducer);
  const [dataNewsDetail, setDataNewsDetail] = useState({});
  const { id } = useParams();
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
            <Box className="image-title" sx={{ paddingTop: device === "Mobile" ? "40px" : "60px" }}>
              <Box
                component={"img"}
                src={images.BannerHomePageDesktop}
                alt="banner"
                sx={{width:" 100%", height:"100%"}}
              ></Box>
            </Box>
            <Box className="body-desc">
              <Box className="desc-title" sx={{
                padding:device === "Mobile" ? "20px 0" : "40px 0"
              }}>
                <Typography
                  sx={{
                    color: "white",
                    fontSize: device === "Mobile" ? "18px" : "26px",
                    textAlign: "left",
                  }}
                >
                  {dataNewsDetail?.title}
                </Typography>
              </Box>
              <Box dangerouslySetInnerHTML={{ __html: dataNewsDetail?.body }} className="desc-body" sx={{
                color:"white", fontSize: device === "Mobile" ? "14px" : "18px", textAlign:"left"              }}>
              </Box>
            </Box>
            <Box className="footer">
              <Suspense fallback="loading..." children={<NewFooter />} />
            </Box>
          </Container>
        }
        type="Home"
      />
    </>
  );
}
