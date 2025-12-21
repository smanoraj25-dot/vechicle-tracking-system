import React, { useCallback, memo } from "react";
import { useNavigate } from "react-router-dom";
import HomeCategory from "../../Components/homecategories/HomeCategory";
import HomeSlider from "../../Components/homeslider/HomeSlider";

//images
import banner1 from "../../assets/images/banner-images/home-banner-1.jpg";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import "./Home.css";

//icons
import { AiOutlineShoppingCart } from "react-icons/ai";

const homeBanner = [
    {
        img: banner1,
        imgCaption: "Handcrafted Sarees Banner",
    },
];

const EssentialSlider = [
    { img: "/images/pose-1/prod-1.jpg", imgCaption: "product1" },
    { img: "/images/pose-1/prod-2.jpg", imgCaption: "product2" },
    { img: "/images/pose-1/prod-3.jpg", imgCaption: "product3" },
    { img: "/images/pose-1/prod-4.jpg", imgCaption: "product4" },
    { img: "/images/pose-1/prod-5.jpg", imgCaption: "product5" },
    { img: "/images/pose-2/prod-31.jpg", imgCaption: "product31" },
    { img: "/images/pose-2/prod-32.jpg", imgCaption: "product32" },
    { img: "/images/pose-2/prod-33.jpg", imgCaption: "product33" },
];

const bestSelling = [
    { img: "/images/pose-2/prod-36.jpg", imgCaption: "product36" },
    { img: "/images/pose-2/prod-37.jpg", imgCaption: "product37" },
    { img: "/images/pose-2/prod-38.jpg", imgCaption: "product38" },
    { img: "/images/pose-2/prod-39.jpg", imgCaption: "product39" },
    { img: "/images/pose-2/prod-40.jpg", imgCaption: "product40" },
    { img: "/images/pose-2/prod-41.jpg", imgCaption: "product42" },
    { img: "/images/pose-2/prod-43.jpg", imgCaption: "product43" },
];

const Category = [
    { img: "/images/pose-3/prod-61.jpg", imgCaption: "product61" },
    { img: "/images/pose-3/prod-62.jpg", imgCaption: "product62" },
    { img: "/images/pose-3/prod-63.jpg", imgCaption: "product63" },
    { img: "/images/pose-3/prod-64.jpg", imgCaption: "product64" },
    { img: "/images/pose-3/prod-65.jpg", imgCaption: "product65" },
    { img: "/images/pose-3/prod-66.jpg", imgCaption: "product66" },
    { img: "/images/pose-3/prod-67.jpg", imgCaption: "product67" },
    { img: "/images/pose-3/prod-68.jpg", imgCaption: "product68" },
];

const Home = () => {
    const navigate = useNavigate();

    const handleNavigate = useCallback(
        (category) => {
            navigate("/product", { state: { category } });
        },
        [navigate]
    );

    return (
        <>
            <h1 className="visually-hidden">
                Seelaikaari – Handcrafted Traditional Sarees Online
            </h1>
            <section className="home-sec-1-wrapper">
                <div className="container-fluid ">
                    <Swiper
                        pagination={{
                            dynamicBullets: true,
                        }}
                        modules={[Pagination]}
                        className="mySwiper"
                    >
                        {homeBanner.map((items, index) => (
                            <SwiperSlide key={index}>
                                <img
                                    src={items.img}
                                    alt={items.imgCaption}
                                    className="w-100"
                                    loading="lazy"
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </section>

            <section className="home-sec-2-wrapper hom-sec2-bg">
                <div className="container">
                    <div className="row row-gap-5">
                        <div className="col-md-4">
                            <h4 className="sec-2-h-Ct">Wedding Wardrobe Essentials!</h4>
                            <p className="sec-2-p-ct">
                                Explore this much-loved collection of striking that travel
                                effortlessly from a day at work to an evening out.
                            </p>
                            <button
                                className="btn-Shop-t"
                                onClick={() => handleNavigate("WeddingEssentials")}
                            >
                                <AiOutlineShoppingCart /> Shop Now{" "}
                            </button>
                        </div>
                        <div className="col-md-8">
                            <HomeSlider slides={EssentialSlider} slidesPerView={3} />
                        </div>
                    </div>
                </div>
            </section>

            <section className="home-sec-2-wrapper hom-sec3-cat-bg">
                <div className="container">
                    <h2 className="title-home">Shop By Category</h2>
                    <div className="row my-4 row-gap-4">
                        {Category.map((items, index) => (
                            <div className="col-md-3 col-6" key={index}>
                                <HomeCategory items={items} handleNavigate={handleNavigate} />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="home-sec-2-wrapper sect-4-bg-texture">
                <div className="container">
                    <div className="row row-gap-5">
                        <div className="col-md-8">
                            <HomeSlider slides={bestSelling} slidesPerView={3} />
                        </div>
                        <div className="col-md-4">
                            <h4 className="sec-2-h-Ct">Best Selling Products!</h4>
                            <p className="sec-2-p-ct">
                                Explore a selection of exquisite fabric lengths woven in fine
                                silk, the perfect accompaniments to your favourite saris this
                                festive season.
                            </p>
                            <button
                                className="btn-Shop-t"
                                onClick={() => handleNavigate("BestSelling")}
                            >
                                <AiOutlineShoppingCart /> Shop Now{" "}
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default memo(Home);
