import { db } from "@/lib/firebase";
import {
  deleteDoc,
  doc,
  setDoc,
  Timestamp,
  updateDoc,
} from "firebase/firestore";

export const createNewAdmin = async ({ data, url }) => {
  if (!url) {
    throw new Error("Image is Required");
  }
  if (!data?.name) {
    throw new Error("Name is required");
  }
  if (!data?.email) {
    throw new Error("Email is required");
  }

  const newId = data?.email;

  await setDoc(doc(db, `admins/${newId}`), {
    ...data,
    id: newId,
    imageURL: url,
    timestampCreate: Timestamp.now(),
  });
};

export const updateAdmin = async ({ data, url }) => {
  if (!data?.name) {
    throw new Error("Name is required");
  }
  if (!data?.id) {
    throw new Error("ID is required");
  }
  if (!data?.email) {
    throw new Error("Email is required");
  }

  const id = data?.id;

  const imageURL = url || data?.imageURL;

  if (id === data?.email) {
    await updateDoc(doc(db, `admins/${id}`), {
      ...data,
      imageURL: imageURL,
      timestampUpdate: Timestamp.now(),
    });
  } else {
    const newId = data?.email;

    await deleteDoc(doc(db, `admins/${id}`));

    await setDoc(doc(db, `admins/${newId}`), {
      ...data,
      id: newId,
      imageURL: imageURL,
      timestampUpdate: Timestamp.now(),
    });
  }
};

export const deleteAdmin = async ({ id }) => {
  if (!id) {
    throw new Error("ID is required");
  }
  await deleteDoc(doc(db, `admins/${id}`));
};