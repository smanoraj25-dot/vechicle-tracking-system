import { memo } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const HomeSlider = ({ slides, slidesPerView }) => (
    <Swiper
        centeredSlides={true}
        spaceBetween={30}
        loop={true}
        grabCursor={true}
        autoplay={{
            delay: 2500,
            disableOnInteraction: false,
        }}
        pagination={{
            clickable: true,
        }}
        navigation={true}
        breakpoints={{
            380: {
                slidesPerView: 1,
                spaceBetween: 20,
            },
            640: {
                slidesPerView: 2,
                spaceBetween: 20,
            },
            768: {
                slidesPerView: 3,
                spaceBetween: 40,
            },
            1024: {
                slidesPerView: slidesPerView,
                spaceBetween: 50,
            },
        }}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
    >
        {slides.map((slide, index) => (
            <SwiperSlide key={index}>
                <div>
                    <img
                        src={slide.img}
                        className="w-100"
                        alt={slide.imgCaption}
                        loading="lazy"
                    />
                </div>
            </SwiperSlide>
        ))}
    </Swiper>
);

export default memo(HomeSlider);
