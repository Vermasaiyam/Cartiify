"use client";

import { useAuth } from "@/contexts/AuthContext";
// import { useUser } from "@/lib/firestore/user/read";
// import { updateCarts } from "@/lib/firestore/user/write";
import { Button } from "@nextui-org/react";
import { useState } from "react";
import toast from "react-hot-toast";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useRouter } from "next/navigation";
import { ShoppingCart } from "lucide-react";

export default function AddToCartButton({ productId, type }) {
    const { user } = useAuth();
    // const { data } = useUser({ uid: user?.uid });
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    // const isAdded = data?.carts?.find((item) => item?.id === productId);

    const handlClick = async () => {
        setIsLoading(true);
        // try {
        //     if (!user?.uid) {
        //         router.push("/login");
        //         throw new Error("Please Logged In First!");
        //     }
        //     if (isAdded) {
        //         const newList = data?.carts?.filter((item) => item?.id != productId);
        // await updateCarts({ list: newList, uid: user?.uid });
        // } else {
        // await updateCarts({
        //     list: [...(data?.carts ?? []), { id: productId, quantity: 1 }],
        //     uid: user?.uid,
        // });
        //     }
        // } catch (error) {
        //     toast.error(error?.message);
        // }
        setIsLoading(false);
    };

    if (type === "cute") {
        return (
            <Button
                isLoading={isLoading}
                isDisabled={isLoading}
                onClick={handlClick}
                variant="bordered"
                className="border-2 border-red-600 text-red-500 z-0"
            >
                {/* {!isAdded && "Add To Cart"}
                {isAdded && "Click To Remove"} */}
                Add To Cart
            </Button>
        );
    }

    if (type === "large") {
        return (
            <Button
                isLoading={isLoading}
                isDisabled={isLoading}
                onClick={handlClick}
                variant="bordered"
                className="border-2 border-red-600 text-red-500 z-0"
                color="primary"
                size="sm"
            >
                {/* {!isAdded && <AddShoppingCartIcon className="text-xs" />}
                {isAdded && <ShoppingCartIcon className="text-xs" />}
                {!isAdded && "Add To Cart"}
                {isAdded && "Click To Remove"} */}
                <AddShoppingCartIcon className="text-xs" />
                Add To Cart
            </Button>
        );
    }

    return (
        <Button
            isLoading={isLoading}
            isDisabled={isLoading}
            onClick={handlClick}
            variant="flat"
            isIconOnly
            size="sm"
            className="border-2 border-red-600 text-red-500 px-1 z-0"
        >
            {/* {!isAdded && <ShoppingCart className="text-xs" />}
            {isAdded && <ShoppingCartIcon className="text-xs" />} */}
            <ShoppingCart className="text-xs" />
        </Button>
    );
}