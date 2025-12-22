import { memo, useMemo } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useSelector } from 'react-redux';
import Items from "../items/Items";

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import "./SimilarProduct.css";

import { Pagination, Autoplay, Navigation } from 'swiper/modules';

const SimilarProduct = ({ productItem }) => {
    const { products } = useSelector((state) => state.products);

    const similarProducts = useMemo(() => {
        if (!productItem) return [];
        return products.filter(
            (p) => p.category === productItem.category && p.id !== productItem.id
        );
    }, [products, productItem]);

    if (similarProducts.length === 0) {
        return null; // Don't render the component if there are no similar products
    }

    return (
        <div>
            <Swiper
                centeredSlides={true}
                spaceBetween={30}
                loop={true}
                grabCursor={true}
                pagination={{
                    clickable: false,
                }}
                navigation={true}
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
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper similar-product-swiper"
            >
                {similarProducts.map((item) => (
                    <SwiperSlide key={item.id}>
                        <Items prdts={item} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default memo(SimilarProduct);
