"use client";

import AuthContextProvider from "@/contexts/AuthContext";
import Footer from "../components/Footer";
import Header from "../components/Header";

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