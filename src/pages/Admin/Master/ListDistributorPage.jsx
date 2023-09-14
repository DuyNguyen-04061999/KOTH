import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteDistributor,
  getListDistributor,
} from "../../../redux-saga-middleware_admin/reducers/adminMasterReducer";
import { Box, Container } from "@mui/material";
import useWindowDimensions from "../../../utils/useWindowDimensions";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Navigate, useNavigate } from "react-router-dom";

export default function ListDistributorPage() {
  const dispatch = useDispatch();
  const { listDistributor } = useSelector((state) => state.adminMasterReducer);
  const { roles } = useSelector((state) => state.adminAuthReducer);

  useEffect(() => {
    dispatch(getListDistributor());
  }, [dispatch]);

  const { height } = useWindowDimensions();
  const navigate = useNavigate();

  const handleEdit = (id) => {
    navigate(`/master/edit-distributor/${id}`);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteDistributor({ id }));
    }
  };

  return (
    <Container fixed>
      <Box
        component={"div"}
        className="bg-white text-dark"
        sx={{
          height,
        }}
      >
        {roles && roles?.length > 0 && roles?.includes("master") ? (
          <Box component={"div"} className=" d-flex p-2">
            {listDistributor &&
              listDistributor?.length > 0 &&
              listDistributor?.map((dis, i_dis) => (
                <Box
                  component={"div"}
                  className="card me-2 p-2 pt-3 pb-3 cursor-pointer d-flex flex-row justify-content-between"
                  key={i_dis}
                >
                  {dis?.userName}
                  <Box component={"div"} className="d-flex">
                    <EditIcon
                      color="success"
                      onClick={() => handleEdit(dis?.id)}
                    />
                    <DeleteIcon
                      color="error"
                      onClick={() => handleDelete(dis?.id)}
                      className="ms-3"
                    />
                  </Box>
                </Box>
              ))}
          </Box>
        ) : (
          <Navigate to={"/"} />
        )}
      </Box>
    </Container>
  );
}
