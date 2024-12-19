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
    try {
        if (!uid) {
            throw new Error('User ID is required');
        }

        const userRef = doc(db, `users/${uid}`);
        const userDoc = await getDoc(userRef);

        if (!userDoc.exists()) {
            return;
        }

        const existingData = userDoc.data();

        const updatedData = {
            displayName: displayName || existingData.displayName || "",
            email: email || existingData.email || "",
            phoneNumber: phoneNumber || existingData.phoneNumber || "",
            photoURL: photoURL || existingData.photoURL || "",
            timestampCreate: existingData.timestampCreate || Timestamp.now(),
        };

        await setDoc(userRef, updatedData, { merge: true });
    } catch (error) {
        console.error('Error updating user data:', error);
    }
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