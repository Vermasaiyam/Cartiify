"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useReviews } from "@/lib/firestore/reviews/read";
import { deleteReview } from "@/lib/firestore/reviews/write";
import { useUser } from "@/lib/firestore/user/read";
import { Rating } from "@mui/material";
import { Avatar, Button } from "@nextui-org/react";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

export default function Reviews({ productId }) {
    const { data } = useReviews({ productId: productId });
    const [isLoading, setIsLoading] = useState(false);
    const { user } = useAuth();
    const { data: userData } = useUser({ uid: user?.uid });

    function maskEmail(email) {
        if (!email || !email.includes("@")) return email;
        const [localPart, domain] = email.split("@");
        if (localPart.length <= 3) {
            return `${localPart[0] || ""}${"*".repeat(localPart.length - 1)}@${domain}`;
        }
        return `${localPart.slice(0, 2)}${"*".repeat(localPart.length - 3)}${localPart.slice(-1)}@${domain}`;
    }

    const handleDelete = async () => {
        if (!confirm("Are you sure?")) return;
        setIsLoading(true);
        try {
            if (!user) {
                throw new Error("Please Login First");
            }
            await deleteReview({
                uid: user?.uid,
                productId: productId,
            });
            toast.success("Successfully Deleted");
        } catch (error) {
            toast.error(error?.message);
        }
        setIsLoading(false);
    };

    return (
        <div className="flex flex-col gap-3 p-3 rounded-xl border w-full">
            <h1 className="text-lg font-semibold">Reviews</h1>
            <div className="flex flex-col gap-4">
                {data?.map((item) => {
                    return (
                        <div className="flex gap-3">
                            <div className="">
                                <Avatar src={item?.photoURL} />
                            </div>
                            <div className="flex-1 flex flex-col">
                                <div className="flex justify-between">
                                    <div>
                                        {
                                            item?.displayName ? (
                                                <h1 className="font-semibold">{item?.displayName}</h1>
                                            ) : (
                                                <h1 className="font-semibold">{maskEmail(item?.email)}</h1>
                                            )
                                        }
                                        <Rating value={item?.rating} readOnly size="small" />
                                    </div>
                                    {user?.uid === item?.uid && (
                                        <Button
                                            isIconOnly
                                            size="sm"
                                            color="danger"
                                            variant="flat"
                                            isDisabled={isLoading}
                                            isLoading={isLoading}
                                            onClick={handleDelete}
                                        >
                                            <Trash2 size={14} />
                                        </Button>
                                    )}
                                </div>
                                <p className="text-sm text-gray-700 pt-1">{item?.message}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}