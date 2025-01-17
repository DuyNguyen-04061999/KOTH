import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FilterRevenue from "../../../components/Admin/FilterRevenue/FilterRevenue";
import NestedTable from "../../../components/Admin/NestedTable/NestedTable";
import { getListEndUser } from "../../../redux-saga-middleware_admin/reducers/adminAgentReducer";
import { getListSub } from "../../../redux-saga-middleware_admin/reducers/adminDistributorReducer";
import { getListDistributor } from "../../../redux-saga-middleware_admin/reducers/adminMasterReducer";
import { getListRef } from "../../../redux-saga-middleware_admin/reducers/adminSubDistributorReducer";
import useWindowDimensions from "../../../utils/useWindowDimensions";

const Revenue = () => {
  const { roles } = useSelector((state) => state.adminAuthReducer);
  const { listDistributor } = useSelector((state) => state.adminMasterReducer);
  const { listSub, listSubRef } = useSelector(
    (state) => state.adminDistributorReducer
  );
  const { width } = useWindowDimensions();
  const { listRefs } = useSelector((state) => state.adminSubDistributorReducer);
  const { listEndUser, listAR } = useSelector(
    (state) => state.adminAgentReducer
  );
  
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

  const [headerList, setHeaderList] = useState([]);

  useEffect(() => {
    if (width > 576) {
      if (roles?.includes("master")) {
        setHeaderList([
          // "ID",
          "Account",
          "Display Name",
          "Manager",
          "Agents",
          "Players",
          "System Revenue (100%) Overall",
          "Distributor Revenue (42%) Overall",
          "System Revenue (100%) This Month",
          "Distributor Revenue (42%) This Month",
          "Subscribers",
          "Start Date",
          "Finish Date",
        ]);
      }

      if (roles?.includes("distributor")) {
        setHeaderList([
          // "ID",
          "Account",
          "Display Name",
          "Manager",
          "Players",
          "System Revenue (100%) Overall",
          "Agent Revenue (25%) Overall",
          "System Revenue (100%) This Month",
          "Agent Revenue (25%) This Month",
          "Subscribers",
          "Referral Bonus Revenue 5%",
          "Register Date",
          "Last Login",
        ]);
      }

      if (roles?.includes("agent")) {
        setHeaderList([
          "ID",
          "Display Name",
          "Manager",
          "System Revenue (100%) Overall",
          "Agent Revenue (25%) Overall",
          "System Revenue (100%) This Month",
          "Agent Revenue (25%) This Month",
          "Subscribers",
          "Referral Bonus Revenue 5%",
          "Register Date",
          "Last Login",
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
    <Box component={"div"} className="p-5">
      <FilterRevenue />
      <Box sx={{ marginTop: "50px" }}>
        <NestedTable headerList={headerList} data={data} />
        {roles?.includes("distributor") &&
          listSubRef &&
          listSubRef?.length > 0 && (
            <>
              <Box component={"div"} className="mb-2 mt-2">
                <Typography
                  sx={{
                    fontWeight: 600,
                    textAlign: "left"
                  }}
                >
                  Referrals
                </Typography>
              </Box>
              <NestedTable headerList={headerList} data={listSubRef} />
            </>
          )}
        {roles?.includes("agent") && listAR && listAR?.length > 0 && (
          <>
            <Box component={"div"} className="mb-2 mt-2">
              <Typography
                sx={{
                  fontWeight: 600,
                  textAlign: "left"
                }}
              >
                Referrals
              </Typography>
            </Box>
            <NestedTable headerList={headerList} data={listAR} />
          </>
        )}
      </Box>
    </Box>
  );
};

export default Revenue;
