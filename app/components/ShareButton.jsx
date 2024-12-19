"use client"

import { Dialog } from "@headlessui/react";
import { IoMdShareAlt } from "react-icons/io";
import { MdContentCopy } from "react-icons/md";
import { useEffect, useState } from "react";

export default function ShareButton({ product }) {
    const [copied, setCopied] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [productLink, setProductLink] = useState("");

    useEffect(() => {
        if (typeof window !== "undefined") {
            setProductLink(`${window.location.origin}/product/${product?.id}`);
        }
    }, [product]);

    const handleCopy = () => {
        navigator.clipboard.writeText(productLink);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const shareOptions = [
        { name: "WhatsApp", url: `https://wa.me/?text=${encodeURIComponent(productLink)}`, image: "/whatsapp.jpeg" },
        { name: "Facebook", url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(productLink)}`, image: "/facebook.png" },
        { name: "X", url: `https://x.com/intent/tweet?url=${encodeURIComponent(productLink)}`, image: "/X.png" },
        { name: "LinkedIn", url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(productLink)}`, image: "/linkedin.png" },
        { name: "Instagram", url: `https://www.instagram.com/?url=${encodeURIComponent(productLink)}`, image: "/instagram.jpeg" },
    ];

    return (
        <>
            <div className="flex items-center hover:bg-gray-100 p-1.5 rounded-full">
                <button
                    onClick={() => setIsOpen(true)}
                    className="flex items-center text-gray-700 hover:text-gray-900"
                >
                    <IoMdShareAlt className="text-lg" />
                </button>
            </div>

            <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[90]">
                    <Dialog.Panel className="bg-white p-6 rounded-lg max-w-xl w-full mx-1">
                        <Dialog.Title className="text-xl font-semibold mb-4">Share Product</Dialog.Title>
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-2 bg-gray-100 p-2 rounded-md w-full ">
                                <div className="flex-1 break-words line-clamp-1 text-gray-700 text-xs md:text-sm lg:text-base" title={productLink}>
                                    {productLink}
                                </div>
                                <button
                                    onClick={handleCopy}
                                    className="flex items-center bg-red-500 text-white text-sm md:text-base px-3 py-1.5 rounded-lg hover:bg-red-700"
                                >
                                    <MdContentCopy className="mr-1" />
                                    {copied ? "Copied!" : "Copy"}
                                </button>
                            </div>
                        </div>

                        <div className="flex gap-3 my-2">
                            {shareOptions.map((option) => (
                                <a
                                    key={option.name}
                                    href={option.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 bg-gray-200 rounded-full hover:bg-gray-300"
                                    aria-label={`Share on ${option.name}`}
                                >
                                    <img
                                        src={option.image}
                                        alt={option.name}
                                        className="h-6 w-6"
                                    />
                                </a>
                            ))}
                        </div>

                        <div className="mt-4 flex justify-end">
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-red-500 hover:text-red-700 hover:bg-gray-100 py-1 px-2 rounded-md"
                            >
                                Close
                            </button>
                        </div>
                    </Dialog.Panel>
                </div>
            </Dialog>
        </>
    )
}