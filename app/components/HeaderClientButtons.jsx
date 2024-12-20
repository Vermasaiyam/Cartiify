"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useUser } from "@/lib/firestore/user/read";
import { Badge } from "@nextui-org/react";
import { Heart, ShoppingCart } from "lucide-react";
import { FaRegHeart } from "react-icons/fa";
import { MdOutlineShoppingCart } from "react-icons/md";
import Link from "next/link";

export default function HeaderClientButtons({ isActive }) {
    const { user } = useAuth();
    const { data } = useUser({ uid: user?.uid });
    return (
        <div className="flex lg:flex-row flex-col lg:items-center lg:gap-1 gap-5 font-semibold lg:font-normal">
            <Link href={`/favourites`}>
                {(data?.favorites?.length ?? 0) != 0 && (
                    <Badge
                        variant="solid"
                        size="sm"
                        className="text-white bg-red-500 text-[8px] hidden lg:block"
                        content={data?.favorites?.length ?? 0}
                    >
                        <button
                            title="My Favorites"
                            className={`lg:h-8 lg:w-8 flex gap-2 items-center justify-center rounded-full hover:bg-gray-50 ${isActive('/favourites')}`}
                        >
                            <FaRegHeart
                                size={16}
                                className={`block sm:hidden hover:text-red-600 ${isActive('/favourites')}`}
                            />
                            <div className="">
                                Favourites{" "}
                                <span className="text-sm">({data?.favorites?.length ?? 0})</span>
                            </div>
                            <Heart
                                size={20}
                                className={`hidden sm:block text-gray-700 hover:text-red-600 ${isActive('/favourites')}`}
                            />
                        </button>
                    </Badge>
                )}
                {(data?.favorites?.length ?? 0) === 0 && (
                    <button
                        title="My Favorites"
                        className={`lg:h-8 lg:w-8 flex gap-2 items-center justify-center rounded-full hover:bg-gray-50 ${isActive('/favourites')}`}
                    >
                        <FaRegHeart
                            size={16}
                            className={`block sm:hidden hover:text-red-600 ${isActive('/favourites')}`}
                        />
                        <div className="">Favourites</div>
                        <Heart
                            size={20}
                            className={`hidden sm:block text-gray-700 hover:text-red-600 ${isActive('/favourites')}`}
                        />
                    </button>
                )}
            </Link>
            <Link href={`/cart`}>
                {(data?.carts?.length ?? 0) != 0 && (
                    <Badge
                        variant="solid"
                        size="sm"
                        className="text-white bg-red-500 text-[8px] hidden lg:block"
                        content={data?.carts?.length ?? 0}
                    >
                        <button
                            title="My Cart"
                            className={`lg:h-8 lg:w-8 flex gap-2 items-center justify-center rounded-full hover:bg-gray-50 ${isActive('/cart')}`}

                        >
                            <MdOutlineShoppingCart
                                size={20}
                                className={`block sm:hidden hover:text-red-600 ${isActive('/cart')}`}
                            />
                            <div className="">
                                Cart{" "}
                                <span className="text-sm">({data?.carts?.length ?? 0})</span>
                            </div>
                            <ShoppingCart
                                size={20}
                                className={`hidden sm:block text-gray-700 hover:text-red-600 ${isActive('/cart')}`}
                            />
                        </button>
                    </Badge>
                )}
                {(data?.carts?.length ?? 0) === 0 && (
                    <button
                        title="My Cart"
                        className={`lg:h-8 lg:w-8 flex gap-2 items-center justify-center rounded-full hover:bg-gray-50 ${isActive('/cart')}`}
                    >
                        <MdOutlineShoppingCart
                            size={20}
                            className={`block sm:hidden hover:text-red-600 ${isActive('/cart')}`}
                        />
                        <div className="">Cart</div>
                        <ShoppingCart
                            size={20}
                            className={`hidden sm:block text-gray-700 hover:text-red-600 ${isActive('/cart')}`}
                        />
                    </button>
                )}
            </Link>
        </div>
    );
}