"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useAdmin } from "@/lib/firestore/admins/read";
import Link from "next/link";

export default function AdminButton({ isActive }) {
    const { user } = useAuth();
    const { data } = useAdmin({ email: user?.email });
    if (!data) {
        return <></>;
    }
    return (
        <Link href={"/admin"}>
            <button className={`text-sm font-semibold bg-gray-50 hover:bg-gray-100 hover:text-red-500 px-3 py-2 rounded-md mx-2 ${isActive("/admin")}`}>
                Admin
            </button>
        </Link>
    );
}