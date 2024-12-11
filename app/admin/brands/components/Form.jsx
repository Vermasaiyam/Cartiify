"use client";

import { getBrand } from "@/lib/firestore/brands/read_server";
import { createNewBrand, updateBrand } from "@/lib/firestore/brands/write";
import { Button } from "@nextui-org/react";
import { CldImage, CldUploadWidget, getCldImageUrl } from "next-cloudinary";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Form() {
    const [data, setData] = useState(null);
    const [publicId, setPublicId] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();

    const searchParams = useSearchParams();
    const id = searchParams.get("id");

    const fetchData = async () => {
        try {
            const res = await getBrand({ id: id });
            if (!res) {
                toast.error("Brand Not Found!");
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
            await createNewBrand({ data: data, url: url });
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
                await updateBrand({ data: data, url: url });
            } else {
                await updateBrand({ data: data, url: "" });
            }
            toast.success("Successfully Updated");
            setData(null);
            setPublicId("");
            router.push(`/admin/brands`);
        } catch (error) {
            toast.error(error?.message);
        }
        setIsLoading(false);
    };

    return (
        <div className="flex flex-col gap-3 bg-white rounded-xl p-5 w-full lg:w-[400px]">
            <h1 className="font-semibold">{id ? "Update" : "Create"} Brand</h1>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                }}
                className="flex flex-col gap-3"
            >
                <div className="flex flex-col gap-1">
                    <label htmlFor="brand-name" className="text-gray-500 text-sm">
                        Name <span className="text-red-500">*</span>{" "}
                    </label>
                    <input
                        id="brand-name"
                        name="brand-name"
                        type="text"
                        placeholder="Enter Brand Name"
                        value={data?.name ?? ""}
                        onChange={(e) => {
                            handleData("name", e.target.value);
                        }}
                        className="border px-4 py-2 rounded-lg w-full focus:outline-none"
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <label htmlFor="brand-name" className="text-gray-500 text-sm">
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