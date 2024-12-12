import { db } from "@/lib/firebase";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";

const convertTimestamps = (data) => {
    if (data.timestampCreate && data.timestampCreate.seconds) {
        data.timestampCreate = new Date(data.timestampCreate.seconds * 1000).toISOString();
    }
    if (data.timestampUpdate && data.timestampUpdate.seconds) {
        data.timestampUpdate = new Date(data.timestampUpdate.seconds * 1000).toISOString();
    }
    return data;
};

export const getCategory = async ({ id }) => {
    const data = await getDoc(doc(db, `categories/${id}`));
    if (data.exists()) {
        return convertTimestamps(data.data());
    } else {
        return null;
    }
};

export const getCategories = async () => {
    const list = await getDocs(collection(db, "categories"));
    return list.docs.map((snap) => convertTimestamps(snap.data()));
};