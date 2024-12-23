import { db } from "@/lib/firebase";
import {
    collection,
    doc,
    getDoc,
    getDocs,
    orderBy,
    query,
    where,
} from "firebase/firestore";

const transformProductData = (product) => {
    return {
        ...product,
        timestampCreate: product.timestampCreate
            ? new Date(product.timestampCreate.seconds * 1000).toISOString()
            : null,
    };
};

export const getProduct = async ({ id }) => {
    const docRef = doc(db, "products", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        const data = docSnap.data();

        return {
            ...transformProductData(data),
            id: docSnap.id,
        };
    } else {
        throw new Error("No such document!");
    }
};

export const getFeaturedProducts = async () => {
    const list = await getDocs(
        query(collection(db, "products"), where("isFeatured", "==", true))
    );
    return list.docs.map((snap) => snap.data());
};

export const getProducts = async () => {
    const list = await getDocs(
        query(collection(db, "products"), orderBy("timestampCreate", "desc"))
    );
    return list.docs.map((snap) => snap.data());
};

export const getProductsByCategory = async ({ categoryId }) => {
    const list = await getDocs(
        query(
            collection(db, "products"),
            orderBy("timestampCreate", "desc"),
            where("categoryId", "==", categoryId)
        )
    );
    return list.docs.map((snap) => snap.data());
};