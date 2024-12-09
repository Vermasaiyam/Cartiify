import { CldImage, CldUploadWidget } from "next-cloudinary";

export default function Images({
    data,
    setFeatureImage,
    featureImage,
    imageList,
    setImageList,
}) {
    return (
        <section className="flex flex-col gap-3 bg-white border p-4 rounded-xl">
            <h1 className="font-semibold">Images</h1>
            <div className="flex flex-col gap-1">
                {data?.featureImageURL && !featureImage && (
                    <div className="flex justify-center">
                        <img
                            className="h-20 object-cover rounded-lg"
                            src={data?.featureImageURL}
                            alt=""
                        />
                    </div>
                )}

                {
                    featureImage && (
                        <CldImage src={featureImage} alt={featureImage} width={"100"} height={"80"} />
                    )
                }
                <label
                    className="text-gray-500 text-xs"
                    htmlFor="product-feature-image"
                >
                    Feature Image <span className="text-red-500">*</span>{" "}
                </label>

                <CldUploadWidget
                    uploadPreset="cartify"
                    onSuccess={({ event, info }) => {
                        if (event === "success") {
                            setFeatureImage(info?.public_id);
                        }
                    }}
                >
                    {({ open }) => {
                        return (
                            <div className="flex justify-start">
                                <button
                                    className="bg-red-100 text-red-700 text-sm rounded-md border border-red-300 outline-none px-4 py-2 hover:bg-red-200 transition duration-200"
                                    onClick={() => open()}
                                >
                                    Choose File
                                </button>
                            </div>
                        );
                    }}
                </CldUploadWidget>
            </div>

            <div className="flex flex-col gap-1">
                {imageList?.length === 0 && data?.imageList?.length != 0 && (
                    <div className="flex flex-wrap gap-3">
                        {data?.imageList?.map((item) => {
                            return (
                                <img
                                    className="w-20 object-cover rounded-lg"
                                    src={item}
                                    alt=""
                                />
                            );
                        })}
                    </div>
                )}

                <div className="flex flex-wrap gap-2 mb-4">
                    {
                        imageList.length > 0 && (imageList.map((image, index) => (
                            <CldImage
                                key={image.publicId}
                                src={image.publicId}
                                alt={`uploaded-image-${index}`}
                                width={100}
                                height={80}
                                className="rounded border"
                            />
                        )))
                    }
                </div>
                <label className="text-gray-500 text-xs" htmlFor="product-images">
                    Images <span className="text-red-500">*</span>{" "}
                </label>
                <CldUploadWidget
                    uploadPreset="cartify"
                    options={{ multiple: true, maxFiles: 10 }}
                    onSuccess={({ event, info }) => {
                        if (event === "success") {
                            setImageList((prevImages) => [
                                ...prevImages,
                                { publicId: info?.public_id, url: info?.secure_url }
                            ]);
                        }
                    }}
                >
                    {({ open }) => {
                        return (
                            <div className="flex justify-start">
                                <button
                                    className="bg-red-100 text-red-700 text-sm rounded-md border border-red-300 outline-none px-4 py-2 hover:bg-red-200 transition duration-200"
                                    onClick={() => open()}
                                >
                                    Choose File
                                </button>
                            </div>
                        );
                    }}
                </CldUploadWidget>
            </div>
        </section>
    );
}