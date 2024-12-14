import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="text-center">
                <h1 className="text-4xl font-bold text-red-600 mb-4">Page Under Construction</h1>
                <p className="text-lg text-gray-700 mb-6">Oops! The page you're looking for is under construction.</p>
                <Link href="/">
                    <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-all">
                        Go to Home Page
                    </button>
                </Link>
            </div>
        </div>
    );
}