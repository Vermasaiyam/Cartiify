import { db } from "@/lib/firebase";
import {
    collection,
    deleteDoc,
    doc,
    setDoc,
    Timestamp,
    updateDoc,
} from "firebase/firestore";

export const createNewCollection = async ({ data, url }) => {
    if (!url) {
        throw new Error("Image is Required");
    }
    if (!data?.title) {
        throw new Error("Name is required");
    }
    if (!data?.products || data?.products?.length === 0) {
        throw new Error("Products is required");
    }
    const newId = doc(collection(db, `ids`)).id;

    await setDoc(doc(db, `collections/${newId}`), {
        ...data,
        id: newId,
        imageURL: url,
        timestampCreate: Timestamp.now(),
    });
};

export const updateCollection = async ({ data, url }) => {
    if (!data?.title) {
        throw new Error("Name is required");
    }
    if (!data?.products || data?.products?.length === 0) {
        throw new Error("Products is required");
    }
    if (!data?.id) {
        throw new Error("ID is required");
    }

    const id = data?.id;

    const imageURL = url || data?.imageURL;

    await updateDoc(doc(db, `collections/${id}`), {
        ...data,
        imageURL: imageURL,
        timestampUpdate: Timestamp.now(),
    });
};

export const deleteCollection = async ({ id }) => {
    if (!id) {
        throw new Error("ID is required");
    }
    await deleteDoc(doc(db, `collections/${id}`));
};