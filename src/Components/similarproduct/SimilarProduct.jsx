// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import Items from "../items/Items";
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
//Css
import "../similarproduct/SimilarProduct.css";

// import required modules
import { Pagination, Autoplay, Navigation } from 'swiper/modules';
import { useSelector } from 'react-redux';

const SimilarProduct = ({productItem}) => {
    const { products } = useSelector((state) => state.products);

    return (
        <>
            <div>
                <Swiper
                    centeredSlides={true}
                    spaceBetween={30}
                    loop={true}
                    grabCursor={true}
                    // autoplay={{
                    //     delay: 2500,
                    //     disableOnInteraction: false,
                    // }}
                    pagination={{
                        clickable: false,
                    }}
                    navigation={false}
                    breakpoints={{
                        380: {
                            slidesPerView: 2,
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
                            slidesPerView: 5,
                            spaceBetween: 50,
                        },
                    }}
                    modules={[Autoplay, Navigation]}
                    className="mySwiper similar-product-swiper"
                >
                    {products.map((item,index)=>{
                        return ( <SwiperSlide key={index} >
                        <Items prdts={item} />
                    </SwiperSlide>)
                    })}
                  
                </Swiper>
            </div>
        </>
    )
}

export default SimilarProduct
