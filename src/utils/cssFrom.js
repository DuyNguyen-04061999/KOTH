import { color } from "./colors";

export const inputCss = () => {
  return {
    marginTop: "7px",
    border: "none",
    backgroundColor: color.backgroundNav,
    padding: "10px 35px",
    color: "#fff",
    fontWeight: "600",
    minWidth: "264px",
  };
};

export const btnForm = () => {
  return {
    padding: "10px 35px",
    backgroundColor: "#d610a5",
    border: "none",
    color: "#fff",
  };
};

export const inpChat = () => {
  return {
    backgroundColor: "#26182e",
    border: "none",
    color: "#4c5191",
    fontWeight: "500",
    padding: "3px 10px",
    "&:focusVisible": {
      outLine: "none",
    },
    width: "100%",
    marginRight: "10px",
  };
};
