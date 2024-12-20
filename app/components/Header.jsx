"use client";

import { Search, UserCircle2, ArrowLeft, Menu, Plus, PackageOpen } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import LogoutButton from "./LogoutButton";
import { useAuth } from "@/contexts/AuthContext";
import AdminButton from "./AdminButton";
import HeaderClientButtons from "./HeaderClientButtons";
import { Avatar } from "@nextui-org/react";
import { useUser } from "@/lib/firestore/user/read";
import { useState } from "react";
import { FaHome, FaClipboardList } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { MdContactMail } from "react-icons/md";

export default function Header() {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);

    function toggleSidebar() {
        setIsOpen(!isOpen);
    }

    const menuList = [
        {
            name: "Home",
            link: "/",
            icon: <FaHome />
        },
        {
            name: "Products",
            link: "/all-products",
            icon: <PackageOpen className="w-4 h-4" />
        },
        {
            name: "My Orders",
            link: "/my-orders",
            icon: <FaClipboardList />
        },
        {
            name: "Contact",
            link: "/contact-us",
            icon: <MdContactMail />
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
                                <div className="block sm:hidden ml-1">
                                    <Avatar className="avatar-mobile" src={data?.photoURL || data?.imageURL || "/user.png"} />
                                </div>
                                <div className="hidden sm:block ml-1">
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
        <nav className="sticky top-0 z-50 bg-white bg-opacity-65 backdrop-blur-2xl py-2 px-2 md:py-3 md:px-4 lg:px-16 border-b flex items-center justify-between">
            <div className="flex items-center gap-2 md:gap-2">
                {usePathname() !== "/" && (
                    <button
                        onClick={() => router.back()}
                        className="rounded-full px-1 py-1 hover:bg-gray-100 hover:text-red-600 lg:hidden block"
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

            <div className="hidden lg:flex gap-2 items-center font-semibold">
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
                <AdminButton isActive={isActive} />
            </div>

            <div className="hidden lg:flex items-center gap-1">
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

            <button className={`block lg:hidden ${isOpen ? "hidden" : "block"}`} onClick={toggleSidebar}>
                <Menu />
            </button>

            {
                isOpen && (
                    <Sidebar menuList={menuList} toggleSidebar={toggleSidebar} isOpen={isOpen} />
                )
            }
        </nav>
    );
}

function Sidebar({ menuList, toggleSidebar, isOpen }) {
    const isActive = (path) => {
        const pathname = usePathname();
        return pathname === path ? "w-full font-bold bg-red-300 text-white" : "";
    }

    function UserChecking() {
        const { user } = useAuth();
        if (!user) {
            return <></>;
        }
        return (
            <div className="flex flex-col gap-4 font-semibold">
                <HeaderClientButtons isActive={isActive} />
            </div>
        );
    }

    function InfoButtons() {
        const { user } = useAuth();
        const { data } = useUser({ uid: user?.uid });

        if (!user) {
            return (
                <Link href={"/login"}>
                    <button className="text-white bg-red-500 hover:bg-red-700 transition-all duration-200 px-3 py-1.5 md:text-sm text-xs lg:rounded-full rounded-md w-full justify-center">
                        Login
                    </button>
                </Link>
            );
        }
        return (
            <>
                <Link href={`/account`} className="flex flex-row gap-2 items-center">
                    <div className="mx-1">
                        {(data?.photoURL || data?.imageURL) ? (
                            <div className="block sm:hidden my-2">
                                <Avatar className="avatar-mobile" src={data?.photoURL || data?.imageURL || "/user.png"} />
                            </div>
                        ) : (
                            <button
                                title="My Account"
                                className={`h-8 w-8 flex justify-center items-center rounded-full hover:bg-gray-100 hover:text-red-600 ${isActive('/account')}`}
                            >
                                <UserCircle2 size={20} className={`block text-gray-700 hover:text-red-600 ${isActive('/account')}`} />
                            </button>
                        )}
                    </div>
                    <div className="flex flex-col gap-1">
                        <div className="text-sm font-semibold">{user.displayName}</div>
                        <div className="text-xs">{user.email}</div>
                    </div>
                </Link>
                <LogoutButton />
            </>
        );
    }

    return (
        <div className="z-[110]">
            <button
                onClick={toggleSidebar}
                className="fixed top-3 right-3 z-50 transition-transform duration-300 ease-in-out"
            >
                <Plus className={`h-6 w-6 transform ${isOpen ? 'rotate-45' : 'rotate-0'}`} />
            </button>

            <div
                className={`fixed top-0 right-0 h-screen bg-gray-100 sm:min-w-[40vw] md:min-w-[30vw] flex flex-col transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
            >
                <div className="flex flex-col gap-4 font-semibold mt-12 px-2 flex-grow">
                    {menuList.map((item, index) => (
                        <Link key={index} href={item.link}>
                            <button
                                className={`text-base rounded-lg hover:text-red-600 hover:bg-gray-100 p-1 flex gap-2 items-center ${isActive(item.link)}`}
                            >
                                <div className="">{item.icon}</div>
                                <div className="">{item.name}</div>
                            </button>
                        </Link>
                    ))}
                    <AdminButton isActive={isActive} />
                    <Link href={`/search`}>
                        <button
                            title="Search Products"
                            className={`text-base rounded-lg hover:text-red-600 hover:bg-gray-100 p-1 flex gap-2 items-center ${isActive('/search')}`}
                        >
                            <FaSearch size={16} />
                            <div className="">Search</div>
                        </button>
                    </Link>
                    <UserChecking />
                </div>

                <div className="mt-auto px-2 pb-4">
                    <InfoButtons />
                </div>
            </div>
        </div>
    );
}