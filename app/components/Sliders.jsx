"use client";

import Link from "next/link";
import Slider from "react-slick";
import AuthContextProvider from "@/contexts/AuthContext";
import { ChevronLeft, ChevronRight, Heart } from "lucide-react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const PrevArrow = (props) => {
    const { className, onClick } = props;
    return (
        <div
            className={`${className} absolute left-4 top-1/2 transform -translate-y-1/2 text-white bg-black bg-opacity-50 p-2 rounded-full z-10`}
            onClick={onClick}
        >
            <ChevronLeft size={24} />
        </div>
    );
};

const NextArrow = (props) => {
    const { className, onClick } = props;
    return (
        <div
            className={`${className} absolute right-4 top-1/2 transform -translate-y-1/2 text-white bg-black bg-opacity-50 p-2 rounded-full z-10`}
            onClick={onClick}
        >
            <ChevronRight size={24} />
        </div>
    );
};

export default function FeaturedProductSlider({ featuredProducts }) {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        prevArrow: <PrevArrow />,
        nextArrow: <NextArrow />,
    };

    return (
        <div className="relative w-full">
            <Slider {...settings}>
                {featuredProducts?.map((product) => {
                    return (
                        <div key={product?.id}>
                            <div className="flex flex-col-reverse md:flex-row gap-4 bg-[#f8f8f8] p-5 md:px-24 md:py-20 w-full h-full">
                                <div className="flex-1 flex flex-col justify-center gap-6">
                                    <h2 className="text-gray-500 text-xs md:text-base">
                                        NEW FASHION
                                    </h2>
                                    <div className="flex flex-col gap-4">
                                        <Link href={`/products/${product?.id}`}>
                                            <h1 className="md:text-4xl text-xl font-semibold">
                                                {product?.title}
                                            </h1>
                                            <h1 className="text-gray-600 md:text-sm text-xs max-w-96 line-clamp-2">
                                                {product?.shortDescription}
                                            </h1>
                                        </Link>
                                    </div>
                                    <AuthContextProvider>
                                        <div className="flex items-center gap-4">
                                            <Link
                                                href={`/checkout?type=buynow&productId=${product?.id}`}
                                            >
                                                <button className="bg-red-600 text-white text-xs md:text-sm px-4 py-1.5 rounded-lg">
                                                    BUY NOW
                                                </button>
                                            </Link>
                                            <button className="border-2 border-red-600 text-red-600 text-xs md:text-sm px-4 py-1.5 rounded-lg">
                                                ADD TO CART
                                            </button>
                                            <button className="text-pink-600 text-xs md:text-sm px-4 py-1.5 rounded-lg">
                                                <Heart />
                                            </button>
                                        </div>
                                    </AuthContextProvider>
                                </div>
                                <div className="flex justify-center items-center bg-blend-multiply">
                                    <Link href={`/products/${product?.id}`}>
                                        <img
                                            className="h-[14rem] md:h-[23rem] object-cover"
                                            src={product?.featureImageURL}
                                            alt={product?.title}
                                        />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </Slider>
        </div>
    );
}