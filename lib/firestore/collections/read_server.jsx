import { db } from "@/lib/firebase";
import {
    collection,
    doc,
    getDoc,
    getDocs,
} from "firebase/firestore";

// Helper function to convert Timestamp to Date or string
const convertTimestamps = (data) => {
    const convertedData = { ...data };
    Object.keys(convertedData).forEach((key) => {
        if (convertedData[key] && convertedData[key].toDate) {
            convertedData[key] = convertedData[key].toDate().toISOString(); // Convert to ISO string or use .toDate()
        }
    });
    return convertedData;
};

export const getCollection = async ({ id }) => {
    const data = await getDoc(doc(db, `collections/${id}`));
    if (data.exists()) {
        return convertTimestamps(data.data());
    } else {
        return null;
    }
};

export const getCollections = async () => {
    const list = await getDocs(collection(db, "collections"));
    return list.docs.map((snap) => convertTimestamps(snap.data()));
};