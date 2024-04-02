import React, { useEffect } from "react";
import { Container, Typography } from "@mui/material";

import { useDispatch, useSelector } from "react-redux";

import { Navigate } from "react-router-dom";
import MainLayout from "../../../components/MainLayout/MainLayout";
import { getListNewsDetail } from "../../../redux-saga-middleware/reducers/news";

export default function NewsDetail() {
  const { tokenUser } = useSelector((state) => state?.userReducer);
  const id = 5;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      getListNewsDetail({
        id: id,
      })
    );
  });

  return tokenUser ? (
    <MainLayout
      children={
        <Container maxWidth="lg">
          <Typography>aaaaaaaaaaaaaaaaaaaa</Typography>
        </Container>
      }
      type="Home"
    />
  ) : (
    <Navigate to="/home" />
  );
}
