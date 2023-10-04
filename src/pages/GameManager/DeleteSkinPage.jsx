import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Button, Grid, Typography } from "@mui/material";
import {
  Edit,
  RemoveCircle,
  RemoveCircleOutlineOutlined,
  RemoveOutlined,
} from "@mui/icons-material";
import { Card } from "react-bootstrap";
import { useSelector } from "react-redux";

const DeleteSkinPage = () => {
  const game = useParams();
  const { token } = useSelector((state) => state.authReducer);
  const [skins, setSkins] = useState([]);
  const [fetchSkin, setFetchSkin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getListSkinGame = async () => {
      try {
        setFetchSkin(true);
        const response = await axios.get(
          process.env.REACT_APP_END_POINT + `/api/games/${game.id}/skins/`
        );
        if (response?.data || response?.status === 200) {
          setSkins(response?.data);
          setFetchSkin(false);
        }
      } catch (error) {
        console.log(error);
        setFetchSkin(false);
      }
    };
    getListSkinGame();
  }, []);

  const handleDeleteSkin = async (id) => {
    try {
      const response = await axios.delete(
        process.env.REACT_APP_END_POINT + `/api/games/${game.id}/skins/${id}`
      );
      if (response?.data || response?.status === 200) {
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };
  

  return (
    <Box component={"div"} className="p-5">
      {skins?.length !== 0 ? (
        <Grid container spacing={2}>
          {skins &&
            skins?.length > 0 &&
            skins.map((skin, index) => (
              <Grid
                item
                xs={2}
                key={index}
                sx={{
                  cursor: "pointer",
                }}
              >
                <Card
                  style={{ width: "100%", height: "100%" }}
                  className="rounded bg-info position-relative"
                >
                  <img
                    src={
                      process.env.REACT_APP_SOCKET_SERVER +
                      "/" +
                      skin?.skinAvatar
                    }
                    alt=""
                    style={{
                      maxWidth: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                    width={"100%"}
                    // onClick={() => {
                    //   if (skin?.GameFiles && skin?.GameFiles?.length > 0) {
                    //     localStorage.setItem("game", JSON.stringify(skin));
                    //     const params = new URLSearchParams();
                    //     params.append("token", token);
                    //   }
                    // }}
                  />
                  <Typography
                    className="position-absolute text-white text-bold text-center"
                    sx={{
                      bottom: 0,
                      left: 0,
                      width: "100%",
                      background: "transparent",
                    }}
                  >
                    {skin?.skinName}
                  </Typography>
                  <Button
                    className="position-absolute ps-1 pe-1 text-white"
                    sx={{
                      top: 0,
                      right: 0,
                      background: "#fc3c3c",
                    }}
                    onClick={() =>handleDeleteSkin(skin?.id)}
                  >
                    <RemoveOutlined />
                  </Button>
                  <Button
                    className="position-absolute ps-1 pe-1 text-white bg-success"
                    sx={{
                      top: 0,
                      left: 0,
                    }}
                  >
                    <Edit />
                  </Button>
                </Card>
              </Grid>
            ))}
        </Grid>
      ) : (
        <Typography style={{ color: "white" }}>Not Add Skins Yet</Typography>
      )}
    </Box>
  );
};

export default DeleteSkinPage;
