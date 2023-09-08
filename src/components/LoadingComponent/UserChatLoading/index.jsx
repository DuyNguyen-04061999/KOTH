import { Avatar, Box, Skeleton } from "@mui/material";
import React from "react";

const UserChatLoading = (props) => {
  const {
    bgColor = "rgba(255,255,255,0.3)",
    animation = "pulse",
    ...other
  } = props;
  return (
    <Box sx={{ display: "flex", alignItems: "center", padding: "10px" }}>
      <Skeleton
        animation={animation}
        sx={{ bgcolor: bgColor }}
        variant="circular"
        width={40}
        height={40}
      >
        <Avatar />
      </Skeleton>
      <Box sx={{ marginLeft: "8px" }}>
        <Skeleton
          animation={animation}
          sx={{ bgcolor: bgColor }}
          variant="text"
          width={70}
          height={24}
        />
        <Skeleton
          animation={animation}
          sx={{ bgcolor: bgColor }}
          variant="text"
          width={98}
          height={40}
        />
      </Box>
    </Box>
  );
};


const UserChatLoadingList = (props) => {
    const {itemCount = 10} = props
    const listItemLoading = [];
    for (let i = 0; i < itemCount; i++) {
      listItemLoading.push(<UserChatLoading key={i} />);
    }
    return (listItemLoading);
}

export default UserChatLoadingList
;
