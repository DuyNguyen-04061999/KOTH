import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import { Box, Container } from "@mui/material";
import { getListDistributor } from "../../../redux-saga-middleware_admin/reducers/adminMasterReducer";
import { getListSub } from "../../../redux-saga-middleware_admin/reducers/adminDistributorReducer";
import { getListRef } from "../../../redux-saga-middleware_admin/reducers/adminSubDistributorReducer";
import { getListEndUser } from "../../../redux-saga-middleware_admin/reducers/adminAgentReducer";
import AdminPanel from "../../../components/Admin/AdminPanel/AdminPanel";
import NestedTable from "../../../components/Admin/NestedTable/NestedTable";
import useWindowDimensions from "../../../utils/useWindowDimensions";
import DetailAccountDialogComponent from "../../../components/Admin/Dialog/DetailAccountDialogComponent";

const ManageDistributor = () => {
  const { roles } = useSelector((state) => state.adminAuthReducer);
  const { listDistributor } = useSelector((state) => state.adminMasterReducer);
  const { listSub } = useSelector((state) => state.adminDistributorReducer);
  const { listRefs } = useSelector((state) => state.adminSubDistributorReducer);
  const { listEndUser } = useSelector((state) => state.adminAgentReducer);
  const [data, setData] = useState([]);

  const { width } = useWindowDimensions()

  const dispatch = useDispatch();
  useEffect(() => {
    if (roles && roles?.length && roles[0]) {
      switch (roles[0]) {
        case "master": {
          dispatch(getListDistributor());
          break;
        }
        case "distributor": {
          dispatch(getListSub());
          break;
        }
        case "sub_distributor": {
          dispatch(getListRef());
          break;
        }
        case "agent": {
          dispatch(getListEndUser());
          break;
        }
        default: {
          break;
        }
      }
    }
  }, [dispatch, roles]);

  useEffect(() => {
    if (roles && roles?.length && roles[0]) {
      switch (roles[0]) {
        case "master": {
          setData([...listDistributor]);
          break;
        }
        case "distributor": {
          setData([...listSub]);
          break;
        }
        case "sub_distributor": {
          setData([...listRefs]);
          break;
        }
        case "agent": {
          setData([...listEndUser]);
          break;
        }
        default: {
          break;
        }
      }
    }
  }, [roles, listDistributor, listEndUser, listSub, listRefs]);

  const [headerList, setHeaderList] = useState([]);

  useEffect(() => {
    if (roles?.includes("master")) {
      setHeaderList([
        "",
        "ID",
        "Account",
        "Nick Name",
        "Manager",
        "Agents",
        "Players",
        "Revenue",
        "Register Date",
        "Last Login",
        "Time Zone",
      ]);
    }

    if (roles?.includes("distributor")) {
      setHeaderList([
        "",
        "ID",
        "Account",
        "Nick Name",
        "Give Permission",
        "Code/Link",
        "Manager",
        "Players",
        "Revenue By",
        "Revenue",
        "Register Date",
        "Last Login",
        "Time Zone",
      ]);
    }

    if (roles?.includes("agent")) {
      setHeaderList([
        "",
        "ID",
        "Account",
        "Nick Name",
        "Manager",
        "Players",
        "Revenue",
      ]);
    }
  }, [roles]);

  return (
    <Container>
      {width > 576 ? <AdminPanel></AdminPanel> : <DetailAccountDialogComponent/>}
      <Box sx={{ marginTop: "50px" }}>
        <NestedTable headerList={headerList} data={data} />{" "}
      </Box>
    </Container>
  );
};

export default ManageDistributor;
