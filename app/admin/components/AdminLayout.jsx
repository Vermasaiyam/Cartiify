"use client"

import Sidebar from "./Sidebar";
import Header from "./Header";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useAdmin } from "@/lib/firestore/admins/read";
import { useAuth } from "@/contexts/AuthContext";
import { CircularProgress } from "@nextui-org/react";
import { signOut } from "firebase/auth";

export default function AdminLayout({ children }) {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();
    const sidebarRef = useRef(null);
    const { user } = useAuth();
    const { data: admin, error, isLoading } = useAdmin({ email: user?.email });

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        toggleSidebar();
    }, [pathname]);

    useEffect(() => {
        function handleOutsideClick(event) {
            if (sidebarRef.current && !sidebarRef?.current?.contains(event.target)) {
                setIsOpen(false);
            }
        }

        document.addEventListener("mousedown", handleOutsideClick);

        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, []);

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

    if (!admin) {
        return (
            <div className="h-screen w-screen flex flex-col gap-2 justify-center items-center">
                <h1 className="font-bold">You are not an admin!</h1>
                <h1 className="text-gray-600 text-sm">{user?.email}</h1>
                <Button
                    onClick={async () => {
                        await signOut(auth);
                    }}
                >
                    Logout
                </Button>
            </div>
        );
    }

    return (
        <main className="relative flex">
            <div className="hidden lg:block">
                <Sidebar toggleSidebar={toggleSidebar} />
            </div>
            <div
                className={`fixed lg:hidden ease-in-out transition-all duration-400 ${isOpen ? "translate-x-0" : "-translate-x-[260px]"
                    } z-50`}
                ref={sidebarRef}
            >
                <Sidebar toggleSidebar={toggleSidebar} />
            </div>
            <section className="flex-1 flex flex-col min-h-screen overflow-hidden">
                <Header toggleSidebar={toggleSidebar} className="relative z-40" />
                <section className="flex-1 bg-[#eff3f4] pt-16">{children}</section>
            </section>
        </main>
    );
}