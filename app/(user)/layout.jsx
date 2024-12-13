"use client";

import AuthContextProvider, { useAuth } from "@/contexts/AuthContext";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { CircularProgress } from "@nextui-org/react";
import Link from "next/link";

export default function Layout({ children }) {
    return (
        <main>
            <Header />
            <AuthContextProvider>
                <section className="min-h-screen">{children}</section>
            </AuthContextProvider>
            <Footer />
        </main>
    );
}