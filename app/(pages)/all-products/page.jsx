import { getProducts } from "@/lib/firestore/products/read_server";
import Products from "./components/Products";

export default async function Page() {
    const [product] = await Promise.all([getProducts()]);
    return (
        <main className="w-screen h-screen overflow-x-hidden overflow-y-auto">
            <Products products={product} />
        </main>
    );
}