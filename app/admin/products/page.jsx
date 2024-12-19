import Link from "next/link";
import Listview from "./components/Listview";

export default function Page() {
    return (
        <main className="flex flex-col gap-4 p-5 z-0">
            <div className="flex justify-between items-center">
                <h1 className="text-xl">Products</h1>
                <Link href={`/admin/products/form`}>
                    <button className="bg-transparent text-xs text-red-600 border border-red-600 px-4 py-2 rounded-full">
                        Upload Product
                    </button>
                </Link>
            </div>
            <Listview />
        </main>
    );
}