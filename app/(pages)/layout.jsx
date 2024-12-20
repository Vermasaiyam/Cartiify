import Footer from "../components/Footer";
import Header from "../components/Header";

export default function Layout({ children }) {
    return (
        <main>
            <Header />
            <div className="min-h-screen">
                {children}
            </div>
            <Footer />
        </main>
    );
}