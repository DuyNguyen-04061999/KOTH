import { Box } from "@mui/material";
import "./index.scss";

export default function AnimButton(props) {
  const { text, onClick, type } = props;
  const renderButtonWithType = () => {
    if (type === "primary") {
      return (
        <button
          className="anim-btn"
          style={{
            backgroundColor: "#7848ED",
            color: "white",
            padding: "10px 20px",
            borderRadius: "8px",
            border: "0px solid",
            width: "100%",
          }}
          onClick={onClick}
        >
          {text}
        </button>
      );
    } else if (type === "loadding") {
      return (
        <button
          className="anim-btn"
          style={{
            backgroundColor: "#7848ED",
            color: "white",
            padding: "10px 30px",
            borderRadius: "8px",
            border: " 0px solid",
            width: "100%",
          }}
          onClick={onClick}
        >
          {text}
        </button>
      );
    } else if (type === "highlight") {
      return (
        <button
          className="anim-btn"
          style={{
            backgroundColor: "#BE48ED",
            color: "white",
            padding: "10px 40px",
            borderRadius: "8px",
            border: " 0px solid",
            width: "100%",
            marginRight:"10px",
            outline: "none",
          }}
          onClick={onClick}
        >
          {text}
        </button>
      );
    } else if (type === "ghost") {
      return (
        <button
          className="anim-btn"
          style={{
            backgroundColor: "transparent",
            color: "#7848ED",
            padding: "10px 30px",
            borderRadius: "8px",
            border: "2px solid #7848ED",
            width: "100%",
          }}
          onClick={onClick}
        >
          {text}
        </button>
      );
    } else if (type === "Join") {
      return (
        <button
        className="anim-btn"
        style={{
          backgroundColor: "transparent",
          color: "#7848ED",
          padding: "10px 30px",
          borderRadius: "8px",
          border: "2px solid #7848ED",
          width: "auto",
        }}
        onClick={onClick}
      >
        {text}
      </button>
      )
    }
  };

  return (
    <>
      <Box sx={{
        marginRight:type === "highlight" ? "10px" : "0px",
        width:"100%"
      }}>{renderButtonWithType()}</Box>
    </>
  );
}
