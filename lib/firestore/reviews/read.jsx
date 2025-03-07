"use client";

import { db } from "@/lib/firebase";
import {
    collection,
    collectionGroup,
    onSnapshot,
    orderBy,
    query,
} from "firebase/firestore";
import useSWRSubscription from "swr/subscription";

export function useReviews({ productId }) {
    const { data, error } = useSWRSubscription(
        [`products/${productId}/reviews`],
        ([path], { next }) => {
            const ref = query(collection(db, path), orderBy("timestamp", "desc"));
            const unsub = onSnapshot(
                ref,
                (snapshot) =>
                    next(
                        null,
                        snapshot.docs.length === 0
                            ? null
                            : snapshot.docs.map((snap) => snap.data())
                    ),
                (err) => next(err, null)
            );
            return () => unsub();
        }
    );
    if (error) {
        console.log(error?.message);
    }

    return { data, error: error?.message, isLoading: data === undefined };
}

export function useAllReview() {
    const { data, error } = useSWRSubscription(
        ["reviews"],
        ([path], { next }) => {
            console.log("Attempting to fetch reviews");
            const ref = collectionGroup(db, path);

            const unsub = onSnapshot(
                ref,
                (snapshot) => {
                    console.log("Reviews snapshot received:", snapshot.size, "documents");
                    const reviewsData = snapshot.docs.map((snap) => ({
                        id: snap.id,
                        productId: snap.ref.parent.parent.id, // Get the product ID from the path
                        ...snap.data()
                    }));
                    console.log("Processed reviews:", reviewsData);
                    next(null, reviewsData.length === 0 ? [] : reviewsData);
                },
                (err) => {
                    console.error("Error in reviews subscription:", err);
                    next(err, []);
                }
            );
            return () => unsub();
        }
    );

    return {
        data: data || [],
        error: error?.message,
        isLoading: data === undefined
    };
}