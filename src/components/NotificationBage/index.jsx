import { Badge, Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { openLoginDialog } from "../../redux-saga-middleware/reducers/authReducer";
import { openNotificationDialog } from "../../redux-saga-middleware/reducers/dialogReducer";
import { CheckToken } from "../../utils/checkToken";
import { secondNotiComparison } from "../../utils/timeDiff";

export default function NotificationBage() {
  const dispatch = useDispatch();
  const { tokenUser: token } = useSelector((state) => state.userReducer);
  const { listNotifiaction } = useSelector(
    (state) => state.notificationReducer
  );
  const [read, setRead] = useState(true);
  const decodeToken = CheckToken()


  useEffect(() => {
    for (let index = 0; index < listNotifiaction.length; index++) {
      const element = listNotifiaction[index];
      if (
        !element?.notificationRead &&
        secondNotiComparison(element?.createdAt, new Date()) &&
        (!localStorage.getItem("newNotiId") ||
          listNotifiaction[0]?.id !== localStorage.getItem("newNotiId"))
      ) {
        setRead(false);
        return;
      }
    }
  }, [listNotifiaction]);
  return (
    <Badge
      badgeContent={""}
      onClick={() => {
        if (decodeToken?.role !== "guest") {
          dispatch(openNotificationDialog());
          setRead(true);
          localStorage.setItem("newNotiId", listNotifiaction[0]?.id);
        } else {
          dispatch(openLoginDialog());
        }
      }}
      color="error"
      invisible
      className="me-3 cursor-pointer"
    >
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="33"
          height="33"
          fill="none"
          viewBox="0 0 38 38"
        >
          <rect width="38" height="38" fill="#68399E" rx="19"></rect>
          <path
            fill="#fff"
            d="M19.087 26.153h-6.053c-2.513 0-3.952-2.487-2.677-4.64a8.449 8.449 0 001.178-4.362c.007-1.277-.034-2.567.119-3.827.383-3.152 3.241-5.811 6.369-6.255 4.186-.6 8.676 2.794 8.66 7.739 0 1.407.016 2.825.212 4.214.118.835.524 1.658.93 2.422.576 1.082.695 2.139.082 3.204-.612 1.065-1.591 1.516-2.819 1.51-2-.016-4.002-.005-6-.005zm-.01-1.831c1.998 0 3.998-.026 5.997.01 1.222.022 1.728-1.11 1.137-1.995a7.476 7.476 0 01-1.261-3.62c-.093-1.287-.033-2.584-.12-3.873-.048-.743-.153-1.513-.403-2.208-.919-2.542-3.48-4.053-6.181-3.733-2.437.295-4.505 2.36-4.797 4.933-.137 1.211-.08 2.448-.088 3.673-.013 1.699-.404 3.311-1.32 4.732-.706 1.09-.044 2.146 1.239 2.1 1.93-.07 3.864-.019 5.796-.019zM19.107 31c-1.648-.072-2.967-.754-3.89-2.146-.38-.572-.303-1.1.183-1.412.485-.313.961-.177 1.363.404 1.21 1.742 3.46 1.738 4.682-.01.395-.565.888-.7 1.37-.376.48.324.538.842.156 1.413-.919 1.374-2.223 2.048-3.864 2.127z"
          ></path>
        </svg>
      </div>
      {!read && token && (
        <Box
          className="position-absolute rounded-circle"
          sx={{
            right: 0,
            top: -3,
            width: 12,
            height: 12,
            backgroundColor: "#f05153",
          }}
        ></Box>
      )}
    </Badge>
  );
}
