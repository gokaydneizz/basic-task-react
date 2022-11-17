import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";

const Image = ({ img }) => {
  const [src, setSrc] = useState(img[0].length > 0 ? img[0] : "");
  const [imgIndex, setImgIndex] = useState(0);
  if (!img) {
    return;
  }
  return (
    <div className="image-div-container">
      <div className="firstImgBox">
        <img src={src} alt="" />
      </div>
      <div className="img-slider">
        <div className="icons">
          <FontAwesomeIcon icon={faChevronLeft} />
        </div>
        <div className="images">
          {img.map((img, idx) => (
            <img
              className={imgIndex === idx ? "selected-img" : ""}
              src={img}
              key={idx}
              onClick={() => {
                setSrc(img);
                setImgIndex(idx);
              }}
              alt="product"
            />
          ))}
        </div>
        <div className="icons">
          <FontAwesomeIcon icon={faChevronRight} />
        </div>
      </div>
    </div>
  );
};

export default Image;
