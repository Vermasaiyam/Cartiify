"use client";

import { auth } from "@/lib/firebase";
import { Button } from "@nextui-org/react";
import { reauthenticateWithCredential, updatePassword, EmailAuthProvider } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function ChangePasswordPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [data, setData] = useState({
        oldPassword: "",
        newPassword: "",
    });

    const handleData = (key, value) => {
        setData({
            ...data,
            [key]: value,
        });
    };

    const handleChangePassword = async () => {
        setIsLoading(true);
        const user = auth.currentUser;

        if (!user) {
            toast.error("You must be logged in to change your password.");
            router.push("/login");
            return;
        }

        try {
            // Step 1: Reauthenticate the user with their old password
            const credential = EmailAuthProvider.credential(user.email, data.oldPassword);
            await reauthenticateWithCredential(user, credential);

            // Step 2: Update the password
            await updatePassword(user, data.newPassword);
            toast.success("Password has been updated successfully!");
            router.push("/");
        } catch (error) {
            if (error.code === "auth/wrong-password") {
                toast.error("Incorrect old password.");
            } else {
                toast.error(error.message || "An error occurred while changing the password.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className="w-full flex justify-center items-center bg-gray-300 md:p-24 p-10 min-h-screen">
            <section className="flex flex-col gap-3">
                <Link href="/" className="flex flex-row items-center justify-center gap-2 lg:gap-4 text-red-600 font-bold">
                    <img className="md:h-12 h-8" src="/logo.png" alt="Cartify" />
                    <div className="md:text-2xl text-xl">
                        Cartify
                    </div>
                </Link>
                <div className="flex flex-col gap-3 bg-white md:p-10 p-5 rounded-xl md:min-w-[440px] w-full">
                    <h1 className="font-bold text-xl">Change Password</h1>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleChangePassword();
                        }}
                        className="flex flex-col gap-3"
                    >
                        <div className="relative flex items-center">
                            <input
                                placeholder="Enter Old Password"
                                type={showOldPassword ? "text" : "password"}
                                name="old-password"
                                id="old-password"
                                value={data.oldPassword}
                                onChange={(e) => {
                                    handleData("oldPassword", e.target.value);
                                }}
                                className="px-3 py-2 rounded-xl border focus:outline-none w-full pr-10"
                                required
                            />
                            <div
                                className="absolute right-3 text-xl cursor-pointer text-gray-600"
                                onClick={() => setShowOldPassword((prev) => !prev)}
                            >
                                {showOldPassword ? <FaEyeSlash /> : <FaEye />}
                            </div>
                        </div>
                        <div className="relative flex items-center">
                            <input
                                placeholder="Enter New Password"
                                type={showNewPassword ? "text" : "password"}
                                name="new-password"
                                id="new-password"
                                value={data.newPassword}
                                onChange={(e) => {
                                    handleData("oldPassword", e.target.value);
                                }}
                                className="px-3 py-2 rounded-xl border focus:outline-none w-full pr-10"
                                required
                            />
                            <div
                                className="absolute right-3 text-xl cursor-pointer text-gray-600"
                                onClick={() => setShowNewPassword((prev) => !prev)}
                            >
                                {showNewPassword ? <FaEyeSlash /> : <FaEye />}
                            </div>
                        </div>
                        <Button
                            isLoading={isLoading}
                            isDisabled={isLoading}
                            type="submit"
                            className="bg-red-500 hover:bg-red-700 transition-all duration-200 text-white"
                        >
                            Change Password
                        </Button>
                    </form>
                    <div className="flex justify-between">
                        <button
                            className="font-semibold text-sm text-blue-700"
                            onClick={() => router.push("/")}
                        >
                            Home
                        </button>
                    </div>
                </div>
            </section>
        </main>
    );
}