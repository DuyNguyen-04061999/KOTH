import React from "react";
import ItemComponent from "../ItemComponent";

const ListItemLoading = () => {
  const itemCount = 6;
  const listItemLoading = [];
  for (let i = 0; i < itemCount; i++) {
    listItemLoading.push(<ItemComponent isLoading={true} key={i} />);
  }
  return (listItemLoading);
};

export default ListItemLoading;
