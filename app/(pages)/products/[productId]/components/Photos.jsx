"use client";

import { useState } from "react";

export default function Photos({ imageList }) {
    const [selectedImage, setSelectedImage] = useState(imageList[0]);
    const [zoomImageCoordinate, setZoomImageCoordinate] = useState({
        x: 0,
        y: 0,
    });
    const [zoomImage, setZoomImage] = useState(false);

    const handleMouseEnterProduct = (imageURL) => {
        setSelectedImage(imageURL);
    };

    const handleZoomImage = (e) => {
        const { left, top, width, height } = e.target.getBoundingClientRect();

        // Calculate relative mouse position on the image
        const x = ((e.clientX - left) / width).toFixed(4);
        const y = ((e.clientY - top) / height).toFixed(4);

        setZoomImageCoordinate({ x, y });
        setZoomImage(true); // Enable zoom on mouse move
    };

    const handleLeaveImageZoom = () => {
        setZoomImage(false); // Disable zoom when mouse leaves
    };

    if (!imageList || imageList.length === 0) {
        return null;
    }

    return (
        <div className="flex flex-col gap-3 w-full">
            {/* Main Image */}
            <div className="flex justify-center relative w-full">
                <img
                    className="object-contain h-[350px] md:h-[430px]"
                    src={selectedImage}
                    alt="Main Product"
                    onMouseMove={handleZoomImage}
                    onMouseLeave={handleLeaveImageZoom}
                />

                {zoomImage && (
                    <div
                        className="hidden lg:block absolute overflow-hidden w-[400px] h-[400px] bg-white border rounded-lg shadow-lg -right-[370px] top-0 z-10"
                    >
                        <div
                            className="w-full h-full bg-contain bg-no-repeat"
                            style={{
                                backgroundImage: `url(${selectedImage})`,
                                backgroundPosition: `${zoomImageCoordinate.x * 100}% ${zoomImageCoordinate.y * 100
                                    }%`,
                                backgroundSize: "250%",
                            }}
                        />
                    </div>
                )}
            </div>

            {/* Thumbnail Images */}
            <div className="flex flex-wrap justify-center items-center gap-3">
                {imageList.map((item) => (
                    <div
                        key={item}
                        onMouseEnter={() => handleMouseEnterProduct(item)}
                        className="cursor-pointer md:w-[80px] w-[70px] border rounded p-2"
                    >
                        <img
                            className="object-cover w-full h-full"
                            src={item}
                            alt="Thumbnail"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}