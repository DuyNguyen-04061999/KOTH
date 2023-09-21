import React from "react";
import ItemComponent from "../../../pages/NewHomePageComponent/NewHomePage/ItemComponent";

const ListItemLoading = (props) => {
  const {itemCount = 6, ...other} = props;
  const listItemLoading = [];
  for (let i = 0; i < itemCount; i++) {
    listItemLoading.push(<ItemComponent isLoading={true} key={i} />);
  }
  return (listItemLoading);
};

export default ListItemLoading;
