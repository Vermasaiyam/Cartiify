"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useUser } from "@/lib/firestore/user/read";
import { CircularProgress } from "@nextui-org/react";
import { useState, useEffect } from "react";

export default function Page() {
    const [formData, setFormData] = useState({
        displayName: "",
        email: "",
        phoneNumber: "",
        photoURL: "",
    });

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

    const handleSubmit = (e) => {
        e.preventDefault();

    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-semibold mb-4 text-center">Edit Profile</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-2xl mx-auto">
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
                        className="rounded w-full py-2 px-3 text-gray-700 leading-tight focus:shadow-outline"
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
                        className="rounded w-full py-2 px-3 text-gray-700 leading-tight focus:shadow-outline"
                    />
                </div>
                <div>
                    <label htmlFor="phoneNumber" className="block text-gray-700 font-bold mb-2">
                        Contact Number
                    </label>
                    <input
                        type="text"
                        id="phoneNumber"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        className="rounded w-full py-2 px-3 text-gray-700 leading-tight focus:shadow-outline"
                    />
                </div>
                <div>
                    <label htmlFor="photoURL" className="block text-gray-700 font-bold mb-2">
                        Avatar
                    </label>
                    <img src={formData.photoURL || '/user.png'} alt={formData.name} className="h-32 w-32"/>
                    <input
                        type="text"
                        id="photoURL"
                        name="photoURL"
                        value={formData.photoURL}
                        onChange={handleChange}
                        className="rounded w-full py-2 px-3 text-gray-700 leading-tight focus:shadow-outline"
                    />
                </div>
                <div>
                    <button
                        type="submit"
                        onClick={handleSubmit}
                        className="bg-red-500 hover:bg-red-700 transition-all duration-200 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
    );
}