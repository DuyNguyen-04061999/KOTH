import { Box, Container } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AdminPanel from "../../../components/Admin/AdminPanel/AdminPanel";
import DetailAccountDialogComponent from "../../../components/Admin/Dialog/DetailAccountDialogComponent";
import NestedTable from "../../../components/Admin/NestedTable/NestedTable";
import { getListEndUser } from "../../../redux-saga-middleware_admin/reducers/adminAgentReducer";
import { getListSub } from "../../../redux-saga-middleware_admin/reducers/adminDistributorReducer";
import { getListDistributor } from "../../../redux-saga-middleware_admin/reducers/adminMasterReducer";
import { getListRef } from "../../../redux-saga-middleware_admin/reducers/adminSubDistributorReducer";
import useWindowDimensions from "../../../utils/useWindowDimensions";

const ManageDistributor = () => {
  const { roles } = useSelector((state) => state.adminAuthReducer);
  const { listDistributor } = useSelector((state) => state.adminMasterReducer);
  const { listSub } = useSelector((state) => state.adminDistributorReducer);
  const { listRefs } = useSelector((state) => state.adminSubDistributorReducer);
  const { listEndUser } = useSelector((state) => state.adminAgentReducer);
  const [data, setData] = useState([]);

  const { width } = useWindowDimensions();

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
    if (width > 576) {
      if (roles?.includes("master")) {
        setHeaderList([
          "",
          // "ID",
          "Account",
          "Display Name",
          "Manager",
          "Agents",
          "Players",
          "Total Deposit",
          "Total Deposit Current Month",
          "Revenue Overall",
          "Revenue Current Month",
          "Subscribers",
          "Register Date",
          "Last Login",
        ]);
      }

      if (roles?.includes("distributor")) {
        setHeaderList([
          "",
          // "ID",
          "Account",
          "Display Name",
          "Give Permission",
          "Code/Link",
          "Manager",
          "Players",
          "Referred By",
          "Total Deposit",
          "Total Deposit Current Month",
          "Revenue Overall",
          "Revenue Current Month",
          "Subscribers",
          "Register Date",
          "Last Login",
        ]);
      }

      if (roles?.includes("agent")) {
        setHeaderList([
          "",
          "ID",
          "Display Name",
          "Manager",
          "Total Deposit",
          "Total Deposit Current Month",
          "Revenue Overall",
          "Revenue Current Month",
          "Subscribers",
          "Phone",
          "Email"
        ]);
      }
    } else {
      if (roles?.includes("master")) {
        setHeaderList(["Display Name", "Level", "Revenue Overall"]);
      }

      if (roles?.includes("distributor")) {
        setHeaderList(["Display Name", "Level", "Revenue Overall"]);
      }

      if (roles?.includes("agent")) {
        setHeaderList(["Display Name", "Phone", "Revenue Overall"]);
      }
    }
  }, [roles, width]);

  return (
    <Container>
      <AdminPanel></AdminPanel> <DetailAccountDialogComponent />
      <Box sx={{ marginTop: "40px" }}>
        <NestedTable headerList={headerList} data={data} />{" "}
      </Box>
    </Container>
  );
};

export default ManageDistributor;
