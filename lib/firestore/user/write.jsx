import { db } from "@/lib/firebase";
import { doc, setDoc, Timestamp } from "firebase/firestore";

export const createUser = async ({ uid, displayName, phoneNumber, photoURL }) => {
    await setDoc(
        doc(db, `users/${uid}`),
        {
            displayName: displayName,
            phoneNumber: phoneNumber,
            photoURL: photoURL ?? "",
            timestampCreate: Timestamp.now(),
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