"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useUser } from "@/lib/firestore/user/read";
import { updateUser } from "@/lib/firestore/user/write";
import { Button, CircularProgress } from "@nextui-org/react";
import { CldImage, CldUploadWidget, getCldImageUrl } from "next-cloudinary";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

export default function Page() {
    const [publicId, setPublicId] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        displayName: "",
        email: "",
        phoneNumber: "",
        photoURL: "",
    });
    const router = useRouter();

    const { user } = useAuth();
    const { data, isLoading, error } = useUser({ uid: user?.uid });

    useEffect(() => {
        if (data) {
            setFormData({
                displayName: data?.displayName || data?.name || "",
                email: data?.email || "",
                phoneNumber: data?.phoneNumber || "",
                photoURL: data?.photoURL || data?.imageURL || "",
            });
        }
    }, [data]);

    if (isLoading) {
        return (
            <div className="h-screen w-screen flex justify-center items-center">
                <CircularProgress />
            </div>
        );
    }

    if (error) {
        return (
            <div className="h-screen w-screen flex justify-center items-center">
                <h1 className="text-red-500">{error}</h1>
            </div>
        );
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);
        try {
            let url;
            if (publicId) {
                url = getCldImageUrl({
                    width: 960,
                    height: 600,
                    src: publicId,
                });
                setFormData((prevFormData) => ({ ...prevFormData, photoURL: url }));
            }

            if (publicId && !formData.photoURL) {
                toast.error("Please wait for the image to upload.");
                setIsSubmitting(false);
                return;
            }
            console.log("client data", formData?.photoURL);

            await updateUser({
                uid: user?.uid,
                email: formData?.email,
                displayName: formData?.name,
                phoneNumber: formData?.phoneNumber,
                photoURL: url || formData?.photoURL,
            });
            toast.success("User updated Successfully.");
            router.push('/account')
            setPublicId("");
        } catch (error) {
            toast.error(error?.message);
        }
        setIsSubmitting(false);
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-semibold mb-4 text-center">Edit Profile</h1>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                }}
                className="flex flex-col gap-4 max-w-2xl mx-auto"
            >
                <div>
                    <label htmlFor="displayName" className="block text-gray-700 font-bold mb-2">
                        Name
                    </label>
                    <input
                        type="text"
                        id="displayName"
                        name="displayName"
                        value={formData.displayName}
                        onChange={handleChange}
                        className="rounded w-full py-2 px-3 text-gray-700 leading-tight focus:shadow-outline bg-gray-100"
                    />
                </div>
                <div>
                    <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
                        Email Address
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="rounded w-full py-2 px-3 text-gray-700 leading-tight focus:shadow-outline bg-gray-100"
                    />
                </div>
                <div>
                    <label htmlFor="phoneNumber" className="block text-gray-700 font-bold mb-2">
                        Contact Number
                    </label>
                    <input
                        type="number"
                        id="phoneNumber"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        min={1000000000}
                        max={9999999999}
                        className="rounded w-full py-2 px-3 text-gray-700 leading-tight focus:shadow-outline bg-gray-100"
                    />
                </div>
                <div>
                    <label htmlFor="photoURL" className="block text-gray-700 font-bold mb-2">
                        Avatar
                    </label>
                    {
                        publicId ? (
                            <CldImage src={publicId} alt={publicId} width={"100"} height={"80"} />
                        ) : (
                            <img src={formData.photoURL || '/user.png'} alt={formData.name} className="h-32 w-32" />
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
                                        className="bg-red-100 text-red-700 text-sm rounded-md border border-red-300 outline-none px-4 py-2 hover:bg-red-200 transition duration-200 my-1"
                                        onClick={() => open()}
                                    >
                                        Choose File
                                    </button>
                                </div>
                            );
                        }}
                    </CldUploadWidget>
                </div>
                <div>
                    <Button
                        isLoading={isSubmitting}
                        isDisabled={isSubmitting}
                        type="submit"
                        onClick={(e) => {
                            e.preventDefault();
                            handleSubmit();
                        }}
                        className="bg-red-500 hover:bg-red-700 transition-all duration-200 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        {isSubmitting ? "Saving Changes" : "Save Changes"}
                    </Button>
                </div>
            </form>
        </div>
    );
}