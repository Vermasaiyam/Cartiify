import { db, storage } from "@/lib/firebase";
import {
    collection,
    deleteDoc,
    doc,
    setDoc,
    Timestamp,
    updateDoc,
} from "firebase/firestore";

export const createNewCategory = async ({ data, url }) => {
    if (!url) {
        throw new Error("Image is Required");
    }
    if (!data?.name) {
        throw new Error("Name is required");
    }
    if (!data?.slug) {
        throw new Error("Slug is required");
    }
    const newId = doc(collection(db, `ids`)).id;

    await setDoc(doc(db, `categories/${newId}`), {
        ...data,
        id: newId,
        imageURL: url,
        timestampCreate: Timestamp.now(),
    });
};

export const updateCategory = async ({ data, url }) => {
    if (!data?.name) {
        throw new Error("Name is required");
    }
    if (!data?.slug) {
        throw new Error("Slug is required");
    }
    if (!data?.id) {
        throw new Error("ID is required");
    }

    const id = data.id;

    // Use the existing imageURL if no new URL is provided
    const imageURL = url || data?.imageURL;

    // Update the category document
    await updateDoc(doc(db, `categories/${id}`), {
        ...data,
        imageURL: imageURL,
        timestampUpdate: Timestamp.now(),
    });

    return { message: "Successfully Updated" }; // Return success response
};

export const deleteCategory = async ({ id }) => {
    if (!id) {
        throw new Error("ID is required");
    }
    await deleteDoc(doc(db, `categories/${id}`));
};