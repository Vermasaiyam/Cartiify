"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useAdmin } from "@/lib/firestore/admins/read";
import { MdAdminPanelSettings } from "react-icons/md";
import Link from "next/link";

export default function AdminButton({ isActive }) {
    const { user } = useAuth();
    const { data } = useAdmin({ email: user?.email });
    if (!data) {
        return <></>;
    }
    return (
        <Link href={"/admin"}>
            <button className={`lg:text-sm text-base font-semibold lg:bg-gray-50 hover:bg-gray-100 hover:text-red-500 flex items-center gap-2 lg:px-3 lg:py-2 rounded-md lg:mx-2 ${isActive("/admin")}`}>
                <MdAdminPanelSettings className="block lg:hidden" size={16}/>
                <div className="">Admin</div>
            </button>
        </Link>
    );
}