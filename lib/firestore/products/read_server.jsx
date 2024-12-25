
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

export const getProduct = async ({ id }) => {
    const docRef = doc(db, "products", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        const { timestampCreate, ...data } = docSnap.data();
        return {
            ...data,
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
    return list.docs.map((snap) => {
        const { timestampCreate, ...data } = snap.data();
        return {
            ...data,
            id: snap.id,
        };
    });
};

export const getProducts = async () => {
    const list = await getDocs(
        query(collection(db, "products"), orderBy("timestampCreate", "desc"))
    );
    return list.docs.map((snap) => {
        const { timestampCreate, ...data } = snap.data();
        return {
            ...data,
            id: snap.id,
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
        const { timestampCreate, ...data } = snap.data();
        return {
            ...data,
            id: snap.id,
        };
    });
};