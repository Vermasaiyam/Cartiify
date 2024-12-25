"use client";

import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import {
    Cat,
    Layers2,
    LayoutDashboard,
    LibraryBig,
    LogOut,
    PackageOpen,
    Plus,
    ShieldCheck,
    ShoppingCart,
    Star,
    User,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import toast from "react-hot-toast";

export default function Sidebar({ toggleSidebar }) {
    const menuList = [
        {
            name: "Dashboard",
            link: "/admin",
            icon: <LayoutDashboard className="h-5 w-5" />,
        },
        {
            name: "Products",
            link: "/admin/products",
            icon: <PackageOpen className="h-5 w-5" />,
        },
        {
            name: "Categories",
            link: "/admin/categories",
            icon: <Layers2 className="h-5 w-5" />,
        },
        {
            name: "Brands",
            link: "/admin/brands",
            icon: <Cat className="h-5 w-5" />,
        },
        {
            name: "Collections",
            link: "/admin/collections",
            icon: <LibraryBig className="h-5 w-5" />,
        },
        {
            name: "Orders",
            link: "/admin/orders",
            icon: <ShoppingCart className="h-5 w-5" />,
        },
        {
            name: "Reviews",
            link: "/admin/reviews",
            icon: <Star className="h-5 w-5" />,
        },
        {
            name: "Customers",
            link: "/admin/customers",
            icon: <User className="h-5 w-5" />,
        },
        {
            name: "Admins",
            link: "/admin/admins",
            icon: <ShieldCheck className="h-5 w-5" />,
        },
    ];

    const logout = async () => {
        try {
            await toast.promise(signOut(auth), {
                error: (e) => e?.message,
                loading: "Loading...",
                success: "Logged out successfully.",
            });
        } catch (error) {
            toast.error(error?.message);
        }
    }

    return (
        <section className="sticky top-0 flex flex-col gap-8 bg-white border-r px-5 py-3 h-screen overflow-hidden w-[260px] z-100">
            <button
                onClick={toggleSidebar}
                className="absolute top-3 left-3 transition-transform duration-300 ease-in-out rotate-45 lg:hidden"
            >
                <Plus className="h-6 w-6" />
            </button>

            <div className="flex justify-center pt-4">
                <Link
                    href={"/"}
                    className="flex flex-row items-center justify-center gap-4 text-red-600 font-bold"
                >
                    <img className="h-10" src="/logo.png" alt="Cartiify" />
                    <div className="text-2xl">Cartiify</div>
                </Link>
            </div>

            <ul className="flex-1 h-full overflow-y-auto flex flex-col gap-4">
                {menuList?.map((item, key) => {
                    return <Tab item={item} key={key} />;
                })}
            </ul>

            <div className="flex justify-center">
                <button
                    onClick={logout}
                    className="flex gap-2 items-center px-3 py-2 hover:bg-indigo-100 rounded-xl w-full justify-center ease-soft-spring duration-400 transition-all"
                >
                    <LogOut className="h-5 w-5" /> Logout
                </button>
            </div>
        </section>
    );
}

function Tab({ item }) {
    const pathname = usePathname();
    const isSelected = pathname === item?.link;
    return (
        <Link href={item?.link}>
            <li
                className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold ease-soft-spring transition-all duration-300
        ${isSelected ? "bg-red-300 text-white" : "bg-white text-black"} 
        `}
            >
                {item?.icon} {item?.name}
            </li>
        </Link>
    );
}