"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useUser } from "@/lib/firestore/user/read";
import { CircularProgress } from "@nextui-org/react";
import Link from "next/link";

export default function Page() {
    const { user } = useAuth();
    const { data, isLoading, error } = useUser({ uid: user?.uid });

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

    const formattedDate = data?.timestampCreate ? data.timestampCreate.toDate().toLocaleDateString() : '';

    return (
        <div className="min-h-[70vh] w-full items-center grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-4">
            <div className="flex flex-col items-center">
                <h1 className="text-3xl font-bold text-gray-800 mb-4">My Profile</h1>
                <img src={data?.photoURL || data?.imageURL || '/user.png'} alt="Profile Picture" className="rounded-full w-52 h-52 mx-auto" />
                <Link
                    href={'/account/update'}>
                    <button className="bg-red-500 hover:bg-red-700 transition-all duration-200 text-white  py-2 px-4 rounded mt-4">
                        Edit Profile
                    </button>
                </Link>
            </div>

            <div className="flex flex-col gap-6">
                <div className="mb-4">
                    <p className="block text-gray-700 text-2xl font-bold mb-2">Full Name:</p>
                    <p className="text-gray-900 text-xl font-normal">{data?.displayName || data.name}</p>
                </div>
                <div className="mb-4">
                    <p className="block text-gray-700 text-2xl font-bold mb-2">Email:</p>
                    <p className="text-gray-900 text-xl font-normal">{data?.email || data.email}</p>
                </div>
                {
                    data?.phoneNumber && (
                        <div className="mb-4">
                            <p className="block text-gray-700 text-2xl font-bold mb-2">Contact Number:</p>
                            <p className="text-gray-900 text-xl font-normal">{data?.phoneNumber}</p>
                        </div>
                    )
                }
                <div className="mb-4">
                    <p className="block text-gray-700 text-2xl font-bold mb-2">Joined On:</p>
                    <p className="text-gray-900 text-xl font-normal">{formattedDate}</p>
                </div>

                <div className="flex space-x-4">
                    <Link href={'/my-orders'}>
                        <button className="bg-red-500 hover:bg-red-700 transition-all duration-200 text-white font-bold py-2 px-4 rounded">
                            My Orders
                        </button>
                    </Link>
                    <Link href={'/forget-password'}>
                        <button className="bg-red-500 hover:bg-red-700 transition-all duration-200 text-white font-bold py-2 px-4 rounded">
                            Change Password
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}