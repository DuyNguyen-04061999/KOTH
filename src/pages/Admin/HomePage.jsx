import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getListRef } from "../../redux-saga-middleware_admin/reducers/adminSubDistributorReducer";
import { getListDistributor } from "../../redux-saga-middleware_admin/reducers/adminMasterReducer";
import { getListSub } from "../../redux-saga-middleware_admin/reducers/adminDistributorReducer";
import { getListEndUser } from "../../redux-saga-middleware_admin/reducers/adminAgentReducer";
import { useState } from "react";
import AdminPanel from "../../components/Admin/AdminPanel/AdminPanel";
import { Box, Button, Container } from "@mui/material";
import NestedTable from "../../components/Admin/NestedTable/NestedTable";

const HomePage = () => {
  const { roles } = useSelector((state) => state.adminAuthReducer);
  const { listDistributor } = useSelector((state) => state.adminMasterReducer);
  const { listSub } = useSelector((state) => state.adminDistributorReducer);
  const { listRefs } = useSelector((state) => state.adminSubDistributorReducer);
  const { listEndUser } = useSelector((state) => state.adminAgentReducer);
  const [data, setData] = useState([]);

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

  const [headerList, setHeaderList] = useState([
    
  ])

  useEffect(() => {
    if(roles?.includes("master")) {
      setHeaderList([
        "ID",
        "Account",
        "Nick Name",
        "Manager",
        "Agents",
        "Players",
        "Revenue",
        "Register Date",
        "Last Login",
      ])
    }

    if(roles?.includes("distributor")) {
      setHeaderList([
        "ID",
        "Account",
        "Nick Name",
        "Give Permission",
        "Code/Link",
        "Manager",
        "Players",
        "Revenue",
        "Register Date",
        "Last Login",
      ])
    }

    if(roles?.includes("agent")) {
      setHeaderList([
        "ID",
        "Account",
        "Revenue",
        "Manager",
        "Register Date",
        "Last Login",
      ])
    }
     
  }, [roles])

  return (
    <Container>
      <AdminPanel></AdminPanel>
      <Box sx={{ marginTop: "36px" }}>
        <NestedTable headerList={headerList} data={data} />{" "}
      </Box>
    </Container>
  );
};

export default HomePage;
