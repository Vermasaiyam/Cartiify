"use client";

import { getCollection } from "@/lib/firestore/collections/read_server";
import {
    createNewCollection,
    updateCollection,
} from "@/lib/firestore/collections/write";
import { useProduct, useProducts } from "@/lib/firestore/products/read";
import { Button } from "@nextui-org/react";
import { X } from "lucide-react";
import { CldImage, CldUploadWidget, getCldImageUrl } from "next-cloudinary";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Form() {
    const [data, setData] = useState(null);
    const [publicId, setPublicId] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const { data: products } = useProducts({ pageLimit: 2000 });

    const router = useRouter();

    const searchParams = useSearchParams();
    const id = searchParams.get("id");

    const fetchData = async () => {
        try {
            const res = await getCollection({ id: id });
            if (!res) {
                toast.error("Collection Not Found!");
            } else {
                setData(res);
            }
        } catch (error) {
            toast.error(error?.message);
        }
    };

    useEffect(() => {
        if (id) {
            fetchData();
        }
    }, [id]);

    const handleData = (key, value) => {
        setData((preData) => {
            return {
                ...(preData ?? {}),
                [key]: value,
            };
        });
    };

    const handleCreate = async () => {
        setIsLoading(true);
        try {
            const url = getCldImageUrl({
                width: 960,
                height: 600,
                src: publicId,
            });
            await createNewCollection({ data: data, url: url });
            toast.success("Successfully Created");
            setData(null);
            setPublicId("");
        } catch (error) {
            toast.error(error?.message);
        }
        setIsLoading(false);
    };

    const handleUpdate = async () => {
        setIsLoading(true);
        try {
            if (publicId) {
                const url = getCldImageUrl({
                    width: 960,
                    height: 600,
                    src: publicId,
                });
                await updateCollection({ data: data, url: url });
            } else {
                await updateCollection({ data: data, url: "" });
            }
            toast.success("Successfully Updated");
            setData(null);
            setPublicId("");
            router.push(`/admin/collections`);
        } catch (error) {
            toast.error(error?.message);
        }
        setIsLoading(false);
    };

    return (
        <div className="flex flex-col gap-3 bg-white rounded-xl p-5 w-full md:w-[400px]">
            <h1 className="font-semibold">{id ? "Update" : "Create"} Collection</h1>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                }}
                className="flex flex-col gap-3"
            >
                <div className="flex flex-col gap-1">
                    <label htmlFor="collection-title" className="text-gray-500 text-sm">
                        Title <span className="text-red-500">*</span>{" "}
                    </label>
                    <input
                        id="collection-title"
                        name="collection-title"
                        type="text"
                        placeholder="Enter Title"
                        value={data?.title ?? ""}
                        onChange={(e) => {
                            handleData("title", e.target.value);
                        }}
                        className="border px-4 py-2 rounded-lg w-full focus:outline-none"
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <label
                        htmlFor="collection-sub-title"
                        className="text-gray-500 text-sm"
                    >
                        Sub Title <span className="text-red-500">*</span>{" "}
                    </label>
                    <input
                        id="collection-sub-title"
                        name="collection-sub-title"
                        type="text"
                        value={data?.subTitle ?? ""}
                        onChange={(e) => {
                            handleData("subTitle", e.target.value);
                        }}
                        placeholder="Enter Sub Title"
                        className="border px-4 py-2 rounded-lg w-full focus:outline-none"
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="category-name" className="text-gray-500 text-sm">
                        Image <span className="text-red-500">*</span>{" "}
                    </label>
                    {
                        data?.imageURL && !publicId && (
                            <div className="flex justify-center">
                                <img
                                    className="h-20 object-cover rounded-lg"
                                    src={data?.imageURL}
                                    alt={data?.name}
                                />
                            </div>
                        )
                    }
                    {
                        publicId && (
                            <CldImage src={publicId} alt={publicId} width={"100"} height={"80"} />
                        )
                    }
                    <CldUploadWidget
                        uploadPreset="cartify"
                        onSuccess={({ event, info }) => {
                            if (event === "success") {
                                setPublicId(info?.public_id);
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
                <div className="flex flex-wrap gap-3">
                    {data?.products?.map((productId) => {
                        return (
                            <ProductCard
                                productId={productId}
                                key={productId}
                                setData={setData}
                            />
                        );
                    })}
                </div>
                <div className="flex flex-col gap-1">
                    <label
                        htmlFor="collection-sub-title"
                        className="text-gray-500 text-sm"
                    >
                        Select Product <span className="text-red-500">*</span>{" "}
                    </label>
                    <select
                        id="collection-products"
                        name="collection-products"
                        type="text"
                        onChange={(e) => {
                            setData((prevData) => {
                                let list = [...(prevData?.products ?? [])];
                                list.push(e.target.value);
                                return {
                                    ...prevData,
                                    products: list,
                                };
                            });
                        }}
                        className="border px-4 py-2 rounded-lg w-full focus:outline-none"
                    >
                        <option value="">Select Product</option>
                        {products?.map((item) => {
                            return (
                                <option
                                    disabled={data?.products?.includes(item?.id)}
                                    value={item?.id}
                                >
                                    {item?.title}
                                </option>
                            );
                        })}
                    </select>
                </div>
                <Button
                    isLoading={isLoading}
                    isDisabled={isLoading}
                    type="submit"
                    onClick={(e) => {
                        e.preventDefault();
                        if (id) {
                            handleUpdate();
                        } else {
                            handleCreate();
                        }
                    }}
                >
                    {id ? "Update" : "Create"}
                </Button>
            </form>
        </div>
    );
}

function ProductCard({ productId, setData }) {
    const { data: product } = useProduct({ productId: productId });
    return (
        <div className="flex gap-3 bg-blue-500 text-white px-4 py-1 rounded-full text-sm">
            <h2>{product?.title}</h2>
            <button
                onClick={(e) => {
                    e.preventDefault();
                    setData((prevData) => {
                        let list = [...prevData?.products];
                        list = list?.filter((item) => item != productId);
                        return {
                            ...prevData,
                            products: list,
                        };
                    });
                }}
            >
                <X size={12} />
            </button>
        </div>
    );
}