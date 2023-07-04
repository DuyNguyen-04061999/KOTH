import React, { useEffect } from "react";
import "./index.scss";
import $ from "jquery";
export default function Timer({ number, active }) {
  useEffect(() => {
    const addClass = () => {
      $(function () {
        $(`.flip-card${active}`)
          .addClass("flip")
          .attr("data-content", `${number}`);
      });
      setTimeout(() => {
        $(function () {
          $(`.flip-card${active}`).removeClass("flip");
        });
      }, 300);
    };
    addClass();
  }, [number, active]);
  return (
    <div className={`flip-card${active}`}>
      <div className="top">{number}</div>
      <div className="bottom">{number}</div>
    </div>
  );
}
