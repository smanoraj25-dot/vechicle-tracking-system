import React, { useState } from "react";
import InnerImageZoom from "react-inner-image-zoom";

const ZoomImage = ({ src,index }) => {
  const [resetKey, setResetKey] = useState(0);

  return (
    <div
      onMouseLeave={() => setResetKey(prev => prev + 1)}
      onTouchEnd={() => setResetKey(prev => prev + 1)} // mobile support
    >
      <InnerImageZoom
        key={resetKey}
        src={src}
        zoomSrc={src}
        zoomType="hover"
        zoomScale={.35}
        hideHint
        fadeDuration={150}
        loading="lazy"
        alt={`product-${index}`}
      />
    </div>
  );
};

export default React.memo(ZoomImage);
