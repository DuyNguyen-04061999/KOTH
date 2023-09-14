import React from "react";
import { useDispatch, useSelector } from "react-redux";
import AdminStructure from "../../components/Admin/AdminStructure/AdminStructure";
import UserManager from "../../components/Admin/UserManager/UserManager";
import { useEffect } from "react";
import { getListRef } from "../../redux-saga-middleware_admin/reducers/adminSubDistributorReducer";
import { getListDistributor } from "../../redux-saga-middleware_admin/reducers/adminMasterReducer";
import { getListSub } from "../../redux-saga-middleware_admin/reducers/adminDistributorReducer";
import { getListEndUser } from "../../redux-saga-middleware_admin/reducers/adminAgentReducer";
import { useState } from "react";
import { includes } from "lodash";
import AdminPanel from "../../components/Admin/AdminPanel/AdminPanel";
import { Box, Button } from "@mui/material";

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
          setData([...listDistributor]);
          break;
        }
        case "distributor": {
          dispatch(getListSub());
          setData([...listSub]);
          break;
        }
        case "sub_distributor": {
          console.log("sub", listRefs);
          dispatch(getListRef());
          setData([...listRefs]);
          break;
        }
        case "agent": {
          dispatch(getListEndUser());
          setData([...listEndUser]);
          break;
        }
        default: {
          setData([]);
          break;
        }
      }
    }
  }, [dispatch, roles]);

  if (!roles.includes("agent"))
    return (
      <>
        <AdminPanel></AdminPanel> <AdminStructure data={data} />{" "}
      </>
    );
  if (roles.includes("agent"))
    return (
      <>
        <AdminPanel></AdminPanel>
        <UserManager data={data} />
        <Box
          sx={{
            width: "100%",
            height: "105px",
            position: "absolute",
            bottom: 0,
            zIndex: 10,
          }}
        >
          <Button>View All</Button>
        </Box>
      </>
    );
};

export default HomePage;
