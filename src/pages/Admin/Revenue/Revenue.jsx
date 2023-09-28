import React, { useEffect, useState } from "react";
import FilterRevenue from "../../../components/Admin/FilterRevenue/FilterRevenue";
import { Box, Container, Typography } from "@mui/material";
import NestedTable from "../../../components/Admin/NestedTable/NestedTable";
import { useDispatch, useSelector } from "react-redux";
import { getListDistributor } from "../../../redux-saga-middleware_admin/reducers/adminMasterReducer";
import { getListSub } from "../../../redux-saga-middleware_admin/reducers/adminDistributorReducer";
import { getListRef } from "../../../redux-saga-middleware_admin/reducers/adminSubDistributorReducer";
import { getListEndUser } from "../../../redux-saga-middleware_admin/reducers/adminAgentReducer";
import useWindowDimensions from "../../../utils/useWindowDimensions";

const Revenue = () => {
  const { roles } = useSelector((state) => state.adminAuthReducer);
  const { listDistributor } = useSelector((state) => state.adminMasterReducer);
  const { listSub, listSubRef } = useSelector((state) => state.adminDistributorReducer);
  
  const { listRefs } = useSelector((state) => state.adminSubDistributorReducer);
  const { listEndUser, listAR } = useSelector((state) => state.adminAgentReducer);
  const { width } = useWindowDimensions()
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
        "Start Date",
        "Finish Date",
        "Time Zone"
      ])
    }

    if(roles?.includes("distributor")) {
      setHeaderList([
        "ID",
        "Account",
        "Nick Name",
        "Manager",
        "Players",
        "Revenue",
        "Referral Bonus Revenue 5%",
        "Register Date",
        "Last Login",
        "Time Zone"
      ])
    }

    if(roles?.includes("agent")) {
      setHeaderList([
        "ID",
        "Account",
        "Nick Name",
        "Manager",
        "Players",
        "Revenue",
        "Referral Bonus Revenue 5%",
        "Register Date",
        "Last Login",
        "Time Zone"
      ])
    }
     
  }, [roles])


  return (
    <Container>
      {width > 576 && (<FilterRevenue />)}
      <Box sx={{ marginTop: "50px" }}>
        <NestedTable headerList={headerList} data={data} />
        {roles?.includes("distributor") && listSubRef && listSubRef?.length > 0 && (
          <>
            <Box component={"div"} className="mb-2 mt-2">
              <Typography sx={{
                fontWeight: 600
              }}>Referrals</Typography>
            </Box>
            <NestedTable headerList={headerList} data={listSubRef} />
          </>
        )}
        {roles?.includes("agent") && listAR && listAR?.length > 0 && (
          <>
            <Box component={"div"} className="mb-2 mt-2">
              <Typography sx={{
                fontWeight: 600
              }}>Referrals</Typography>
            </Box>
            <NestedTable headerList={headerList} data={listAR} />
          </>
        )}
      </Box>
    </Container>
  );
};

export default Revenue;
