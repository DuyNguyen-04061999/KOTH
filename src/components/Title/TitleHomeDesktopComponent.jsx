import React from "react";
import { images2 } from "../../utils/images";
import useWindowDimensions from "../../utils/useWindowDimensions";

export default function TitleHomeDesktopComponent(props) {
  const { title, icon, noicon, overBg, noSeeAll, noBg } = props;
  const { width } = useWindowDimensions();

  return (
    <div className="position-relative mb-4" style={{
      width: '100%'
    }}>
      <div></div>
      <div className="positiion-absolute d-flex justify-content-between" style={{
        width: '100%'
      }}>
        <div className=" position-relative" style={{
          width: '100%',
          display:"flex"
        }}>
          {!noBg && (
            <div
              className="position-absolute"
              style={{
                backgroundImage: overBg ? `url(${overBg})` : "",
                backgroundRepeat: "no-repeat",
                backgroundSize: "contain",
                backgroundPosition: "left top",
                width: "100%",
                height: "100%",
                bottom: width > 576 ? 28 : 15,
              }}
            ></div>
          )}
          {!noicon && (
            <div>
              <img
                hidden={noicon ? noicon : false}
                src={icon ? icon : ""}
                alt="Battle Icon"
                className="icon-animate img-fluid"
                height={width > 576 ? 28 : 20}
                width={width > 576 ? 28 : 20}
              />
            </div>
          )}
          <div className="mx-3">
            <div className="position-relative">
              <img
                src={images2.popuptext}
                alt="Battle Title"
                width={"100%"}
                height={width > 576 ? 28 : 20}
              />
            </div>
            <div
              className="position-absolute mx-2"
              style={{
                top: 0,
              }}
            >
              <h1
                className="title-text-desktop"
                style={{
                  fontSize: width < 576 ? 16 : 28,
                }}
              >
                {title}
              </h1>
            </div>
          </div>
        </div>
        {noSeeAll && noSeeAll ? (
          <></>
        ) : (
          <div className="d-flex align-items-center"></div>
        )}
      </div>
    </div>
  );
}
