"use client";

import { Search, UserCircle2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import LogoutButton from "./LogoutButton";
import { useAuth } from "@/contexts/AuthContext";
import AdminButton from "./AdminButton";
import HeaderClientButtons from "./HeaderClientButtons";
import { Avatar } from "@nextui-org/react";
import { useUser } from "@/lib/firestore/user/read";

export default function Header() {
    const router = useRouter();

    const menuList = [
        {
            name: "Home",
            link: "/",
        },
        {
            name: "My Orders",
            link: "/my-orders",
        },
        {
            name: "About",
            link: "/about-us",
        },
        {
            name: "Contact",
            link: "/contact-us",
        },
    ];
    const isActive = (path) => {
        const pathname = usePathname();
        return pathname === path ? "text-red-500 font-bold bg-gray-100" : "";
    }

    function UserChecking() {
        const { user } = useAuth();
        const { data } = useUser({ uid: user?.uid });
        if (!user) {
            return (
                <Link href={"/login"}>
                    <button className="text-white bg-red-500 hover:bg-red-700 transition-all duration-200 md:px-4 md:py-2 px-3 py-1.5 md:ml-4 ml-2 md:text-sm text-xs rounded-full">
                        Login
                    </button>
                </Link>
            );
        }
        return (
            <>
                <HeaderClientButtons isActive={isActive} />
                <Link href={`/account`}>
                    {
                        (data?.photoURL || data?.imageURL) ? (
                            <>
                                <div className="block sm:hidden">
                                    <Avatar className="avatar-mobile" src={data?.photoURL || data?.imageURL || "/user.png"} />
                                </div>
                                <div className="hidden sm:block">
                                    <Avatar className="avatar-desktop" src={data?.photoURL || data?.imageURL || "/user.png"} />
                                </div>
                            </>
                        ) : (
                            <button
                                title="My Account"
                                className={`h-8 w-8 flex justify-center items-center rounded-full hover:bg-gray-100 hover:text-red-600 ${isActive('/account')}`}
                            >
                                <UserCircle2 size={16} className={`block sm:hidden text-gray-700 hover:text-red-600 ${isActive('/account')}`} />
                                <UserCircle2 size={20} className={`hidden sm:block text-gray-700 hover:text-red-600 ${isActive('/account')}`} />
                            </button>
                        )
                    }
                </Link>
                <LogoutButton />
            </>
        );
    }

    return (
        <nav className="sticky top-0 z-50 bg-white bg-opacity-65 backdrop-blur-2xl py-2 px-4 md:py-3 md:px-6 lg:px-16 border-b flex items-center justify-between">
            <div className="flex items-center gap-2 md:gap-3">
                {usePathname() !== "/" && (
                    <button
                        onClick={() => router.back()}
                        className="rounded-full px-2 py-1.5 hover:bg-gray-100 hover:text-red-600 lg:hidden block"
                        title="Go Back"
                    >
                        <ArrowLeft size={20} className="text-gray-700" />
                    </button>
                )}

                <Link
                    href={"/"}
                    className="flex flex-row items-center justify-center gap-2 lg:gap-4 text-red-600 font-bold"
                >
                    <img className="h-6 md:h-8" src="/logo.png" alt="Cartify" />
                    <div className="hidden md:block md:text-xl lg:text-2xl">Cartify</div>
                </Link>
            </div>

            <div className="hidden md:flex gap-2 items-center font-semibold">
                {menuList.map((item, index) => (
                    <Link key={index} href={item.link}>
                        <button
                            className={`text-base px-4 py-2 rounded-lg hover:text-red-600 hover:bg-gray-100 ${isActive(
                                item.link
                            )}`}
                        >
                            {item.name}
                        </button>
                    </Link>
                ))}
            </div>

            <div className="flex items-center gap-1">
                <AdminButton isActive={isActive} />
                <Link href={`/search`}>
                    <button
                        title="Search Products"
                        className={`h-8 w-8 flex justify-center items-center rounded-full hover:bg-gray-100 ${isActive('/search')}`}
                    >
                        <Search size={16} className={`block sm:hidden text-gray-700 hover:text-red-600 ${isActive('/search')}`} />
                        <Search size={20} className={`hidden sm:block text-gray-700 hover:text-red-600 ${isActive('/search')}`} />
                    </button>
                </Link>
                <UserChecking />
            </div>
        </nav>
    );
}