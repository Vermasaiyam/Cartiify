import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

export const searchProducts = async (searchQuery) => {
    if (!searchQuery) return [];

    try {
        const productsRef = collection(db, "products");
        const querySnapshot = await getDocs(productsRef);

        const searchTerm = searchQuery.toLowerCase();
        const products = [];

        querySnapshot.forEach((doc) => {
            const data = doc.data();
            
            if (
                data.title?.toLowerCase().includes(searchTerm) ||
                data.shortDescription?.toLowerCase().includes(searchTerm) ||
                data.description?.toLowerCase().includes(searchTerm) ||
                data.price?.toString().includes(searchTerm) ||
                data.salePrice?.toString().includes(searchTerm)
            ) {
                products.push({ id: doc.id, ...data });
            }
        });

        return products;
    } catch (error) {
        console.error("Error searching products:", error);
        return [];
    }
};