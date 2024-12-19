import { db } from "@/lib/firebase";
import { doc, getDoc, setDoc, Timestamp } from "firebase/firestore";

export const createUser = async ({ uid, email, displayName, phoneNumber, photoURL }) => {
    await setDoc(
        doc(db, `users/${uid}`),
        {
            displayName: displayName || "",
            email: email || "",
            phoneNumber: phoneNumber || "",
            photoURL: photoURL ?? "",
            timestampCreate: Timestamp.now(),
        },
        { merge: true }
    );
};

export const updateUser = async ({ uid, email, displayName, phoneNumber, photoURL }) => {
    const userRef = doc(db, `users/${uid}`);
    const userDoc = await getDoc(userRef);

    const timestampCreate = userDoc.exists() ? userDoc.data().timestampCreate : Timestamp.now();

    await setDoc(
        userRef,
        {
            displayName: displayName || "",
            email: email || "",
            phoneNumber: phoneNumber || "",
            photoURL: photoURL ?? "",
            timestampCreate,
        },
        { merge: true }
    );
};

export const updateFavorites = async ({ uid, list }) => {
    await setDoc(
        doc(db, `users/${uid}`),
        {
            favorites: list,
        },
        {
            merge: true,
        }
    );
};

export const updateCarts = async ({ uid, list }) => {
    await setDoc(
        doc(db, `users/${uid}`),
        {
            carts: list,
        },
        {
            merge: true,
        }
    );
};