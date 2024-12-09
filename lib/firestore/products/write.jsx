import { db } from "@/lib/firebase";
import {
    collection,
    deleteDoc,
    doc,
    setDoc,
    Timestamp,
} from "firebase/firestore";

export const createNewProduct = async ({ data, featureImage, imageList }) => {
    if (!data?.title) {
        throw new Error("Title is required");
    }
    if (!featureImage) {
        throw new Error("Feature Image is required");
    }

    const featureImageURL = featureImage;

    let imageURLList = imageList;

    const newId = doc(collection(db, `ids`)).id;

    await setDoc(doc(db, `products/${newId}`), {
        ...data,
        featureImageURL: featureImageURL,
        imageList: imageURLList,
        id: newId,
        timestampCreate: Timestamp.now(),
    });
};

export const updateProduct = async ({ data, featureImage, imageList }) => {
    if (!data?.title) {
        throw new Error("Title is required");
    }
    if (!data?.id) {
        throw new Error("ID is required");
    }

    let featureImageURL = data?.featureImageURL ?? "";

    if (featureImage) {
        featureImageURL = featureImage;
    }

    let imageURLList = imageList?.length === 0 ? data?.imageList : imageList;

    await setDoc(doc(db, `products/${data?.id}`), {
        ...data,
        featureImageURL: featureImageURL,
        imageList: imageURLList,
        timestampUpdate: Timestamp.now(),
    });
};

export const deleteProduct = async ({ id }) => {
    if (!id) {
        throw new Error("ID is required");
    }
    await deleteDoc(doc(db, `products/${id}`));
};