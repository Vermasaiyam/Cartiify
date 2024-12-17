import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase";

export const searchProducts = async (searchQuery) => {
    if (!searchQuery) return [];

    try {
        const productsRef = collection(db, "products");

        const q = query(
            productsRef,
            where("title", ">=", searchQuery),
            where("title", "<=", searchQuery + "\uf8ff")
        );

        const querySnapshot = await getDocs(q);
        const products = [];
        querySnapshot.forEach((doc) => {
            products.push({ id: doc.id, ...doc.data() });
        });

        return products;
    } catch (error) {
        console.error("Error searching products:", error);
        return [];
    }
};