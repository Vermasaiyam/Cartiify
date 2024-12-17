"use client";

import { ProductCard } from "@/app/components/Products";
import { searchProducts } from "@/lib/firestore/search/products";
import { useState } from "react";
import { Button } from "@nextui-org/react";
import { Search } from "lucide-react";

export default function Page() {
    const [query, setQuery] = useState(""); // Input field value
    const [results, setResults] = useState([]); // Search results
    const [loading, setLoading] = useState(false); // Loading state

    // Function to handle the search process
    const handleSearch = async (e) => {
        e.preventDefault();
        if (!query.trim()) return; // Prevent empty search
        setLoading(true); // Start loading

        try {
            const products = await searchProducts(query); // Fetch products
            setResults(products); // Set results
        } catch (error) {
            console.error("Error searching products:", error);
        } finally {
            setLoading(false); // Stop loading
        }
    };

    return (
        <main className="flex flex-col gap-5 min-h-screen p-5">
            {/* Search Form */}
            <form
                onSubmit={handleSearch}
                className="flex w-full justify-center gap-3 items-center"
            >
                <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)} // Update state
                    placeholder="Search Product by its Name, Price, etc..."
                    type="text"
                    className="border px-5 py-2 rounded-xl bg-white focus:outline-none"
                    required
                />
                <Button type="submit" disabled={loading}>
                    <Search size={15} />
                    {loading ? "Searching..." : "Search"}
                </Button>
            </form>

            {/* Results */}
            {results?.length > 0 && (
                <div className="w-full flex justify-center">
                    <div className="flex flex-col gap-5 lg:w-[80%] md:w-[90%] w-[95%] p-5">
                        <h1 className="text-center font-semibold text-lg">
                            Products for "{query}"
                        </h1>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {results.map((item) => (
                                <ProductCard product={item} key={item.id} />
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* No Results */}
            {!loading && query && results.length === 0 && (
                <p className="text-center text-gray-500">
                    No results found for "{query}".
                </p>
            )}
        </main>
    );
}