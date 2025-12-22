import React, { useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import ZoomImage from "./ZoomImage"
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import "../productdetailslider/ProductDetailSlide.css";
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';
import { MdOutlineZoomOutMap } from "react-icons/md";

// import required modules
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
const ProductDetailSlide = ({ img = []  }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <>
      <div className="row slider-wrapper-pro-det">
        <div className="col-md-3">
          <Swiper
            onSwiper={setThumbsSwiper}
            loop={true}
            spaceBetween={10}
            freeMode={true}
            watchSlidesProgress={true}
            modules={[FreeMode, Navigation, Thumbs]}
            className="mySwiper  prod-detail-thumb"
            breakpoints={{
              380: {
                direction: "horizontal",
                slidesPerView: 4,
              },
              640: {
                direction: "horizontal",
                slidesPerView: 4,
              },
              768: {
                direction: "vertical",
                slidesPerView: 5,
              },
              1024: {
                direction: "vertical",
                slidesPerView: 6,
              },
            }}
          >
            {img.map((item, index) => (
              <SwiperSlide key={index}>
                <img src={item.url} className="pro-det-thumb-img" />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="col-md-9">
        <PhotoProvider>
          <Swiper
            loop={true}
            spaceBetween={10}
            thumbs={{ swiper: thumbsSwiper }}
            modules={[FreeMode, Navigation, Thumbs]}
            className="mySwiper2 prod-detail-slides "
          >
            
            {img.map((item, index) => (
              <SwiperSlide key={index}>
                
                <div className="image_viewer-ch">
                <PhotoView src={item.url} >
                <button ><MdOutlineZoomOutMap/></button>
                </PhotoView>
                </div>
                
              <ZoomImage src={item.url} index={index}/>
                
              </SwiperSlide>
            ))}
            
          </Swiper>
          </PhotoProvider>
        </div>
      </div>
    </>
  );
};

export default React.memo(ProductDetailSlide);
