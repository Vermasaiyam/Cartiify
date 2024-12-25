"use client";

import { auth } from "@/lib/firebase";
import { createUser } from "@/lib/firestore/user/write";
import { Button } from "@nextui-org/react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import loginIcons from '@/public/signin.gif'
import toast from "react-hot-toast";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { CldImage, CldUploadWidget, getCldImageUrl } from "next-cloudinary";

export default function Page() {
    const router = useRouter();
    const [publicId, setPublicId] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState({});

    const handleData = (key, value) => {
        setData({
            ...data,
            [key]: value,
        });
    };

    const handleSignUp = async () => {
        setIsLoading(true);
        try {
            const credential = await createUserWithEmailAndPassword(
                auth,
                data?.email,
                data?.password
            );
            await updateProfile(credential.user, {
                displayName: data?.name,
                phoneNumber: data?.phoneNumber
            });
            const user = credential.user;
            const url = getCldImageUrl({
                width: 960,
                height: 600,
                src: publicId,
            });
            await createUser({
                uid: user?.uid,
                email: data?.email,
                displayName: data?.name,
                phoneNumber: data?.phoneNumber,
                photoURL: user?.photoURL || url,
            });
            toast.success("Account created Successfully");
            router.push("/");
        } catch (error) {
            toast.error(error?.message);
        }
        setIsLoading(false);
    };

    return (
        <main className="w-full flex justify-center items-center bg-gray-300 md:p-24 p-10 min-h-screen">
            <section className="flex flex-col gap-3">
                <Link href="/" className="flex flex-row items-center justify-center gap-2 lg:gap-4 text-red-600 font-bold">
                    <img className="md:h-12 h-8" src="/logo.png" alt="Cartiify" />
                    <div className="md:text-2xl text-xl">
                        Cartiify
                    </div>
                </Link>
                <div className="flex flex-col gap-3 bg-white md:p-10 p-5 rounded-xl md:min-w-[440px] w-full">
                    <h1 className="font-bold text-center text-xl">Create Account</h1>
                    <div className='w-28 h-28 mx-auto relative overflow-hidden rounded-full'>
                        <div>
                            {
                                publicId ? (
                                    <CldImage src={publicId} alt={publicId} width={"112"} height={"112"} className="rounded-full" />
                                ) : (
                                    <img
                                        src={loginIcons.src}
                                        alt="Sign Up"
                                        className="rounded-full"
                                    />
                                )
                            }
                        </div>
                        <CldUploadWidget
                            uploadPreset="Cartiify"
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
                                            className="text-xs bg-opacity-80 bg-slate-200 pb-4 pt-2 cursor-pointer text-center absolute bottom-0 w-full"
                                            onClick={() => open()}
                                        >
                                            Upload  Photo
                                        </button>
                                    </div>
                                );
                            }}
                        </CldUploadWidget>
                    </div>

                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleSignUp();
                        }}
                        className="flex flex-col gap-3"
                    >
                        <input
                            placeholder="Enter Your Name"
                            type="text"
                            name="user-name"
                            id="user-name"
                            value={data?.name}
                            onChange={(e) => {
                                handleData("name", e.target.value);
                            }}
                            className="px-3 py-2 rounded-xl border focus:outline-none w-full"
                            required
                        />
                        <input
                            placeholder="Enter Your Email"
                            type="email"
                            name="user-email"
                            id="user-email"
                            value={data?.email}
                            onChange={(e) => {
                                handleData("email", e.target.value);
                            }}
                            className="px-3 py-2 rounded-xl border focus:outline-none w-full"
                            required
                        />
                        <input
                            placeholder="Enter Your Phone Number"
                            type="number"
                            name="user-phone-number"
                            id="user-phone-number"
                            value={data?.phoneNumber}
                            onChange={(e) => {
                                handleData("phoneNumber", e.target.value);
                            }}
                            min={1000000000}
                            max={9999999999}
                            className="px-3 py-2 rounded-xl border focus:outline-none w-full"
                            required
                        />
                        <div className="relative flex items-center">
                            <input
                                placeholder="Enter Your Password"
                                type={showPassword ? "text" : "password"}
                                name="user-password"
                                id="user-password"
                                value={data?.password}
                                onChange={(e) => handleData("password", e.target.value)}
                                className="px-3 py-2 rounded-xl border focus:outline-none w-full pr-10"
                                required
                            />
                            <div
                                className="absolute right-3 text-xl cursor-pointer text-gray-600"
                                onClick={() => setShowPassword((prev) => !prev)}
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </div>
                        </div>
                        <Button
                            isLoading={isLoading}
                            isDisabled={isLoading}
                            type="submit"
                            className="bg-red-500 hover:bg-red-700 transition-all duration-200 text-white"
                        >
                            Sign Up
                        </Button>
                    </form>
                    <div className="flex justify-between">
                        <Link href={`/login`}>
                            <button className="font-semibold text-sm">
                                Already have an Account? <span className="text-red-500">Login</span>
                            </button>
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}