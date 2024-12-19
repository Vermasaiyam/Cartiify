"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useUser } from "@/lib/firestore/user/read";
import { Badge } from "@nextui-org/react";
import { Heart, ShoppingCart } from "lucide-react";
import Link from "next/link";

export default function HeaderClientButtons({isActive}) {
    const { user } = useAuth();
    const { data } = useUser({ uid: user?.uid });
    return (
        <div className="flex items-center gap-1">
            <Link href={`/favourites`}>
                {(data?.favorites?.length ?? 0) != 0 && (
                    <Badge
                        variant="solid"
                        size="sm"
                        className="text-white bg-red-500 text-[8px]"
                        content={data?.favorites?.length ?? 0}
                    >
                        <button
                            title="My Favorites"
                            className={`h-8 w-8 flex justify-center items-center rounded-full hover:bg-gray-50 ${isActive('/favourites')}`}
                        >
                            <Heart
                                size={16}
                                className={`block sm:hidden text-gray-700 hover:text-red-600 ${isActive('/favourites')}`}
                            />
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
                        className={`h-8 w-8 flex justify-center items-center rounded-full hover:bg-gray-50 ${isActive('/favourites')}`}
                    >
                        <Heart
                            size={16}
                            className={`block sm:hidden text-gray-700 hover:text-red-600 ${isActive('/favourites')}`}
                        />
                        {/* Larger Icon for Larger Screens */}
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
                        className="text-white bg-red-500 text-[8px]"
                        content={data?.carts?.length ?? 0}
                    >
                        <button
                            title="My Cart"
                            className={`h-8 w-8 flex justify-center items-center rounded-full hover:bg-gray-50 ${isActive('/cart')}`}
                        >
                            <ShoppingCart
                                size={16}
                                className={`block sm:hidden text-gray-700 hover:text-red-600 ${isActive('/cart')}`}
                            />
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
                        className={`h-8 w-8 flex justify-center items-center rounded-full hover:bg-gray-50 ${isActive('/cart')}`}
                    >
                        <ShoppingCart
                            size={16}
                            className={`block sm:hidden text-gray-700 hover:text-red-600 ${isActive('/cart')}`}
                        />
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