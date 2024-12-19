import Listview from "./components/Listview";

export default function Page() {
    return (
        <main className="flex flex-col gap-4 p-5">
            <div className="flex justify-between items-center">
                <h1 className="text-xl">Orders</h1>
            </div>
            <Listview />
        </main>
    );
}