"use client";

import { auth } from "@/lib/firebase";
import { Button } from "@nextui-org/react";
import {
    sendPasswordResetEmail,
} from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import toast from "react-hot-toast";

export default function Page() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState({});

    const handleData = (key, value) => {
        setData({
            ...data,
            [key]: value,
        });
    };

    const handleSendEmail = async () => {
        setIsLoading(true);
        try {
            await sendPasswordResetEmail(auth, data?.email);
            toast.success("Reset Password Link has been sent to your email!");
            router.push("/");
        } catch (error) {
            toast.error(error?.message);
        }
        setIsLoading(false);
    };

    return (
        <main className="w-full flex justify-center items-center bg-gray-300 md:p-24 p-10 min-h-screen">
            <section className="flex flex-col gap-3">
                <div className="flex justify-center">
                    <img className="h-12" src="/logo.png" alt="Logo" />
                </div>
                <div className="flex flex-col gap-3 bg-white md:p-10 p-5 rounded-xl md:min-w-[440px] w-full">
                    <h1 className="font-bold text-xl">Forgot Password</h1>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleSendEmail();
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
                            required
                        />

                        <Button
                            isLoading={isLoading}
                            isDisabled={isLoading}
                            type="submit"
                            className="bg-red-500 hover:bg-red-700 transition-all duration-200 text-white"
                        >
                            Send Reset Link
                        </Button>
                    </form>
                    <div className="flex justify-between">
                        <Link href={`/login`}>
                            <button className="font-semibold text-sm text-blue-700">
                                Login
                            </button>
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}