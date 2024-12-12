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

const convertTimestamp = (timestamp) => {
    return timestamp ? timestamp.toDate().toISOString() : null;
};

export const getProduct = async ({ id }) => {
    const data = await getDoc(doc(db, `products/${id}`));
    if (data.exists()) {
        const product = data.data();
        return {
            ...product,
            timestampCreate: convertTimestamp(product.timestampCreate),
            timestampUpdate: convertTimestamp(product.timestampUpdate),
        };
    } else {
        return null;
    }
};

export const getFeaturedProducts = async () => {
    const list = await getDocs(
        query(collection(db, "products"), where("isFeatured", "==", true))
    );
    return list.docs.map((snap) => {
        const product = snap.data();
        return {
            ...product,
            timestampCreate: convertTimestamp(product.timestampCreate),
            timestampUpdate: convertTimestamp(product.timestampUpdate),
        };
    });
};

export const getProducts = async () => {
    const list = await getDocs(
        query(collection(db, "products"), orderBy("timestampCreate", "desc"))
    );
    return list.docs.map((snap) => {
        const product = snap.data();
        return {
            ...product,
            timestampCreate: convertTimestamp(product.timestampCreate),
            timestampUpdate: convertTimestamp(product.timestampUpdate),
        };
    });
};

export const getProductsByCategory = async ({ categoryId }) => {
    const list = await getDocs(
        query(
            collection(db, "products"),
            orderBy("timestampCreate", "desc"),
            where("categoryId", "==", categoryId)
        )
    );
    return list.docs.map((snap) => {
        const product = snap.data();
        return {
            ...product,
            timestampCreate: convertTimestamp(product.timestampCreate),
            timestampUpdate: convertTimestamp(product.timestampUpdate),
        };
    });
};