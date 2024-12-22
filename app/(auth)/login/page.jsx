"use client";

import { useAuth } from "@/contexts/AuthContext";
import { auth } from "@/lib/firebase";
import { createUser } from "@/lib/firestore/user/write";
import { Button } from "@nextui-org/react";
import {
    GoogleAuthProvider,
    signInWithEmailAndPassword,
    signInWithPopup,
} from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

export default function Page() {
    const { user } = useAuth();
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [data, setData] = useState({});

    const handleData = (key, value) => {
        setData({
            ...data,
            [key]: value,
        });
    };

    const handleLogin = async () => {
        setIsLoading(true);
        try {
            await signInWithEmailAndPassword(auth, data?.email, data?.password);
            toast.success("Logged In Successfully");
        } catch (error) {
            toast.error(error?.message);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        if (user) {
            router.push("/");
        }
    }, [user]);

    return (
        <main className="w-full flex justify-center items-center bg-gray-300 md:p-24 p-12 min-h-screen">
            <section className="flex flex-col gap-3">
                <Link href="/" className="flex flex-row items-center justify-center gap-2 lg:gap-4 text-red-600 font-bold">
                    <img className="md:h-12 h-8" src="/logo.png" alt="Cartify" />
                    <div className="md:text-2xl text-xl">
                        Cartify
                    </div>
                </Link>
                <div className="flex flex-col gap-3 bg-white md:p-10 p-5 rounded-xl md:min-w-[440px] w-full min-w-[350px]">
                    <h1 className="font-bold text-xl text-cen">Login</h1>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleLogin();
                        }}
                        className="flex flex-col gap-3"
                    >
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
                        <div className="flex w-full justify-end">
                            <Link href={`/forget-password`}>
                                <button className="font-semibold text-sm text-blue-600 hover:underline">
                                    Forgot Password?
                                </button>
                            </Link>
                        </div>
                        <Button
                            isLoading={isLoading}
                            isDisabled={isLoading}
                            type="submit"
                            className="bg-red-500 hover:bg-red-700 transition-all duration-200 text-white"
                        >
                            Login
                        </Button>
                    </form>
                    <div className="flex justify-between">
                        <Link href={`/sign-up`}>
                            <button className="font-semibold text-sm">
                                Don't have any account? <span className="text-red-500">Create Account</span>
                            </button>
                        </Link>

                    </div>
                    <hr />
                    <SignInWithGoogleComponent />
                </div>
            </section>
        </main>
    );
}

function SignInWithGoogleComponent() {
    const [isLoading, setIsLoading] = useState(false);
    const handleLogin = async () => {
        setIsLoading(true);
        try {
            const credential = await signInWithPopup(auth, new GoogleAuthProvider());
            const user = credential.user;
            await createUser({
                uid: user?.uid,
                displayName: user?.displayName,
                photoURL: user?.photoURL,
            });
        } catch (error) {
            toast.error(error?.message);
        }
        setIsLoading(false);
    };
    return (
        <Button isLoading={isLoading} isDisabled={isLoading} onClick={handleLogin}>
            Sign In With Google
        </Button>
    );
}