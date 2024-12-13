"use client";

import { useState } from "react";

export default function Photos({ imageList }) {
    const [selectedImage, setSelectedImage] = useState(imageList[0]);
    if (imageList?.length === 0) {
        return <></>;
    }

    return (
        <div className="flex flex-col gap-3 w-full">
            <div className="flex justify-center w-full">
                <img
                    className="object-contain h-[350px] md:h-[430px]"
                    src={selectedImage}
                />
            </div>
            <div className="flex flex-wrap justify-center items-center gap-3">
                {imageList?.map((item, index) => {
                    return (
                        <div
                            key={index}
                            onClick={() => {
                                setSelectedImage(item);
                            }}
                            className="md:w-[80px] w-[70px] border rounded p-2"
                        >
                            <img className="object-cover" src={item} alt="" />
                        </div>
                    );
                })}
            </div>
        </div>
    );
}