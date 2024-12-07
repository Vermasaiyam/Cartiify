"use client"

import Sidebar from "./Sidebar";
import Header from "./Header";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

export default function AdminLayout({ children }) {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();
    const sidebarRef = useRef(null);

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

    return (
        <main className="relative flex">
            <div className="hidden md:block">
                <Sidebar />
            </div>
            <div
                className={`fixed md:hidden ease-in-out transition-all duration-400 ${
                    isOpen ? "translate-x-0" : "-translate-x-[260px]"
                } z-50`}
                ref={sidebarRef}
            >
                <Sidebar />
            </div>
            <section className="flex-1 flex flex-col min-h-screen">
                <Header toggleSidebar={toggleSidebar} className="relative z-40" />
                <section className="flex-1 bg-[#eff3f4] pt-16">{children}</section>
            </section>
        </main>
    );
}