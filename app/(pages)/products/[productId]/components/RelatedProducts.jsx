import { ProductCard } from "@/app/components/Products";
import { getProductsByCategory } from "@/lib/firestore/products/read_server";

export default async function RelatedProducts({ categoryId }) {
    const products = await getProductsByCategory({ categoryId: categoryId });
    return (
        <div className="w-full flex justify-center">
            <div className="flex flex-col gap-5 lg:w-[80%] md:w-[90%] w-[95%] p-5">
                <h1 className="text-center font-semibold md:text-xl text-base">Recommended Products</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6 w-full">
                    {products?.map((item, index) => {
                        return <ProductCard product={item} key={item?.id || index} />;
                    })}
                </div>
            </div>
        </div>
    );
}